import { IsBoolean, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateSyndicatDto {
  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  dateOfBirth: string;

  @IsNotEmpty()
  @IsString()
  pays: string;

  @IsNotEmpty()
  @IsString()
  ville: string;

  @IsNotEmpty()
  @IsString()
  quartier: string;

  @IsNotEmpty()
  @IsInt()
  userId: number;

  @IsNotEmpty()
  @IsBoolean()
  isdeleted: boolean;
}
