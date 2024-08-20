import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { TypeActivity } from '@prisma/client'; // Assurez-vous que cela correspond à l'énumération dans Prisma

export class CreateEnginDto {
  @IsNotEmpty()
  @IsString()
  immatricule: string;

  @IsNotEmpty()
  @IsString()
  marque: string;

  @IsNotEmpty()
  @IsString()
  model: string;

  @IsNotEmpty()
  @IsEnum(TypeActivity)
  typeActivity: TypeActivity;

  @IsNotEmpty()
  @IsString()
  dateService: string;

  @IsNotEmpty()
  @IsString()
  numeroCarteVerte: string;

  @IsNotEmpty()
  @IsBoolean()
  existAssurance: boolean;

  @IsNotEmpty()
  @IsString()
  dateEpireAssurance: string;

  @IsNotEmpty()
  @IsBoolean()
  existCarteGris: boolean;

  @IsNotEmpty()
  @IsString()
  dateEpireCarteGris: string;

  @IsNotEmpty()
  @IsBoolean()
  existVignette: boolean;

  @IsNotEmpty()
  @IsString()
  dateEpireVignette: string;

  @IsNotEmpty()
  @IsNumber()
  proprietaireId: number;

  @IsNotEmpty()
  @IsNumber()
  isdeleted: boolean;

  @IsOptional()
  @IsNumber()
  destinationId?: number;

  @IsOptional()
  @IsNumber()
  lineId?: number;
}
