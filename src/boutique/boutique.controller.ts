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
import { BoutiqueService } from './boutique.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateBoutiqueDto } from './dto/createBoutiqueDto';
import { updateBoutiqueDto } from './dto/updateBoutiqueDto';

@Controller('/walli/v1/boutique')
export class BoutiqueController {
  constructor(private readonly boutiqueService: BoutiqueService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  create(@Body() createBoutiqueDto: CreateBoutiqueDto) {
    return this.boutiqueService.createBoutique(createBoutiqueDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('getAll')
  getAllDestination() {
    return this.boutiqueService.getAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('delete/:id')
  deteteUser(
    @Param('id', ParseIntPipe) boutiqueId: number,
    @Req() request: Request,
  ) {
    return this.boutiqueService.deleteBoutique(boutiqueId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('update/:id')
  updateSyndicat(
    @Param('id', ParseIntPipe) boutiqueId: number,
    @Body() updateBoutiqueDto: updateBoutiqueDto,
    @Req() request: Request,
  ) {
    return this.boutiqueService.updateBoutique(boutiqueId, updateBoutiqueDto);
  }
}
