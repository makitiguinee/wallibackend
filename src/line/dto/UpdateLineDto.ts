import { IsOptional, IsString, IsNumber, IsBoolean } from 'class-validator';

export class UpdateLineDto {
  @IsOptional()
  @IsString()
  nomline?: string;

  @IsOptional()
  @IsString()
  longitude?: string;

  @IsOptional()
  @IsString()
  altitude?: string;

  @IsOptional()
  @IsString()
  latitude?: string;

  @IsOptional()
  @IsNumber()
  syndicatId?: number;

  @IsOptional()
  @IsBoolean()
  isdeleted?: boolean;
}
