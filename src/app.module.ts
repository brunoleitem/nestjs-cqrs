import { Module } from '@nestjs/common';
import { ConfigModule } from './infra/config/config-module';
import { MongooseModule } from './infra/persistence/mongoose-module';
import { IdentityModule } from './core/identity/identity-module';

@Module({
  imports: [ConfigModule.forRoot(), MongooseModule, IdentityModule],
})
export class AppModule {}
