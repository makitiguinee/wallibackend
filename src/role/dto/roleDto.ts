export enum Permission {
  READ = 'READ',
  WRITE = 'WRITE',
  DELETE = 'DELETE',
}

import { IsNotEmpty, IsOptional } from 'class-validator';

export class RoleDto {
  @IsNotEmpty()
  readonly nameRole: string;

  @IsOptional()
  readonly descriptionRole?: string;

  @IsNotEmpty()
  readonly permissions: Permission;
}
