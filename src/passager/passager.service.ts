import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePassagerDto } from './dto/CreatePassagerDto';
import { UpdatePassagerDto } from './dto/UpdatePassagerDto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PassagerService {
  constructor(private readonly prismaService: PrismaService) {}
  async updatePassager(
    passagerId: number,
    updatePassagerDto: UpdatePassagerDto,
  ) {
    const { nom, prenom, phone, villeDepart, villeDestination, status } =
      updatePassagerDto;

    const existPassager = await this.prismaService.engin.findUnique({
      where: { enginId: passagerId },
    });
    if (!existPassager) {
      throw new NotFoundException(
        `Engin avec l'ID ${passagerId} n'a pas été trouvé.`,
      );
    }
    try {
      await this.prismaService.passager.update({
        where: { passagerId: passagerId },
        data: {
          nom,
          prenom,
          phone,
          villeDepart,
          villeDestination,
          status,
        },
      });
      return { data: 'mise a jour effectuée avec succés' };
    } catch (error) {
      throw new Error('Erreur lors de la mise a jour du passager');
    }
  }

  async deletePassager(passagerId: number) {
    const passager = await this.prismaService.passager.findFirst({
      where: { passagerId },
    });

    if (!passager) {
      throw new NotFoundException(
        `Engin avec l'ID ${passager} n'a pas été trouvé.`,
      );
    }
    await this.prismaService.passager.update({
      where: { passagerId },
      data: { isdeleted: true },
    });

    return { message: `Syndicat avec l'ID ${passagerId} a été supprimé.` };
  }

  async getAll() {
    try {
      const passagers = await this.prismaService.passager.findMany({
        where: {
          isdeleted: false,
        },
        select: {
          passagerId: true,
          nom: true,
          prenom: true,
          villeDepart: true,
          villeDestination: true,
          status: true,
          phone: true,
          gare: {
            select: {
              gareId: true,
              nom: true,
              city: true,
            },
          },
        },
      });

      return { data: 'Récupération effectuée avec succès', datas: passagers };
    } catch (error) {
      console.error(
        'Erreur lors de la récupération des passagers:',
        error.message,
        error,
      );
      throw new Error(
        'Erreur lors de la récupération des passagers: ' + error.message,
      );
    }
  }

  async creationPassager(createPassager: CreatePassagerDto) {
    const {
      nom,
      prenom,
      phone,
      villeDepart,
      villeDestination,
      gareId,
      status,
    } = createPassager;

    try {
      const passager = await this.prismaService.passager.create({
        data: {
          nom,
          prenom,
          villeDepart,
          villeDestination,
          gareId,
          status,
          phone,
          isdeleted: false,
        } as Prisma.PassagerUncheckedCreateInput,
      });

      return { data: 'Insertion effectuée avec succès', datas: passager };
    } catch (error) {
      console.error(
        "Erreur lors de l'insertion du passager:",
        error.message,
        error,
      );
      throw new Error(
        "Erreur lors de l'insertion du passager: " + error.message,
      );
    }
  }

  async getByIdPassager(passagerId: number) {
    try {
      if (!passagerId || passagerId <= 0) {
        throw new Error('ID du passager invalide.');
      }

      const passager = await this.prismaService.passager.findUnique({
        where: {
          passagerId: passagerId,
          isdeleted: false,
        },
        select: {
          passagerId: true,
          nom: true,
          prenom: true,
          villeDepart: true,
          villeDestination: true,
          status: true,
          phone: true,
          gare: {
            select: {
              gareId: true,
              nom: true,
              city: true,
            },
          },
        },
      });
      if (!passager) {
        throw new Error('Passager non trouvé.');
      }

      return {
        data: 'Récupération effectuée avec succès',
        datas: passager,
      };
    } catch (error) {
      console.error(
        'Erreur lors de la récupération du passager:',
        error.message,
        error,
      );
      throw new Error(
        'Erreur lors de la récupération du passager: ' + error.message,
      );
    }
  }
}
