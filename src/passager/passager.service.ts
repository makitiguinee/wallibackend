import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePassagerDto } from './dto/CreatePassagerDto';
import { UpdatePassagerDto } from './dto/UpdatePassagerDto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PassagerService {
  constructor(private readonly prismaService: PrismaService) {}
  async updatePassager(
    passagerId: number,
    updatePassagerDto: UpdatePassagerDto,
  ) {
    const { nom, prenom, phone, destinationId } = updatePassagerDto;

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
          destinationId,
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
    await this.prismaService.syndicat.update({
      where: { id: passagerId },
      data: { isdeleted: true },
    });

    return { message: `Syndicat avec l'ID ${passagerId} a été supprimé.` };
  }

  async getAll() {
    return await this.prismaService.passager.findMany({
      include: {
        destination: {
          include: {
            gare: true,
          },
        },
      },
    });
  }

  async creationPassager(createPassager: CreatePassagerDto) {
    const { nom, prenom, phone, destinationId, isdeleted } = createPassager;
    try {
      await this.prismaService.passager.create({
        data: {
          nom,
          prenom,
          phone,
          destinationId,
          isdeleted: false,
        },
      });
      return { data: 'Insertion effectuée avec succès' };
    } catch (error) {
      throw new Error("Erreur lors de l'insertion du passager");
    }
  }
}
