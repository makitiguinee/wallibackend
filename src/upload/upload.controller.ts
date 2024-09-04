import {
  Controller,
  Param,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { PrismaService } from 'src/prisma/prisma.service';
import { error } from 'console';

@Controller('/walli/v1/upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}
  @Post('/upload/:id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('id', ParseIntPipe) id: number,
  ) {
    if (!file) {
      throw new error("le fichier n' est pas valide");
    }
    console.log('voici le fichier:', file);
    await this.uploadService.uploadFile(file, id);
    return { message: 'File uploaded successfully!' };
  }
}
