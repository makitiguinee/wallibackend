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
    const existingGare = await this.prismaService.gare.findUnique({
      where: { gareId },
    });

    if (!existingGare) {
      throw new NotFoundException(
        `Gare avec l'ID ${gareId} n'a pas été trouvée.`,
      );
    }

    return this.prismaService.gare.update({
      where: { gareId },
      data: {
        nom,
        city,
        longitude,
        altitude,
        latitude,
      },
    });
  }

  async getAllGares() {
    return this.prismaService.gare.findMany();
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
    const gare = await this.prismaService.gare.findUnique({
      where: { gareId },
    });

    if (!gare) {
      throw new NotFoundException(
        `Gare avec l'ID ${gareId} n'a pas été trouvée.`,
      );
    }

    await this.prismaService.gare.update({
      where: { gareId },
      data: { isdeleted: true },
    });

    return { message: `Syndicat avec l'ID ${gareId} a été supprimé.` };
  }
}
