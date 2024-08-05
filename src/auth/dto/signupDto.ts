import { Optional } from '@nestjs/common';
import { IsNotEmpty, IsEmail } from 'class-validator';
export class SignupDto {
  @IsNotEmpty()
  readonly firstname: string;
  @IsNotEmpty()
  readonly lastname: string;
  @IsNotEmpty()
  readonly username: string;
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
  @IsNotEmpty()
  readonly sexe: string;
  @IsNotEmpty()
  readonly password: string;
  @IsNotEmpty()
  readonly roleId: number;
  @Optional()
  readonly isDelete?: boolean;
}
