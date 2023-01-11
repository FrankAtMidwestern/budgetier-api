import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateGroupBudgetDto, EditGroupBudgetDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

function exclude<User, Key extends keyof User>(
  user: User,
  keys: Key[],
): Omit<User, Key> {
  for (const key of keys) {
    delete user[key];
  }
  return user;
}

@Injectable()
export class GroupBudgetService {
  constructor(private prisma: PrismaService) {}
  async getGroupBudgets(userId: number) {
    const allGroupBudgets = await this.prisma.groupBudget.findMany({
      where: {
        users: {
          some: {
            userId,
          },
        },
      },
      include: {
        users: {
          include: {
            user: true,
          },
        },
        budgets: true,
      },
    });
    const result = allGroupBudgets.map((groupBudget) => {
      return {
        ...groupBudget,
        users: groupBudget.users.map((user) => {
          return exclude(user.user, ['hash']);
        }),
      };
    });
    return result;
  }

  async getGroupBudgetById(userId: number, groupbudgetId: number) {
    const groupBudget = await this.prisma.groupBudget.findFirst({
      where: {
        id: groupbudgetId,
        users: {
          some: {
            userId,
          },
        },
      },
      include: {
        users: {
          include: {
            user: true,
          },
        },
        budgets: { include: { budget: true } },
      },
    });
    if (!groupBudget) {
      throw new NotFoundException();
    }
    const result = {
      ...groupBudget,
      users: groupBudget.users.map((user) => {
        return exclude(user.user, ['hash']);
      }),
    };
    return result;
  }

  async createGroupBudget(userId: number, dto: CreateGroupBudgetDto) {
    const groupbudget = await this.prisma.groupBudget.create({
      data: {
        ownerId: userId,
        ...dto,
        users: { create: [{ user: { connect: { id: userId } } }] },
      },
    });
    return groupbudget;
  }

  async editGroupBudgetById(
    userId: number,
    groupbudgetId: number,
    dto: EditGroupBudgetDto,
  ) {
    const groupBudget = await this.prisma.groupBudget.findUnique({
      where: {
        id: groupbudgetId,
      },
      include: {
        users: { include: { user: true } },
        budgets: true,
      },
    });

    const result = {
      ...groupBudget,
      users: groupBudget?.users.map((user) => {
        if (user.user.id !== userId) {
          throw new ForbiddenException('Access to resources denied');
        }
        return exclude(user.user, ['hash']);
      }),
    };
    if (!groupBudget || result.ownerId !== userId) {
      throw new ForbiddenException('Access to resources denied');
    }

    return this.prisma.groupBudget.update({
      where: {
        id: groupbudgetId,
      },
      data: {
        ...dto,
      },
    });
  }

  deleteGroupBudgetById(userId: number, groupbudgetId: number) {}
}
