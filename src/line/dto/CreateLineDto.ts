import { IsNotEmpty, IsString, IsNumber, IsBoolean } from 'class-validator';

export class CreateLineDto {
  @IsNotEmpty()
  @IsString()
  nomline: string;

  @IsNotEmpty()
  @IsString()
  ville: string;

  @IsNotEmpty()
  @IsString()
  quartier: string;

  @IsNotEmpty()
  @IsString()
  longitude: string;

  @IsNotEmpty()
  @IsString()
  altitude: string;

  @IsNotEmpty()
  @IsString()
  latitude: string;

  @IsNotEmpty()
  @IsNumber()
  syndicatId: number;
}
