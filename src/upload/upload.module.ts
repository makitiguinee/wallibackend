import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [PrismaModule],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
