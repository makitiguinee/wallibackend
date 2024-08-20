import { Periode } from '@prisma/client';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class UpdateTaxeDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  montant?: number;

  @IsOptional()
  @IsEnum(Periode)
  periode?: Periode;

  @IsOptional()
  @IsEnum(Periode)
  isdelete?: Boolean;

  @IsOptional()
  @IsString()
  statutPaiement?: string;
}
