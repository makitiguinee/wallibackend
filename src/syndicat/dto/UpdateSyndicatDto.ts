import { Boutique } from '@prisma/client';
import { IsOptional, IsString } from 'class-validator';

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
  @IsString()
  userId?: number;

  @IsOptional()
  @IsString()
  isdeleted?: Boolean;
}
