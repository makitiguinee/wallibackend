import { Module } from '@nestjs/common';
import { PassagerController } from './passager.controller';
import { PassagerService } from './passager.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PassagerController],
  providers: [PassagerService],
  exports: [PassagerService],
})
export class PassagerModule {}
