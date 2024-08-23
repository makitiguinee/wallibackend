import { IsInt, IsOptional } from 'class-validator';

export class UpdateTrajetDto {
  @IsInt()
  @IsOptional()
  passagerId?: number;

  @IsInt()
  @IsOptional()
  enginId?: number;

  @IsInt()
  @IsOptional()
  destinationId?: number;

  @IsInt()
  @IsOptional()
  gareId?: number;
}
