import { Injectable } from '@nestjs/common';
import { CreateProprietaireDto } from './dto/CreateProprietaireDto';
import { UpdateProprietaireDto } from './dto/UpdateProprietaireDto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ClientService {
  constructor(private readonly prismaService: PrismaService) {}

  async updateclient(
    proprietaireId: number,
    updateClientDto: UpdateProprietaireDto,
  ) {
    const { city, nationality, phone, typePice, dateOfBirth, pieceNumber } =
      updateClientDto;
    const proprietaire = await this.prismaService.proprietaire.findFirst({
      where: { proprietaireId: proprietaireId },
    });

    if (!proprietaire) {
      throw new Error(
        `Le propriétaire avec l'ID ${proprietaireId} n'a pas été trouvé.`,
      );
    }

    const updateResult = await this.prismaService.proprietaire.update({
      where: { proprietaireId: proprietaireId },
      data: { city, nationality, phone, typePice, dateOfBirth, pieceNumber },
    });

    return updateResult;
  }

  async deleteClient(proprietaireId: number) {
    const proprietaire = await this.prismaService.proprietaire.findFirst({
      where: { proprietaireId: proprietaireId },
    });

    if (!proprietaire) {
      throw new Error(
        `Proprietaire avec l'ID ${proprietaireId} n'a pas été trouvé.`,
      );
    }

    const updateResult = await this.prismaService.proprietaire.update({
      where: { proprietaireId: proprietaireId },
      data: { isdeletd: true },
    });

    return updateResult;
  }

  async getAll() {
    const proprietaires = await this.prismaService.proprietaire.findMany({
      where: { isdeletd: false },
      select: {
        proprietaireId: true,
        city: true,
        phone: true,
        nationality: true,
        dateOfBirth: true,
        typePice: true,
        pieceNumber: true,
        userId: true,
        user: {
          select: {
            userId: true,
            firstname: true,
            lastname: true,
            username: true,
            email: true,
            sexe: true,
          },
        },
      },
    });

    return proprietaires;
  }

  async creationClient(createClientDto: CreateProprietaireDto) {
    const {
      city,
      phone,
      nationality,
      dateOfBirth,
      typePice,
      pieceNumber,
      userId,
    } = createClientDto;

    const client = await this.prismaService.proprietaire.create({
      data: {
        city,
        dateOfBirth,
        nationality,
        pieceNumber,
        phone,
        typePice,
        userId,
        isdeletd: false,
      },
    });

    return client;
  }
}
