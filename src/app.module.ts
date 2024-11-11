import { Module } from '@nestjs/common';
import { ConfigModule } from './shared/module/config/config-module';
import { MongooseModule } from './shared/module/persistence/mongoose-module';
import { IdentityModule } from './modules/identity/identity.module';
import { JwtModule } from './shared/module/auth/jwt-module';
import { PropertyModule } from './modules/properties/property.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.forRoot(),
    MongooseModule,
    IdentityModule,
    PropertyModule
  ],
})
export class AppModule { }
