import {
  IsNotEmpty,
  IsNumber,
  IsEnum,
  IsString,
  IsOptional,
  IsPositive,
  IsBoolean,
  IsInt,
} from 'class-validator';
import { Periode } from '@prisma/client';

export class CreateTaxeDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  montant: number;

  @IsNotEmpty()
  @IsEnum(Periode)
  periode: Periode;

  @IsNotEmpty()
  @IsString()
  statutPaiement: string;

  @IsOptional()
  @IsBoolean()
  isdeleted?: boolean;

  @IsNotEmpty()
  @IsInt()
  enginId: number;
}
