import { Module } from '@nestjs/common';
import { SyndicatController } from './syndicat.controller';
import { SyndicatService } from './syndicat.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [SyndicatController],
  providers: [SyndicatService],
  imports: [PrismaModule],
})
export class SyndicatModule {}
