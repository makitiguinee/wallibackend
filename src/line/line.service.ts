import { Injectable } from '@nestjs/common';
import { CreateLineDto } from './dto/CreateLineDto';
import { UpdateLineDto } from './dto/UpdateLineDto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LineService {
  constructor(private readonly prismaService: PrismaService) {}

  async updateLine(lineId: number, updateLineDto: UpdateLineDto) {
    const { nomline, longitude, altitude, latitude, syndicatId } =
      updateLineDto;

    const updatedLine = await this.prismaService.line.update({
      where: { id: lineId },
      data: {
        nomline,
        longitude,
        altitude,
        latitude,
        syndicatId,
      },
    });
    return updatedLine;
  }

  async deleteLine(lineId: number) {
    const line = await this.prismaService.line.findUnique({
      where: { id: lineId },
    });

    if (!line) {
      throw new Error(`Ligne avec l'ID ${lineId} n'a pas été trouvée.`);
    }

    await this.prismaService.line.update({
      where: { id: lineId },
      data: { isdeleted: true },
    });

    return { message: `Ligne avec l'ID ${lineId} a été supprimée.` };
  }

  async getAll() {
    const lines = await this.prismaService.line.findMany({
      where: { isdeleted: false },
      select: {
        id: true,
        nomline: true,
        ville: true,
        quartier: true,
        longitude: true,
        altitude: true,
        latitude: true,
        syndicatId: true,
        syndicat: {
          include: {
            user: true,
          },
        },
        engins: {
          select: {
            enginId: true,
            immatricule: true,
            marque: true,
            model: true,
          },
        },
      },
    });

    return lines;
  }

  async creationLine(createLineDto: CreateLineDto) {
    const {
      nomline,
      longitude,
      altitude,
      latitude,
      syndicatId,
      quartier,
      ville,
    } = createLineDto;

    const line = await this.prismaService.line.create({
      data: {
        nomline,
        longitude,
        quartier,
        ville,
        altitude,
        latitude,
        syndicatId,
        isdeleted: false,
      },
    });

    return line;
  }

  async getLineById(lineId: number) {
    const line = await this.prismaService.line.findUnique({
      where: {
        id: lineId,
        isdeleted: false,
      },
      select: {
        id: true,
        nomline: true,
        ville: true,
        quartier: true,
        longitude: true,
        altitude: true,
        latitude: true,
        syndicatId: true,
        syndicat: {
          include: {
            user: true,
          },
        },
        engins: {
          select: {
            enginId: true,
            immatricule: true,
            marque: true,
            model: true,
          },
        },
      },
    });

    if (!line) {
      throw new Error(`Line with ID ${lineId} not found or is deleted`);
    }

    return line;
  }
}
