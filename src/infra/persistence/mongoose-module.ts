import { Module } from '@nestjs/common';
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
  controllers: [],
  providers: [],
})
export class MongooseModule {
  onModuleInit() {
    console.log('MongooseModule has been initialized.');
  }
}
