import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrajetDto } from './dto/CreateTrajetDto';
import { UpdateTrajetDto } from './dto/UpdateTrajetDto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TrajetService {
  constructor(private readonly prismaService: PrismaService) {}

  async updateTrajet(trajetId: number, updateTrajetDto: UpdateTrajetDto) {
    const { passagerId, enginId, destinationId, gareId } = updateTrajetDto;
    try {
      const existingTrajet = await this.prismaService.trajet.findUnique({
        where: { trajetId },
      });
    } catch (error) {
      throw new Error(error);
    }

    const updatedTaxe = await this.prismaService.trajet.update({
      where: { trajetId },
      data: {
        passagerId,
        enginId,
        destinationId,
        gareId,
      },
    });

    return updatedTaxe;
  }
  async deleteTrajet(trajetId: number) {
    const trajet = await this.prismaService.trajet.findFirst({
      where: { trajetId },
    });

    if (!trajet) {
      throw new NotFoundException(` l'ID ${trajet} n'a pas été trouvé.`);
    }

    await this.prismaService.trajet.update({
      where: { trajetId },
      data: { isdeleted: true },
    });

    return { message: `trajet avec l'ID ${trajetId} a été supprimé.` };
  }

  async getAll() {
    try {
      const trajets = await this.prismaService.trajet.findMany({
        where: { isdeleted: false },
        include: {
          passager: {
            select: {
              nom: true,
              prenom: true,
              phone: true,
            },
          },
          gare: {
            select: {
              nom: true,
            },
          },
          engin: {
            select: {
              immatricule: true,
              proprietaire: {
                select: {
                  user: {
                    select: {
                      firstname: true,
                      lastname: true,
                      sexe: true,
                    },
                  },
                },
              },
            },
          },
          destination: {
            select: {
              villeDepart: true,
              villeDestination: true,
              prix: true,
            },
          },
        },
      });

      return trajets.map((trajet) => ({
        passagerNom: trajet.passager.nom,
        passagerPrenom: trajet.passager.prenom,
        passagerPhone: trajet.passager.phone,
        gareNom: trajet.gare.nom,
        proprietaireNom: trajet.engin.proprietaire.user.firstname,
        proprietairePrenom: trajet.engin.proprietaire.user.lastname,
        proprietairePhone: trajet.engin.proprietaire.user.sexe,
        villeDepart: trajet.destination.villeDepart,
        villeArrivee: trajet.destination.villeDestination,
        prixDestination: trajet.destination.prix,
        immatriculationEngin: trajet.engin.immatricule,
      }));
    } catch (error) {
      throw new Error(
        `Erreur lors de la récupération des trajets: ${error.message}`,
      );
    }
  }

  async creationTrajet(createTrajetdto: CreateTrajetDto) {
    const { passagerId, enginId, destinationId, gareId } = createTrajetdto;
    try {
      const trajet = await this.prismaService.trajet.create({
        data: {
          passagerId,
          enginId,
          destinationId,
          gareId,
          isdeleted: false,
        },
      });
      return { data: 'insertion effectuée avec succée', datas: trajet };
    } catch (error) {
      throw new Error(error);
    }
  }
}
