import { IsNotEmpty, IsEmail } from 'class-validator';
export class ResetPasswordDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
  @IsNotEmpty()
  readonly password: string;
}
