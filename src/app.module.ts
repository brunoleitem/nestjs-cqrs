import { Module } from '@nestjs/common';
import { ConfigModule } from './shared/config/config-module';
import { MongooseModule } from './shared/persistence/mongoose-module';
import { IdentityModule } from './core/identity/identity-module';
import { JwtModule } from './shared/http/auth/jwt-module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.forRoot(),
    MongooseModule,
    IdentityModule,
  ],
})
export class AppModule {}
