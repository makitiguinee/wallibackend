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
import { EnginService } from './engin.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateEnginDto } from './dto/CreateEnginDto';
import { UpdateEnginDto } from './dto/UpdateEnginDto';

@Controller('/walli/v1/engin')
export class EnginController {
  constructor(private readonly enginService: EnginService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  createSyndicat(@Body() createEnginDto: CreateEnginDto) {
    return this.enginService.creationEngin(createEnginDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('getAll')
  getAllClient() {
    return this.enginService.getAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('delete/:id')
  deteteUser(
    @Param('id', ParseIntPipe) enginId: number,
    @Req() request: Request,
  ) {
    return this.enginService.deleteEngin(enginId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('update/:id')
  updateSyndicat(
    @Param('id', ParseIntPipe) enginId: number,
    @Body() updateEnginDto: UpdateEnginDto,
    @Req() request: Request,
  ) {
    return this.enginService.updateEngin(enginId, updateEnginDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('findById/:id')
  findById(@Param('id', ParseIntPipe) enginId: number) {
    return this.enginService.findById(enginId);
  }
}
