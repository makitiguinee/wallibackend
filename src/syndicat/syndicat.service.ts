import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSyndicatDto } from './dto/CreateSyndicatDto';
import { UpdateSyndicatDto } from './dto/UpdateSyndicatDto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SyndicatService {
  constructor(private readonly prismaService: PrismaService) {}

  async updateSyndicat(
    syndicatId: number,
    updateSyndicatDto: UpdateSyndicatDto,
  ) {
    const { phone, dateOfBirth, pays, ville, quartier } = updateSyndicatDto;

    const updatedSyndicat = await this.prismaService.syndicat.update({
      where: { id: syndicatId },
      data: {
        phone,
        dateOfBirth,
        pays,
        ville,
        quartier,
      },
    });

    return updatedSyndicat;
  }

  async deleteSyndicat(syndicatId: number) {
    // Vérifie si le syndicat existe avant de tenter de le supprimer
    const syndicat = await this.prismaService.syndicat.findFirst({
      where: { id: syndicatId },
    });

    if (!syndicat) {
      throw new NotFoundException(
        `Syndicat avec l'ID ${syndicatId} n'a pas été trouvé.`,
      );
    }

    // Marque le syndicat comme supprimé
    await this.prismaService.syndicat.update({
      where: { id: syndicatId },
      data: { isdeleted: true },
    });

    return { message: `Syndicat avec l'ID ${syndicatId} a été supprimé.` };
  }

  async getAll() {
    const syndicats = await this.prismaService.syndicat.findMany({
      where: { isdeleted: false },
      select: {
        phone: true,
        dateOfBirth: true,
        pays: true,
        ville: true,
        quartier: true,
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
        lines: {
          select: {
            id: true,
            nomline: true,
            engins: {
              select: {
                enginId: true,
                immatricule: true,
                marque: true,
                model: true,
                typeActivity: true,
                dateService: true,
                numeroCarteVerte: true,
                existAssurance: true,
                dateEpireAssurance: true,
                existCarteGris: true,
                dateEpireCarteGris: true,
                existVignette: true,
                dateEpireVignette: true,
                proprietaire: {
                  select: {
                    proprietaireId: true,
                    city: true,
                    phone: true,
                    nationality: true,
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
                },
              },
            },
          },
        },
      },
    });

    return syndicats;
  }

  async creationSyndicat(createSyndicatDto: CreateSyndicatDto) {
    const { phone, dateOfBirth, pays, ville, quartier, userId } =
      createSyndicatDto;

    const syndicat = await this.prismaService.syndicat.create({
      data: {
        phone,
        dateOfBirth,
        pays,
        ville,
        quartier,
        isdeleted: false,
        userId,
      },
    });

    return syndicat;
  }
}
