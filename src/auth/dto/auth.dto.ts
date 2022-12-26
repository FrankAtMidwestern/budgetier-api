import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  constructor(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ) {
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
  }
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;
}
