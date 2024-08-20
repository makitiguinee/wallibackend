import { IsString, IsOptional, MaxLength, IsBoolean } from 'class-validator';

export class UpdateGareDto {
  @IsOptional()
  @IsString()
  @MaxLength(80)
  nom?: string;

  @IsOptional()
  @IsString()
  @MaxLength(180)
  city?: string;

  @IsOptional()
  @IsString()
  @MaxLength(180)
  longitude?: string;

  @IsOptional()
  @IsString()
  @MaxLength(180)
  altitude?: string;

  @IsOptional()
  @IsString()
  @MaxLength(180)
  latitude?: string;

  @IsBoolean()
  isdeleted: Boolean;
}
