import { Controller, ParseIntPipe, Post } from '@nestjs/common';
import { RoleService } from './role.service';
import { Request } from 'express';
import {
  Delete,
  Body,
  UseGuards,
  Req,
  Get,
  Put,
  Param,
} from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport/dist';
import { RoleDto } from './dto/roleDto';
import { UpdateRoleDto } from './dto/updateRoleDto';

@Controller('walli/v1/role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  createRole(@Body() roleRole: RoleDto, @Req() request: Request) {
    return this.roleService.createRoles(roleRole);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('getAll')
  getAllRole() {
    return this.roleService.getAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('update/:id')
  async updateUser(
    @Param('id', ParseIntPipe) roleId: number,
    @Body() updateRoleDto: UpdateRoleDto,
    @Req() request: Request,
  ) {
    return this.roleService.updateRole(roleId, updateRoleDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('delete/:id')
  deteterole(
    @Param('id', ParseIntPipe) roleId: number,
    @Req() request: Request,
  ) {
    return this.roleService.delete(roleId);
  }
}
