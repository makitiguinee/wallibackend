import { TypeProduit } from '@prisma/client';
import {
  IsBoolean,
  IsEmpty,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateProduitDto {
  @IsNotEmpty()
  @IsString()
  nomProduit: string;

  @IsNotEmpty()
  @IsString()
  photo: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsBoolean()
  intereseted: boolean;

  @IsNotEmpty()
  @IsBoolean()
  isdeleted: boolean;

  @IsNotEmpty()
  @IsNumber()
  prix: number;

  @IsNotEmpty()
  @IsString()
  type: TypeProduit;

  @IsNotEmpty()
  @IsInt()
  boutiqueId: number;
}
