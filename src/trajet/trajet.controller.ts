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
import { TrajetService } from './trajet.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateTrajetDto } from './dto/CreateTrajetDto';
import { UpdateTrajetDto } from './dto/UpdateTrajetDto';

@Controller('/walli/v1/trajet')
export class TrajetController {
  constructor(private readonly trajetService: TrajetService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  createTaxe(@Body() createTrajet: CreateTrajetDto) {
    return this.trajetService.creationTrajet(createTrajet);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('getAll')
  getAllTaxe() {
    return this.trajetService.getAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('delete/:id')
  deteteTaxe(
    @Param('id', ParseIntPipe) trajetId: number,
    @Req() request: Request,
  ) {
    return this.trajetService.deleteTrajet(trajetId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('update/:id')
  updateTaxe(
    @Param('id', ParseIntPipe) trajetId: number,
    @Body() updateTrajetDto: UpdateTrajetDto,
    @Req() request: Request,
  ) {
    return this.trajetService.updateTrajet(trajetId, updateTrajetDto);
  }
}
