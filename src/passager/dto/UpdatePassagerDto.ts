import {
  IsString,
  IsOptional,
  MaxLength,
  IsInt,
  IsBoolean,
} from 'class-validator';
export class UpdatePassagerDto {
  @IsOptional()
  @IsString()
  @MaxLength(80)
  nom?: string;

  @IsOptional()
  @IsString()
  @MaxLength(80)
  prenom?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsBoolean()
  isdeleted: Boolean;
}
