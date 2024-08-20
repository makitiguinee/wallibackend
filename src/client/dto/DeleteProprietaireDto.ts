import { IsInt } from 'class-validator';

export class DeleteProprietaireDto {
  @IsInt()
  proprietaireId: number;
}
