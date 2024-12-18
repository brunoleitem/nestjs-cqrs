import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards
} from '@nestjs/common'
import { CurrentUser } from '@src/shared/http/guards/user-decorator'
import { AuthGuard } from 'src/shared/http/guards/auth-guard'
import { PropertyService } from '../../core/service/property.service'
import { CreatePropertyDTO } from '../dto/create-property.dto'

@Controller('properties')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Post('create')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async createProperty(
    @CurrentUser() req,
    @Body() createPropertyDTO: CreatePropertyDTO
  ) {
    return await this.propertyService.createProperty(
      createPropertyDTO,
      req.userId
    )
  }

  @Get()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async getProperties() {
    return await this.propertyService.findAll()
  }

  @Get('by-user/:userId')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async getPropertiesByUser(@Param('userId') userId: string) {
    return await this.propertyService.findByUser(userId)
  }
}
