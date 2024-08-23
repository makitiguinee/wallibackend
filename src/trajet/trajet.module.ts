import { Module } from '@nestjs/common';
import { TrajetController } from './trajet.controller';
import { TrajetService } from './trajet.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  exports: [TrajetService],
  controllers: [TrajetController],
  providers: [TrajetService],
  imports: [PrismaModule],
})
export class TrajetModule {}
