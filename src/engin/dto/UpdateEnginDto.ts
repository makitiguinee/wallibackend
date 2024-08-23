import {
  IsOptional,
  IsString,
  IsBoolean,
  IsEnum,
  IsNumber,
} from 'class-validator';
import { TypeActivity } from '@prisma/client';
export class UpdateEnginDto {
  @IsOptional()
  @IsString()
  immatricule?: string;

  @IsOptional()
  @IsString()
  marque?: string;

  @IsOptional()
  @IsString()
  model?: string;

  @IsOptional()
  @IsEnum(TypeActivity)
  typeActivity?: TypeActivity;

  @IsOptional()
  @IsString()
  dateService?: string;

  @IsOptional()
  @IsString()
  numeroCarteVerte?: string;

  @IsOptional()
  @IsBoolean()
  existAssurance?: boolean;

  @IsOptional()
  @IsString()
  dateEpireAssurance?: string;

  @IsOptional()
  @IsBoolean()
  existCarteGris?: boolean;

  @IsOptional()
  @IsString()
  dateEpireCarteGris?: string;

  @IsOptional()
  @IsBoolean()
  existVignette?: boolean;

  @IsOptional()
  @IsString()
  dateEpireVignette?: string;

  @IsOptional()
  @IsNumber()
  proprietaireId?: number;

  @IsOptional()
  @IsNumber()
  lineId?: number;

  @IsOptional()
  @IsBoolean()
  isdeleted?: boolean;
}
