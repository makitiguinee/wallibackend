import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProduitDto } from './dto/CreateProduitDto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateProduitDto } from './dto/UpdateProduitDto';

@Injectable()
export class ProduitService {
  constructor(private readonly prismaService: PrismaService) {}

  async interessetedProduit(
    produitId: number,
    updateProduitDto: UpdateProduitDto,
  ) {
    const produit = await this.prismaService.produit.findFirst({
      where: { produitId },
    });

    if (!produit) {
      throw new NotFoundException(
        `Engin avec l'ID ${produit} n'a pas été trouvé.`,
      );
    }

    try {
      await this.prismaService.produit.update({
        where: { produitId },
        data: { intereseted: true },
      });
      return { data: 'produit commander avec succés' };
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateProduit(produitId: number, updateProduitDto: UpdateProduitDto) {
    const { nomProduit, photo, description, prix, type } = updateProduitDto;
    try {
      await this.prismaService.produit.update({
        where: { produitId },
        data: {
          nomProduit,
          photo,
          description,
          prix,
          type,
        },
      });
      return { data: 'la mise a jour effectuée avec succée' };
    } catch (error) {}
  }

  async deleteProduit(produitId: number) {
    const produit = await this.prismaService.produit.findFirst({
      where: { produitId },
    });

    if (!produit) {
      throw new NotFoundException(
        `Engin avec l'ID ${produit} n'a pas été trouvé.`,
      );
    }

    try {
      await this.prismaService.produit.update({
        where: { produitId },
        data: { isdeleted: true },
      });
      return { data: 'suppression effectuée avec succée' };
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAll() {
    try {
      return await this.prismaService.produit.findMany({
        where: { isdeleted: false },
        include: {
          boutique: true,
        },
      });
    } catch (error) {
      throw new Error(
        'Erreur lors de la récupération des produits avec les boutiques associées',
      );
    }
  }
  async createProduit(createProduitDto: CreateProduitDto) {
    const { nomProduit, photo, description, boutiqueId, prix, type } =
      createProduitDto;

    try {
      const produit = await this.prismaService.produit.create({
        data: {
          nomProduit,
          photo,
          description,
          intereseted: false,
          isdeleted: false,
          boutiqueId,
          prix,
          type,
        },
      });
      return { data: produit };
    } catch (error) {
      console.error('Error creating produit:', error);
      throw new Error('Failed to create produit');
    }
  }
}
