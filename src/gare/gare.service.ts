import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGareDto } from './dto/CreateGareDto';
import { UpdateGareDto } from './dto/UpdateGareDto';

@Injectable()
export class GareService {
  constructor(private prismaService: PrismaService) {}

  async createGare(createGareDto: CreateGareDto) {
    const { nom, city, longitude, altitude, latitude, isdeleted } =
      createGareDto;
    return this.prismaService.gare.create({
      data: {
        nom,
        city,
        longitude,
        altitude,
        latitude,
        isdeleted: false,
      },
    });
  }

  async updateGare(gareId: number, updateGareDto: UpdateGareDto) {
    const { nom, city, longitude, altitude, latitude } = updateGareDto;

    // Assurez-vous que gareId est bien un entier
    const gareIdInt =
      typeof gareId === 'string' ? parseInt(gareId, 10) : gareId;

    try {
      const existingGare = await this.prismaService.gare.findUnique({
        where: { gareId: gareIdInt },
      });

      if (!existingGare) {
        throw new NotFoundException(
          `Gare avec l'ID ${gareIdInt} n'a pas été trouvée.`,
        );
      }

      return this.prismaService.gare.update({
        where: { gareId: gareIdInt },
        data: {
          nom,
          city,
          longitude,
          altitude,
          latitude,
        },
      });
    } catch (error) {
      throw new Error('Erreur lors de la mise à jour de la gare');
    }
  }

  async getAllGares() {
    return this.prismaService.gare.findMany({
      where: { isdeleted: false },
    });
  }

  async getGareById(gareId: number) {
    const gare = await this.prismaService.gare.findUnique({
      where: { gareId },
    });

    if (!gare) {
      throw new NotFoundException(
        `Gare avec l'ID ${gareId} n'a pas été trouvée.`,
      );
    }

    return gare;
  }

  async deleteGare(gareId: number) {
    // Convertir gareId en entier si nécessaire
    const gareIdInt =
      typeof gareId === 'string' ? parseInt(gareId, 10) : gareId;

    const gare = await this.prismaService.gare.findUnique({
      where: { gareId: gareIdInt },
    });

    if (!gare) {
      throw new NotFoundException(
        `Gare avec l'ID ${gareIdInt} n'a pas été trouvée.`,
      );
    }

    await this.prismaService.gare.update({
      where: { gareId: gareIdInt },
      data: { isdeleted: true },
    });

    return { message: `Gare avec l'ID ${gareIdInt} a été supprimée.` };
  }
}
