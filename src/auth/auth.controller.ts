import { Controller, ParseIntPipe, Post } from '@nestjs/common';
import {
  Delete,
  Body,
  UseGuards,
  Get,
  Param,
  Req,
  Put,
} from '@nestjs/common/decorators';
import { SignupDto } from './dto/signupDto';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signinDto';
import { AuthGuard } from '@nestjs/passport/dist';
import { ResetPasswordDto } from './dto/resetPassword';
import { from } from 'form-data';
import { UpdateDto } from './dto/updateDto';

@Controller('walli/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  @Post('signin')
  signin(@Body() signinDto: SigninDto) {
    console.log('Received loginDto:', signinDto);
    return this.authService.signin(signinDto);
  }

  @Post('reset_password')
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('delete')
  deleteAccount() {
    return 'ok';
  }

  @Get('getAll')
  getAllUser() {
    return this.authService.getAll();
  }

  @Put('delete/:id')
  deteteUser(
    @Param('id', ParseIntPipe) roleId: number,
    @Req() request: Request,
  ) {
    return this.authService.deleteUser(roleId);
  }

  @Put('update/:id')
  updateUser(
    @Param('id', ParseIntPipe) userId: number,
    @Body() updateDto: UpdateDto,
    @Req() request: Request,
  ) {
    return this.authService.updateUser(userId, updateDto);
  }
}
