import { TypePiece } from '@prisma/client';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateProprietaireDto {
  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  nationality: string;

  @IsNotEmpty()
  @IsString()
  typePice: 'PASSPORT' | 'CARTE_ELECTEUR' | 'CARTE_IDENTITE';

  @IsNotEmpty()
  @IsDateString()
  dateOfBirth: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(12)
  pieceNumber: string;

  @IsNotEmpty()
  @IsInt()
  userId: any;
}
