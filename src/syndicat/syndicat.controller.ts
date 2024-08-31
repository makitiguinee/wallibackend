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
import { SyndicatService } from './syndicat.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateSyndicatDto } from './dto/CreateSyndicatDto';
import { UpdateProprietaireDto } from 'src/client/dto/UpdateProprietaireDto';

@Controller('walli/v1/syndicat')
export class SyndicatController {
  constructor(private readonly syndicatService: SyndicatService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  createSyndicat(@Body() createclientDto: CreateSyndicatDto) {
    return this.syndicatService.creationSyndicat(createclientDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('getAll')
  getAllClient() {
    return this.syndicatService.getAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('delete/:id')
  deteteUser(
    @Param('id', ParseIntPipe) proprieteId: number,
    @Req() request: Request,
  ) {
    return this.syndicatService.deleteSyndicat(proprieteId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('update/:id')
  updateSyndicat(
    @Param('id', ParseIntPipe) proprieteId: number,
    @Body() updateSyndicat: UpdateProprietaireDto,
    @Req() request: Request,
  ) {
    return this.syndicatService.updateSyndicat(proprieteId, updateSyndicat);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('findById/:id')
  findById(@Param('id', ParseIntPipe) proprieteId: number) {
    return this.syndicatService.findById(proprieteId);
  }
}
