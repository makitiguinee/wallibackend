import { Module } from '@nestjs/common';
import { LineController } from './line.controller';
import { LineService } from './line.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [LineController],
  providers: [LineService],
  imports: [PrismaModule],
})
export class LineModule {}
