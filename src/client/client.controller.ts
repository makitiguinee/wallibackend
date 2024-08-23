import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateProprietaireDto } from './dto/CreateProprietaireDto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateProprietaireDto } from './dto/UpdateProprietaireDto';

@Controller('walli/v1/client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  createClient(@Body() createclientDto: CreateProprietaireDto) {
    return this.clientService.creationClient(createclientDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('getAll')
  getAllClient() {
    return this.clientService.getAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('delete/:id')
  deteteUser(
    @Param('id', ParseIntPipe) proprieteId: number,
    @Req() request: Request,
  ) {
    return this.clientService.deleteClient(proprieteId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('update/:id')
  updateUser(
    @Param('id', ParseIntPipe) proprieteId: number,
    @Body() updateClientDto: UpdateProprietaireDto,
    @Req() request: Request,
  ) {
    return this.clientService.updateclient(proprieteId, updateClientDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('findById/:id')
  findById(@Param('id', ParseIntPipe) proprieteId: number) {
    return this.clientService.findById(proprieteId);
  }
}
