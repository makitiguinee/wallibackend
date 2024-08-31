import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsInt,
  IsNumber,
  IsEmpty,
} from 'class-validator';

export class CreateBoutiqueDto {
  @IsNotEmpty()
  @IsString()
  nomBoutique: string;

  @IsNotEmpty()
  @IsString()
  pays: string;

  @IsNotEmpty()
  @IsString()
  ville: string;

  @IsNotEmpty()
  @IsString()
  quartier: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsOptional()
  @IsBoolean()
  existAgreement?: boolean;

  @IsNotEmpty()
  @IsNumber()
  altitude: any;

  @IsOptional()
  @IsBoolean()
  isdeleted?: boolean;

  @IsOptional()
  @IsNumber()
  longitude?: any;

  @IsOptional()
  @IsNumber()
  latitude?: any;

  @IsNotEmpty()
  @IsInt()
  userId: number;
}
