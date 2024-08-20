import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateGareDto } from './dto/CreateGareDto';
import { GareService } from './gare.service';
import { UpdateGareDto } from './dto/UpdateGareDto';
import { AuthGuard } from '@nestjs/passport';

@Controller('gare')
export class GareController {
  constructor(private readonly gareService: GareService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('/create')
  async createGare(@Body() createGareDto: CreateGareDto) {
    return this.gareService.createGare(createGareDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('update/:id')
  async updateGare(
    @Param('id') gareId: number,
    @Body() updateGareDto: UpdateGareDto,
  ) {
    return this.gareService.updateGare(gareId, updateGareDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('getAll')
  async getAllGares() {
    return this.gareService.getAllGares();
  }

  //   @Get(':id')
  //   async getGareById(@Param('id') gareId: number) {
  //     return this.gareService.getGareById(gareId);
  //   }

  @UseGuards(AuthGuard('jwt'))
  @Put('delete/:id')
  async deleteGare(@Param('id') gareId: number) {
    return this.gareService.deleteGare(gareId);
  }
}
