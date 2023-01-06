import { Module } from '@nestjs/common';
import { GroupBudgetController } from './groupbudget.controller';
import { GroupBudgetService } from './groupbudget.service';

@Module({
  controllers: [GroupBudgetController],
  providers: [GroupBudgetService],
})
export class GroupBudgetModule {}
