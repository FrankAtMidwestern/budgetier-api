import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateGroupBudgetDto {
  constructor(title: string, description?: string) {
    this.title = title;
    this.description = description;
  }
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;
}
