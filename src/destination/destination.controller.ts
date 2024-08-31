import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { DestinationService } from './destination.service';
import { CreateDestinationDto } from './dto/CreateDestinationDto';
import { UpdateDestinationDto } from './dto/UpdateDestinationDto';
import { AuthGuard } from '@nestjs/passport';

@Controller('/walli/v1/destination')
export class DestinationController {
  constructor(private readonly destinationService: DestinationService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  create(@Body() createDestinationDto: CreateDestinationDto) {
    return this.destinationService.createDestionatio(createDestinationDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('getAll')
  getAllDestination() {
    return this.destinationService.getAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('delete/:id')
  deteteUser(
    @Param('id', ParseIntPipe) destinationId: number,
    @Req() request: Request,
  ) {
    return this.destinationService.deleteDestination(destinationId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('update/:id')
  updateSyndicat(
    @Param('id', ParseIntPipe) destinationId: number,
    @Body() updateDestinationDto: UpdateDestinationDto,
    @Req() request: Request,
  ) {
    return this.destinationService.updateDestination(
      destinationId,
      updateDestinationDto,
    );
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('findById/:id')
  async getById(@Param('id') id: string) {
    const destinationId = parseInt(id, 10);
    if (isNaN(destinationId)) {
      throw new NotFoundException(`ID invalide: ${id}`);
    }
    const destination =
      await this.destinationService.getByIdDestination(destinationId);
    if (!destination) {
      throw new NotFoundException(
        `Destination avec l'ID ${destinationId} non trouvée`,
      );
    }

    return destination;
  }
}
