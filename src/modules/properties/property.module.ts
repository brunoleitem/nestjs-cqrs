import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { JwtModule } from 'src/shared/module/auth/jwt-module'
import { PropertyService } from './core/service/property.service'
import { PropertyController } from './http/rest/property.controller'
import { PropertyRepository } from './persistence/property.repository'
import { PropertySchema } from './persistence/property.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Property',
        schema: PropertySchema
      }
    ]),
    JwtModule.forRoot()
  ],
  providers: [PropertyRepository, PropertyService],
  controllers: [PropertyController]
})
export class PropertyModule {}
