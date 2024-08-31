import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PassagerService } from './passager.service';
import { AuthGuard } from '@nestjs/passport';
import { CreatePassagerDto } from './dto/CreatePassagerDto';
import { UpdatePassagerDto } from './dto/UpdatePassagerDto';

@Controller('/walli/v1/passager')
export class PassagerController {
  constructor(private readonly passagerService: PassagerService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  createSyndicat(@Body() createPassager: CreatePassagerDto) {
    return this.passagerService.creationPassager(createPassager);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('getAll')
  getAllClient() {
    return this.passagerService.getAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('delete/:id')
  deteteUser(
    @Param('id', ParseIntPipe) passagerId: number,
    @Req() request: Request,
  ) {
    return this.passagerService.deletePassager(passagerId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('update/:id')
  updateSyndicat(
    @Param('id', ParseIntPipe) passagerId: number,
    @Body() updatePassagerDto: UpdatePassagerDto,
    @Req() request: Request,
  ) {
    return this.passagerService.updatePassager(passagerId, updatePassagerDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('getById/:id')
  async getByIdPassager(
    @Param('id', ParseIntPipe) passagerId: number,
    @Req() request: Request,
  ) {
    try {
      const result = await this.passagerService.getByIdPassager(passagerId);
      return result;
    } catch (error) {
      throw new HttpException(
        `Erreur lors de la récupération du passager: ${error.message}`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
