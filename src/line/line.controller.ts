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
import { LineService } from './line.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateLineDto } from './dto/CreateLineDto';
import { UpdateLineDto } from './dto/UpdateLineDto';

@Controller('line')
export class LineController {
  constructor(private readonly lineService: LineService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  createLine(@Body() CreateLineDto: CreateLineDto) {
    return this.lineService.creationLine(CreateLineDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('getAll')
  getAllClient() {
    return this.lineService.getAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('delete/:id')
  deteteUser(
    @Param('id', ParseIntPipe) proprieteId: number,
    @Req() request: Request,
  ) {
    return this.lineService.deleteLine(proprieteId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('update/:id')
  updateSyndicat(
    @Param('id', ParseIntPipe) proprieteId: number,
    @Body() updateLineDto: UpdateLineDto,
    @Req() request: Request,
  ) {
    return this.lineService.updateLine(proprieteId, updateLineDto);
  }
}
