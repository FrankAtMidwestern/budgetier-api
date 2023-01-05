import { Role } from '@prisma/client';
import { IsEmail, IsOptional, IsString } from 'class-validator';
export class EditUserDto {
  constructor(
    email?: string,
    firstName?: string,
    lastName?: string,
    role?: Role,
  ) {
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role;
  }
  @IsEmail()
  email: string | undefined;

  @IsString()
  @IsOptional()
  firstName: string | undefined;

  @IsString()
  @IsOptional()
  lastName: string | undefined;

  @IsString()
  @IsOptional()
  role: Role | undefined;
}
