import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsInt,
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
  @IsString()
  altitude: any;

  @IsNotEmpty()
  @IsBoolean()
  isdeleted: boolean;

  @IsOptional()
  @IsString()
  longitude?: any;

  @IsOptional()
  @IsString()
  latitude?: any;

  @IsNotEmpty()
  @IsInt()
  userId: number;
}
