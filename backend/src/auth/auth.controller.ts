import {Body, Controller, Get, Param, Patch, Post, UnauthorizedException, UseGuards} from '@nestjs/common';
import {AuthService} from './auth.service';
import {RegisterDto} from './dto/register.dto';
import {LoginDto} from './dto/login.dto';
import {Auth} from "./decorators/auth.decorators";
import {Rol} from "../shared/enums/rol.enum";
import {UpdatePasswordDto} from "./dto/update-password.dto";
import {AuthGuard} from "./guard/auth.guard";
import {RolesGuard} from "./guard/roles.guard";
import {ActiveUserDecorator} from "../shared/decorators/active-user.decorator";
import {UserActiveInterface} from "../shared/interfaces/user-active.interface";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    try {
      return this.authService.login(loginDto);
    } catch {
      throw new UnauthorizedException('Credential incorrect');
    }
  }

  @Patch('change-password/:id')
  @Auth(Rol.USUARIO, Rol.CREADOR_CONTENIDO, Rol.ADMIN, Rol.GESTOR_CLIENTES)
  changePassword(
    @Param('id') id: string,
    @Body() passwordDto: UpdatePasswordDto
  ) {
    return this.authService.changePassword(id, passwordDto);
  }

  @Post('refresh')
  refresh(
    @Body('refreshToken') refreshToken: string
  ) {
    if (!refreshToken) {
      throw new UnauthorizedException('Not provided token');
    }

    return this.authService.refreshToken(refreshToken);
  }

  @Get('profile')
  @Auth(
    Rol.USUARIO,
    Rol.ADMIN,
    Rol.GESTOR_CLIENTES,
    Rol.CREADOR_CONTENIDO
  )
  @UseGuards(AuthGuard, RolesGuard)
  profile(@ActiveUserDecorator() user: UserActiveInterface) {
    return this.authService.profile(user)
  }
}
