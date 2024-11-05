import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '../config/config-module';
import { MongooseModule as NestJsMongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '../config/config-service';

@Module({
  imports: [
    NestJsMongooseModule.forRootAsync({
      imports: [ConfigModule.forRoot()],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('db_host'),
        dbName: configService.get('db_name'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class MongooseModule {
  onModuleInit() {
    Logger.log('MongooseModule has been initialized.');
  }
}
