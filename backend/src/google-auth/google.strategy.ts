import {PassportStrategy} from '@nestjs/passport';
import {Injectable, UnauthorizedException} from '@nestjs/common';
import {Strategy, VerifyCallback} from 'passport-google-oauth20';
import {UserService} from '../user/user.service';
import {AuthService} from "../auth/auth.service";
import * as bcrypt from 'bcrypt';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_REDIRECT_URI,
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    const {id, emails, displayName, photos} = profile;

    const email = emails[0]?.value;
    if (!email) {
      throw new UnauthorizedException('Google account does not have an email.');
    }

    let user = await this.userService.findByEmail(email);
    if (!user) {
      user = await this.userService.create({
        email,
        googleId: id,
        name: displayName,
        avatar: photos[0]?.value
      });
    }
    
    const payload = {
      id: user.idUser,
      email: user.email,
      rol: user.rol
    }
    const tokens = await this.authService.generateJwt(payload);
    done(null, { ...tokens, user });
  }

}
