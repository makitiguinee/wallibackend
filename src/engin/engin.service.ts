import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEnginDto } from './dto/CreateEnginDto';
import { UpdateEnginDto } from './dto/UpdateEnginDto';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class EnginService {
  constructor(private readonly prismaService: PrismaService) {}
  async updateEngin(enginId: number, updateEnginDto: UpdateEnginDto) {
    const {
      immatricule,
      marque,
      model,
      dateService,
      numeroCarteVerte,
      existAssurance,
      dateEpireAssurance,
      existCarteGris,
      dateEpireCarteGris,
      existVignette,
      dateEpireVignette,
      isdeleted,
      destinationId,
      lineId,
    } = updateEnginDto;

    const existingEngin = await this.prismaService.engin.findUnique({
      where: { enginId: enginId },
    });
    if (!existingEngin) {
      throw new NotFoundException(
        `Engin avec l'ID ${enginId} n'a pas été trouvé.`,
      );
    }
    const updatedEngin = await this.prismaService.engin.update({
      where: { enginId: enginId },
      data: {
        immatricule,
        marque,
        model,
        dateService,
        numeroCarteVerte,
        existAssurance,
        dateEpireAssurance,
        existCarteGris,
        dateEpireCarteGris,
        existVignette,
        dateEpireVignette,
        isdeleted,
        destinationId,
        lineId,
      },
    });

    return updatedEngin;
  }

  async deleteEngin(enginId: number) {
    const engin = await this.prismaService.engin.findFirst({
      where: { enginId: enginId },
    });

    if (!engin) {
      throw new NotFoundException(
        `Engin avec l'ID ${enginId} n'a pas été trouvé.`,
      );
    }
    await this.prismaService.syndicat.update({
      where: { id: enginId },
      data: { isdeleted: true },
    });

    return { message: `Syndicat avec l'ID ${enginId} a été supprimé.` };
  }

  async getAll() {
    return await this.prismaService.engin.findMany({
      where: { isdeleted: false },
      include: {
        proprietaire: {
          include: {
            user: true,
          },
        },
      },
    });
  }

  async creationEngin(createEnginDto: CreateEnginDto) {
    const {
      immatricule,
      marque,
      model,
      typeActivity,
      dateService,
      numeroCarteVerte,
      existAssurance,
      dateEpireAssurance,
      existCarteGris,
      dateEpireCarteGris,
      existVignette,
      dateEpireVignette,
      proprietaireId,
      destinationId,
      lineId,
    } = createEnginDto;

    return await this.prismaService.engin.create({
      data: {
        immatricule,
        marque,
        model,
        typeActivity,
        dateService,
        numeroCarteVerte,
        existAssurance,
        dateEpireAssurance,
        existCarteGris,
        dateEpireCarteGris,
        existVignette,
        isdeleted: false,
        dateEpireVignette,
        proprietaire: { connect: { proprietaireId: proprietaireId } },
        destination: destinationId
          ? { connect: { destinationId: destinationId } }
          : undefined,
        line: lineId ? { connect: { id: lineId } } : undefined,
      },
    });
  }
}
