import { Injectable } from '@nestjs/common';
import { CreateGroupBudgetDto, EditGroupBudgetDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GroupBudgetService {
  constructor(private prisma: PrismaService) {}
  getGroupBudgets(userId: number) {
    return this.prisma.groupBudget.findMany({
      where: {
        users: {
          some: {
            userId,
          },
        },
      },
    });
  }

  getGroupBudgetById(userId: number, groupbudgetId: number) {}

  async createGroupBudget(userId: number, dto: CreateGroupBudgetDto) {
    const groupbudget = await this.prisma.groupBudget.create({
      data: {
        title: dto.title,
        description: dto.description,
        users: {
          create: [
            {
              user: {
                connect: {
                  id: 9,
                },
              },
            },
          ],
        },
      },
    });
  }

  editGroupBudgetById(
    userId: number,
    groupbudgetId: number,
    dto: EditGroupBudgetDto,
  ) {}

  deleteGroupBudgetById(userId: number, groupbudgetId: number) {}
}
