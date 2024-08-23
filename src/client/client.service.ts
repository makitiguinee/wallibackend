import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

    if (!proprietaireId || typeof proprietaireId !== 'number') {
      throw new BadRequestException('Invalid proprietaire ID provided.');
    }
    const proprietaire = await this.prismaService.proprietaire.findFirst({
      where: { proprietaireId: proprietaireId },
    });

    if (!proprietaire) {
      throw new NotFoundException(
        `Le propriétaire avec l'ID ${proprietaireId} n'a pas été trouvé.`,
      );
    }
    try {
      const updateResult = await this.prismaService.proprietaire.update({
        where: { proprietaireId: proprietaireId },
        data: { city, nationality, phone, typePice, dateOfBirth, pieceNumber },
      });

      return updateResult;
    } catch (error) {
      throw new BadRequestException(
        `Erreur lors de la mise à jour du propriétaire avec l'ID ${proprietaireId}: ${error.message}`,
      );
    }
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

  async findById(proprietaireId: number) {
    const client = await this.prismaService.proprietaire.findUnique({
      where: { proprietaireId },
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

    if (!client) {
      throw new NotFoundException(`Client with ID ${proprietaireId} not found`);
    }

    return client;
  }
}
