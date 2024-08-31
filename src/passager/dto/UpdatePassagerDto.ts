import { StatusPassager } from '@prisma/client';
import {
  IsString,
  IsOptional,
  MaxLength,
  IsInt,
  IsBoolean,
  IsNumber,
} from 'class-validator';
export class UpdatePassagerDto {
  @IsOptional()
  @IsString()
  @MaxLength(80)
  nom?: string;

  @IsOptional()
  @IsString()
  @MaxLength(80)
  prenom?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  villeDepart: string;

  @IsOptional()
  @IsString()
  villeDestination: string;

  @IsOptional()
  @IsString()
  status: StatusPassager;

  @IsOptional()
  @IsNumber()
  gareId: number;

  @IsOptional()
  @IsBoolean()
  isdeleted: Boolean;
}
