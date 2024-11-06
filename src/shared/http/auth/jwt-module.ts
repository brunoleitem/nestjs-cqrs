import { JwtModuleOptions } from '@nestjs/jwt';
import { JwtModule as NestJsJwtModule } from '@nestjs/jwt';
import { ConfigModule } from '../../config/config-module';
import { ConfigService } from '../../config/config-service';
import { Module } from '@nestjs/common';
import { JwtService } from './jwt-service';

@Module({})
export class JwtModule {
  static forRoot(options?: JwtModuleOptions) {
    return {
      module: JwtModule,
      providers: [JwtService],
      exports: [JwtService],
      imports: [
        NestJsJwtModule.registerAsync({
          imports: [ConfigModule.forRoot()],
          useFactory: async (configService: ConfigService) => ({
            secret: configService.get('jwt_secret'),
            signOptions: { expiresIn: '1h' },
            global: true,
            ...options,
          }),
          inject: [ConfigService],
        }),
      ],
    };
  }
}
