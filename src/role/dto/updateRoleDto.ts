export enum Permission {
  READ = 'READ',
  WRITE = 'WRITE',
  DELETE = 'DELETE',
}

import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateRoleDto {
  @IsOptional()
  readonly nameRole?: string;

  @IsOptional()
  readonly descriptionRole?: string;

  @IsOptional()
  readonly permissions?: Permission;
}
