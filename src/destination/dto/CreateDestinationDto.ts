import { IsBoolean, IsInt, IsString, Length } from 'class-validator';

export class CreateDestinationDto {
  @IsString()
  @Length(1, 80)
  villeDepart: string;

  @IsString()
  @Length(1, 80)
  villeDestination: string;

  @IsInt()
  gareId: number;

  @IsBoolean()
  isdeleted: Boolean;
}
