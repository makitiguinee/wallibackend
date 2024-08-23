import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBoutiqueDto } from './dto/createBoutiqueDto';
import { updateBoutiqueDto } from './dto/updateBoutiqueDto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BoutiqueService {
  constructor(private readonly prismaService: PrismaService) {}

  updateBoutique(boutiqueId: number, updateBoutiqueDto: updateBoutiqueDto) {
    const {
      nomBoutique,
      pays,
      ville,
      quartier,
      phone,
      existAgreement,
      altitude,
      isdeleted = false,
      longitude,
      latitude,
    } = updateBoutiqueDto;

    return this.prismaService.boutique.update({
      where: { boutiqueId },
      data: {
        nomBoutique,
        pays,
        ville,
        quartier,
        phone,
        existAgreement,
        altitude,
        isdeleted: false,
        longitude,
        latitude,
      },
    });
  }

  async deleteBoutique(boutiqueId: number) {
    const boutique = await this.prismaService.boutique.findFirst({
      where: { boutiqueId },
    });

    if (!boutique) {
      throw new NotFoundException(
        `Engin avec l'ID ${boutique} n'a pas été trouvé.`,
      );
    }

    try {
      await this.prismaService.boutique.update({
        where: { boutiqueId },
        data: { isdeleted: true },
      });
      return { data: 'suppression effectuée avec succée' };
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAll() {
    try {
      const boutiques = await this.prismaService.boutique.findMany({
        where: {
          isdeleted: false,
        },
        select: {
          nomBoutique: true,
          latitude: true,
          longitude: true,
          ville: true,
          quartier: true,
          user: {
            select: {
              firstname: true,
              lastname: true,
              username: true,
              email: true,
              sexe: true,
            },
          },
        },
      });
      return { data: boutiques };
    } catch (error) {
      throw new Error(error);
    }
  }

  async createBoutique(createBoutiqueDto: CreateBoutiqueDto) {
    const {
      nomBoutique,
      pays,
      ville,
      quartier,
      phone,
      userId,
      existAgreement,
      altitude,
      isdeleted = false,
      longitude,
      latitude,
    } = createBoutiqueDto;

    try {
      const boutique = await this.prismaService.boutique.create({
        data: {
          nomBoutique,
          pays,
          ville,
          quartier,
          phone,
          userId,
          existAgreement,
          altitude,
          isdeleted,
          longitude,
          latitude,
        },
      });
      return { data: 'Insertion effectuée avec succès', datas: boutique };
    } catch (error) {
      throw new Error(error);
    }
  }
}
