import { Module } from '@nestjs/common';
import { ConfigModule } from './infra/config/config-module';
import { MongooseModule } from './infra/persistence/mongoose-module';
import { IdentityModule } from './core/identity/identity-module';
import { JwtModule } from './infra/auth/jwt-module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.forRoot(),
    MongooseModule,
    IdentityModule,
  ],
})
export class AppModule {}
