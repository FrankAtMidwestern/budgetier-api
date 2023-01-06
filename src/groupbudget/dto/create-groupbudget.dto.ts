import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateGroupBudgetDto {
  constructor(title: string, users: any[], description?: string) {
    this.title = title;
    this.description = description;
    this.users = users;
  }
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string | undefined;

  users: any[];
}
