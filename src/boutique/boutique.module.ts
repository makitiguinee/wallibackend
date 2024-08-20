import { Module } from '@nestjs/common';
import { BoutiqueController } from './boutique.controller';
import { BoutiqueService } from './boutique.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [BoutiqueController],
  providers: [BoutiqueService],
  exports: [BoutiqueService],
})
export class BoutiqueModule {}
