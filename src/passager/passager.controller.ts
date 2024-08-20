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
import { PassagerService } from './passager.service';
import { AuthGuard } from '@nestjs/passport';
import { CreatePassagerDto } from './dto/CreatePassagerDto';
import { UpdatePassagerDto } from './dto/UpdatePassagerDto';

@Controller('passager')
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
}
