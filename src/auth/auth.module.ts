import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { PasswordService } from './password.service';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { SecurityConfig } from '../common/configs/config.interface';
import { JwtAuthGuard } from './auth.guard';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        const securityConfig = configService.get<SecurityConfig>('security');
        return {
          secret: configService.get<string>('JWT_ACCESS_SECRET'),
          signOptions: {
            expiresIn: securityConfig?.expiresIn || '2m',
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, JwtStrategy, JwtAuthGuard, PasswordService],
  exports: [JwtAuthGuard],
})
export class AuthModule {}
