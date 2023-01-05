import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get('DATABASE_URL'),
        },
      },
    });
  }
  cleanDb() {
    return this.$transaction([
      this.tagsOnExpenses.deleteMany(),
      this.tagsOnIncomes.deleteMany(),
      this.income.deleteMany(),
      this.expense.deleteMany(),
      this.tagsOnBudgets.deleteMany(),
      this.tag.deleteMany(),
      this.budget.deleteMany(),
      this.report.deleteMany(),
      this.groupBudget.deleteMany(),
      this.permission.deleteMany(),
      this.user.deleteMany(),
    ]);
  }
}
