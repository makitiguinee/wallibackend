import { TypeProduit } from '@prisma/client';
import { IsEmpty, IsInt, IsString } from 'class-validator';

export class CreateProduitDto {
  @IsEmpty()
  @IsString()
  nomProduit: string;

  @IsEmpty()
  @IsString()
  photo: string;

  @IsEmpty()
  @IsString()
  description: string;

  @IsEmpty()
  @IsString()
  intereseted: boolean;

  @IsEmpty()
  @IsString()
  isdeleted: boolean;

  @IsEmpty()
  @IsInt()
  prix: number;

  @IsEmpty()
  @IsString()
  type: TypeProduit;

  @IsEmpty()
  @IsInt()
  boutiqueId: number;
}
