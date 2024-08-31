import { StatusPassager } from '@prisma/client';
import { IsString, IsNotEmpty, MaxLength, IsNumber } from 'class-validator';
export class CreatePassagerDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(80)
  nom: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(80)
  villeDepart: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(80)
  villeDestination: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(80)
  status: StatusPassager;

  @IsNotEmpty()
  @IsNumber()
  gareId: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(80)
  prenom: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(80)
  phone: string;
}
