import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { PrismaModule } from '../prisma/prisma.module'; // Assurez-vous d'importer PrismaModule

@Module({
  imports: [PrismaModule],
  providers: [RoleService],
  controllers: [RoleController],
})
export class RoleModule {}
