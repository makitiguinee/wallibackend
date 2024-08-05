import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RoleDto } from './dto/roleDto';
import { UpdateRoleDto } from './dto/updateRoleDto';

@Injectable()
export class RoleService {
  constructor(private readonly prismaService: PrismaService) {}

  async createRoles(roleDto: RoleDto) {
    const { nameRole, descriptionRole, permissions } = roleDto;

    const role = await this.prismaService.role.create({
      data: {
        nameRole,
        descriptionRole,
        permissions,
      },
    });

    return { data: 'role successfull created' };
  }

  async getAll() {
    return await this.prismaService.role.findMany();
  }

  async updateRole(roleId: number, updateRoleDto: UpdateRoleDto) {
    const role = await this.prismaService.role.findUnique({
      where: { roleId },
    });

    if (!role) throw new ForbiddenException('roleId not found');
    await this.prismaService.role.update({
      where: { roleId },
      data: { ...updateRoleDto },
    });
    return { data: 'role updated', role };
  }

  async delete(roleId: number) {
    const role = this.prismaService.role.findUnique({ where: { roleId } });
    if (!role) throw new NotFoundException('roleId not found');
    await this.prismaService.role.delete({ where: { roleId } });
    return { data: 'role successfull delete' };
  }
}
