import { TypeProduit } from '@prisma/client';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProduitDto {
  @IsOptional()
  @IsString()
  nomProduit?: string;

  @IsOptional()
  @IsString()
  photo?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  intereseted?: boolean;

  @IsOptional()
  @IsBoolean()
  isdeleted?: boolean;

  @IsOptional()
  @IsNumber()
  prix?: number;

  @IsOptional()
  @IsString()
  type?: TypeProduit;
}
