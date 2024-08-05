import { Optional } from '@nestjs/common';
import { IsEmail } from 'class-validator';
export class UpdateDto {
  @Optional()
  readonly firstname: string;
  @Optional()
  readonly lastname: string;
  @Optional()
  readonly username: string;
  @IsEmail()
  @Optional()
  readonly email: string;
  @Optional()
  readonly sexe: string;
  @Optional()
  readonly password: string;
  @Optional()
  readonly roleId: number;
}
