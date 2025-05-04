import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import {
  Strategy,
  StrategyOptions,
  VerifyCallback,
} from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(configService: ConfigService) {
    const options: StrategyOptions = {
      clientID: configService.get<string>('Google.ID')!,
      clientSecret: configService.get<string>('Google.SECRET')!,
      callbackURL: configService.get<string>('Google.CALLBACK'),
      scope: ['email', 'profile'],
    };
    super(options);
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, photos } = profile;
    const user = {
      email: profile.emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos,
      accessToken,
    };
    done(null, user);
  }
}
