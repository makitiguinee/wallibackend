import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDestinationDto } from './dto/CreateDestinationDto';
import { UpdateDestinationDto } from './dto/UpdateDestinationDto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DestinationService {
  constructor(private readonly prismaService: PrismaService) {}

  async deleteDestination(destinationId: number) {
    const destination = await this.prismaService.destination.findFirst({
      where: { destinationId },
    });

    if (!destination) {
      throw new NotFoundException(
        `Engin avec l'ID ${destination} n'a pas été trouvé.`,
      );
    }
    try {
      await this.prismaService.destination.update({
        where: { destinationId },
        data: { isdeleted: true },
      });
      return { data: 'suppression effectuée avec succée' };
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAll() {
    try {
      return await this.prismaService.destination.findMany({
        where: {
          isdeleted: false,
        },
        select: {
          villeDepart: true,
          villeDestination: true,
          gare: {
            select: {
              nom: true,
            },
          },
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  updateDestination(
    destinationId: number,
    updateDestinationDto: UpdateDestinationDto,
  ) {
    const { villeDepart, villeDestination, gareId } = updateDestinationDto;
    return this.prismaService.destination.update({
      where: { destinationId },
      data: {
        villeDepart,
        villeDestination,
        gareId,
      },
    });
  }

  async createDestionatio(createDestinationDto: CreateDestinationDto) {
    const { villeDepart, villeDestination, gareId, isdeleted } =
      createDestinationDto;
    try {
      await this.prismaService.destination.create({
        data: {
          villeDepart,
          villeDestination,
          gareId,
          isdeleted: false,
        },
      });
      return { data: 'insertion effectuée avec succée' };
    } catch (error) {
      throw new Error(error);
    }
  }
}
