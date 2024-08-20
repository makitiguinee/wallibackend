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
import { DestinationService } from './destination.service';
import { CreateDestinationDto } from './dto/CreateDestinationDto';
import { UpdateDestinationDto } from './dto/UpdateDestinationDto';
import { AuthGuard } from '@nestjs/passport';

@Controller('destination')
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
}
