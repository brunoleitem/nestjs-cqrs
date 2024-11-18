import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UseGuards
} from '@nestjs/common'
import { AuthGuard } from '@src/shared/http/guards/auth-guard'
import { AccountsService } from '../../core/accounts.service'
import { CreateAccountDTO } from '../dto/request/create-account.dto'
import { GetAccountDTO } from '../dto/response/get-accounts.dto'

@Controller('whatsapp/internal/accounts')
export class AccountsController {
  constructor(private readonly accountService: AccountsService) {}

  @Get()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async getAccounts(
    @Query('accountName') accountName?: string
  ): Promise<GetAccountDTO[] | GetAccountDTO> {
    return await this.accountService.getAccount(accountName)
  }

  @Post('accounts/create')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async createSubAccount(@Body() createAccountDTO: CreateAccountDTO) {
    return await this.accountService.createSubAccount(createAccountDTO)
  }
}
