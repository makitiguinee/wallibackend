import { Optional } from '@nestjs/common';
import { IsBoolean, IsInt, isInt, IsOptional, IsString } from 'class-validator';

export class updateBoutiqueDto {
  @IsOptional()
  @IsString()
  nomBoutique: string;

  @IsOptional()
  @IsString()
  pays: string;

  @IsOptional()
  @IsString()
  ville: string;

  @IsOptional()
  @IsString()
  quartier: string;

  @IsOptional()
  @IsString()
  phone: string;

  @IsOptional()
  @IsBoolean()
  existAgreement: boolean;

  @IsOptional()
  @IsString()
  altitude: any;

  @IsOptional()
  @IsBoolean()
  isdeleted: boolean;

  @IsOptional()
  @IsString()
  longitude: any;

  @IsOptional()
  @IsString()
  latitude: any;
}
