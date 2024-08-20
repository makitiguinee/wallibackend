import { Module } from '@nestjs/common';
import { EnginController } from './engin.controller';
import { EnginService } from './engin.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [EnginController],
  providers: [EnginService],
  imports: [PrismaModule],
})
export class EnginModule {}
