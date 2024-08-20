import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsInt,
  IsBoolean,
} from 'class-validator';
export class CreatePassagerDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(80)
  nom: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(80)
  prenom: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(80)
  phone: string;

  @IsNotEmpty()
  @IsInt()
  destinationId: any;

  @IsNotEmpty()
  @IsBoolean()
  isdeleted: Boolean;
}
