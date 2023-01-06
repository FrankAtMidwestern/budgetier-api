import { JwtGuard } from './../auth/guard/jwt.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GroupBudgetService } from './groupbudget.service';
import { GetUser } from '../auth/decorator';
import { CreateGroupBudgetDto, EditGroupBudgetDto } from './dto';

@UseGuards(JwtGuard)
@Controller('groupbudgets')
export class GroupBudgetController {
  constructor(private groupBudgetService: GroupBudgetService) {}
  @Get()
  getGroupBudgets(@GetUser('id') userId: number) {
    return this.groupBudgetService.getGroupBudgets(userId);
  }

  @Get(':id')
  getGroupBudgetById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) groupBudgetId: number,
  ) {
    return this.groupBudgetService.getGroupBudgetById(userId, groupBudgetId);
  }

  @Post()
  createGroupBudget(
    @GetUser('id') userId: number,
    @Body() dto: CreateGroupBudgetDto,
  ) {
    return this.groupBudgetService.createGroupBudget(userId, dto);
  }

  @Patch(':id')
  editGroupBudgetById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) groupBudgetId: number,
    @Body() dto: EditGroupBudgetDto,
  ) {
    return this.groupBudgetService.editGroupBudgetById(
      userId,
      groupBudgetId,
      dto,
    );
  }

  @Delete(':id')
  deleteGroupBudgetById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) groupBudgetId: number,
  ) {
    return this.groupBudgetService.deleteGroupBudgetById(userId, groupBudgetId);
  }
}
