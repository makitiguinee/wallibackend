import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaxeDto } from './dto/CreateTaxeDto';
import { UpdateTaxeDto } from './dto/UpdateTaxeDto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TaxeService {
  constructor(private readonly prismaService: PrismaService) {}

  async updateTaxe(taxeId: number, updateTaxeDto: UpdateTaxeDto) {
    const { montant, periode, isdelete, statutPaiement } = updateTaxeDto;

    const existingTaxe = await this.prismaService.taxe.findUnique({
      where: { taxeId: taxeId },
    });

    if (!existingTaxe) {
      throw new NotFoundException(
        `Engin avec l'ID ${taxeId} n'a pas été trouvé.`,
      );
    }

    const updatedTaxe = await this.prismaService.taxe.update({
      where: { taxeId },
      data: {
        montant,
        periode,
        statutPaiement,
      },
    });

    return updatedTaxe;
  }

  async deletetaxe(taxeId: number) {
    const engin = await this.prismaService.taxe.findFirst({
      where: { taxeId: taxeId },
    });

    if (!engin) {
      throw new NotFoundException(
        `Engin avec l'ID ${taxeId} n'a pas été trouvé.`,
      );
    }

    await this.prismaService.syndicat.update({
      where: { id: taxeId },
      data: { isdeleted: true },
    });

    return { message: `Syndicat avec l'ID ${taxeId} a été supprimé.` };
  }

  async getAll() {
    const taxes = await this.prismaService.taxe.findMany({
      include: {
        enginTaxes: {
          include: {
            engin: {
              include: {
                proprietaire: {
                  include: {
                    user: true,
                  },
                },
                line: true,
                destination: true,
              },
            },
          },
        },
      },
    });
  }

  async creationTaxe(createTaxeDto: CreateTaxeDto) {
    const { montant, periode, statutPaiement, isdeleted, enginId } =
      createTaxeDto;
    const taxe = await this.prismaService.taxe.create({
      data: {
        montant,
        periode,
        statutPaiement,
        isdeleted: false,
      },
    });
    const enginTaxe = await this.prismaService.enginTaxe.create({
      data: {
        enginId,
        taxeId: taxe.taxeId,
      },
    });

    return {
      taxe,
      enginTaxe,
    };
  }
}
