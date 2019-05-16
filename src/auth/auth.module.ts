import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import {Passport} from '@nestjs/passport'

@Module({
    imports: [
        Passport.register(),
        JwtModule.register({

        secretOrPrivateKey: 'secretKey',
  
        signOptions: {
  
          expiresIn: 3600,
  
        }
    })
    ],
    providers: [AuthService]
})
export class AuthModule {}
