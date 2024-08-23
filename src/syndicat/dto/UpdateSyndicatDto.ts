import { Boutique } from '@prisma/client';
import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateSyndicatDto {
  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  dateOfBirth?: string;

  @IsOptional()
  @IsString()
  pays?: string;

  @IsOptional()
  @IsString()
  ville?: string;

  @IsOptional()
  @IsString()
  quartier?: string;

  @IsOptional()
  @IsInt()
  userId?: number;

  @IsOptional()
  @IsBoolean()
  isdeleted?: Boolean;
}
