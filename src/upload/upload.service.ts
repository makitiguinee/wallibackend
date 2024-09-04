import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UploadService {
  constructor(private prisma: PrismaService) {}

  async uploadFile(file: Express.Multer.File, id: number): Promise<void> {
    if (!file) {
      throw new Error("Aucun fichier n'a été envoyé.");
    }
    try {
      const uploadsDir = path.join(process.cwd(), 'uploads');

      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      const uploadPath = path.join(uploadsDir, file.originalname);
      fs.writeFileSync(uploadPath, file.buffer);
      const image = await this.prisma.image.create({
        data: {
          url: uploadPath,
          nom: file.originalname,
          produitId: id,
        },
      });
      console.log('Image créée:', image);
    } catch (error) {
      console.error('Erreur lors du téléchargement du fichier:', error);
      throw new Error(
        `Erreur lors de l'enregistrement du fichier: ${error.message}`,
      );
    }
  }
}
