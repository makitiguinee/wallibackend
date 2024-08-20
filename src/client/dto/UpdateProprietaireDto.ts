import {
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  maxLength,
} from 'class-validator';

export class UpdateProprietaireDto {
  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  nationality?: string;

  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  @IsOptional()
  @IsString()
  typePice?: 'PASSPORT' | 'CARTE_ELECTEUR' | 'CARTE_IDENTITE';

  @IsOptional()
  @IsString()
  @MaxLength(12)
  pieceNumber?: string;
}
