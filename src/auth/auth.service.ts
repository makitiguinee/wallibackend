import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignupDto } from './dto/signupDto';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { SigninDto } from './dto/signinDto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ResetPasswordDto } from './dto/resetPassword';
import { NotContains } from 'class-validator';
import { UpdateDto } from './dto/updateDto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signup(signupDto: SignupDto) {
    const { firstname, lastname, email, sexe, password, username, roleId } =
      signupDto;
    const user = await this.prismaService.user.findUnique({ where: { email } });
    if (user) throw new ConflictException('User already exists');
    const hash = await bcrypt.hash(password, 10);
    const createdUser = await this.prismaService.$transaction(
      async (prisma) => {
        const newUser = await prisma.user.create({
          data: {
            email,
            firstname,
            lastname,
            sexe,
            username,
            password: hash,
            isDelete: false,
          },
        });
        await prisma.userRole.create({
          data: {
            userId: newUser.userId,
            roleId: roleId,
          },
        });

        return newUser;
      },
    );

    return { data: 'User successfully created!', user: createdUser };
  }

  async signin(signinDto: SigninDto) {
    const { email, password } = signinDto;
    const secretKey = this.configService.get<string>('SECRET_KEY');
    if (!secretKey) {
      throw new Error('SECRET_KEY must have a value');
    }
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });
    console.log('la valeur du user', user);
    if (!user) {
      throw new ConflictException('User not found');
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new UnauthorizedException('Password does not match');
    }
    const payload = {
      sub: user.userId,
      email: user.email,
    };
    const token = this.jwtService.sign(payload, {
      expiresIn: '24h',
      secret: secretKey,
    });

    return {
      token,
      username: user.username,
      email: user.email,
    };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {}

  async getAll() {
    const users = await this.prismaService.user.findMany({
      where: { isDelete: false },
      select: {
        firstname: true,
        lastname: true,
        username: true,
        sexe: true,
        email: true,
        userRoles: {
          select: {
            role: {
              select: {
                nameRole: true,
              },
            },
          },
        },
      },
    });

    const formattedUsers = users.map((user) => {
      const roleNames = user.userRoles.map(
        (userRole) => userRole.role.nameRole,
      );
      const uniqueRoles = [...new Set(roleNames)];

      return {
        firstname: user.firstname,
        lastname: user.lastname,
        sexe: user.sexe,
        email: user.email,
        roles: uniqueRoles,
      };
    });

    return formattedUsers;
  }

  async deleteUser(userId: number) {
    const user = await this.prismaService.user.findUnique({
      where: { userId },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.prismaService.user.update({
      where: { userId },
      data: { isDelete: true },
    });

    return { data: 'User successfully deleted!' };
  }
  async updateUser(userId: number, updateDto: UpdateDto) {
    const user = await this.prismaService.user.findUnique({
      where: { userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { password, ...updateData } = updateDto;

    const updatedUser = await this.prismaService.user.update({
      where: { userId },
      data: updateData,
    });

    return { message: 'User successfully updated!', user: updatedUser };
  }
}
