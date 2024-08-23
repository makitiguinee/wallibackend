import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateProduitDto } from './dto/CreateProduitDto';
import { ProduitService } from './produit.service';
import { UpdateProduitDto } from './dto/UpdateProduitDto';

@Controller('/walli/v1/produit')
export class ProduitController {
  constructor(private readonly produitService: ProduitService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  create(@Body() createProduitDto: CreateProduitDto) {
    return this.produitService.createProduit(createProduitDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('getAll')
  getAllDestination() {
    return this.produitService.getAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('delete/:id')
  deteteUser(
    @Param('id', ParseIntPipe) produitId: number,
    @Req() request: Request,
  ) {
    return this.produitService.deleteProduit(produitId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('interesseted/:id')
  interesseted(
    @Param('id', ParseIntPipe) produitId: number,
    @Body() updateProduitDto: UpdateProduitDto,
    @Req() request: Request,
  ) {
    return this.produitService.interessetedProduit(produitId, updateProduitDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('update/:id')
  updateSyndicat(
    @Param('id', ParseIntPipe) produitId: number,
    @Body() updateProduitDto: UpdateProduitDto,
    @Req() request: Request,
  ) {
    return this.produitService.updateProduit(produitId, updateProduitDto);
  }
}
