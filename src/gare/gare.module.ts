import { Module } from '@nestjs/common';
import { GareController } from './gare.controller';
import { GareService } from './gare.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [GareController],
  providers: [GareService],
  imports: [PrismaModule],
})
export class GareModule {}
