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
import { TaxeService } from './taxe.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateTaxeDto } from './dto/CreateTaxeDto';
import { UpdateTaxeDto } from './dto/UpdateTaxeDto';

@Controller('taxe')
export class TaxeController {
  constructor(private readonly taxeService: TaxeService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  createTaxe(@Body() createTaxeDto: CreateTaxeDto) {
    return this.taxeService.creationTaxe(createTaxeDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('getAll')
  getAllTaxe() {
    return this.taxeService.getAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('delete/:id')
  deteteTaxe(
    @Param('id', ParseIntPipe) taxeId: number,
    @Req() request: Request,
  ) {
    return this.taxeService.deletetaxe(taxeId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('update/:id')
  updateTaxe(
    @Param('id', ParseIntPipe) taxeId: number,
    @Body() updateTaxeDto: UpdateTaxeDto,
    @Req() request: Request,
  ) {
    return this.taxeService.updateTaxe(taxeId, updateTaxeDto);
  }
}
