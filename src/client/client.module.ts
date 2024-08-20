import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [ClientController],
  providers: [ClientService],
  imports: [PrismaModule],
})
export class ClientModule {}
