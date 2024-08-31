import {
  IsString,
  IsNotEmpty,
  MaxLength,
  isBoolean,
  IsBoolean,
  IsNumber,
} from 'class-validator';

export class CreateGareDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(80)
  nom: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(180)
  city: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(180)
  longitude: string;

  @IsNotEmpty()
  @IsNumber()
  syndicatId: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(180)
  altitude: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(180)
  latitude: string;
}
