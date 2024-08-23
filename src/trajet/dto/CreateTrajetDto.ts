import { IsBoolean, IsInt, IsNotEmpty } from 'class-validator';

export class CreateTrajetDto {
  @IsInt()
  @IsNotEmpty()
  passagerId: number;

  @IsInt()
  @IsNotEmpty()
  enginId: number;

  @IsInt()
  @IsNotEmpty()
  destinationId: number;

  @IsInt()
  @IsNotEmpty()
  gareId: number;
}
