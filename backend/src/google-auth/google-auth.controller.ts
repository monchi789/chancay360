import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

@Controller('auth/google')
export class GoogleAuthController {
  @Get()
  @UseGuards(AuthGuard('google'))
  async googleLogin(): Promise<void> {}

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  async googleLoginRedirect(@Req() req: any, @Res() res: Response): Promise<void> {
    const { accessToken, refreshToken, user } = req.user;

    const redirectUrl = `${process.env.FRONTEND_URL}/auth/callback?` +
      `accessToken=${accessToken}&` +
      `refreshToken=${refreshToken}&` +
      `email=${user.email}&` +
      `id=${user.idUser}`;

    res.redirect(redirectUrl);
  }
}