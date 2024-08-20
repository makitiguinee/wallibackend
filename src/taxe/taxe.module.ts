import { Module } from '@nestjs/common';
import { TaxeController } from './taxe.controller';
import { TaxeService } from './taxe.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [TaxeController],
  providers: [TaxeService],
  imports: [PrismaModule],
})
export class TaxeModule {}
