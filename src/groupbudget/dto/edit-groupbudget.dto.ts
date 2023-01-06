import { IsOptional, IsString } from 'class-validator';

export class EditGroupBudgetDto {
  constructor(title?: string, description?: string) {
    this.title = title;
    this.description = description;
  }
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;
}
