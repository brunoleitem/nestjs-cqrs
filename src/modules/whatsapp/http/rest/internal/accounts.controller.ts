import { Controller, Get, UseGuards, HttpCode, HttpStatus, Param, Query, Post, Body } from "@nestjs/common";
import { AuthGuard } from "@src/shared/http/guards/auth-guard";
import { InternalAccountsService } from "../../../core/internal/internal.accounts.service";
import { CreateAccountDTO } from "../../dto/request/create-account.dto";
import { SendMessageDTO } from "../../dto/request/send-message.dto";
import { GetAccountDTO } from "../../dto/response/get-accounts.dto";

@Controller("whatsapp/internal/accounts")

export class InternalAccountsController {
    constructor(private readonly accountService: InternalAccountsService) { }

    @Get()
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.OK)
    async getAccounts(@Query("accountName") accountName?: string): Promise<GetAccountDTO[] | GetAccountDTO> {
        return await this.accountService.getAccount(accountName);
    }

    @Post("accounts/create")
    @UseGuards(AuthGuard)
    @HttpCode(HttpStatus.CREATED)
    async createSubAccount(@Body() createAccountDTO: CreateAccountDTO) {
        return await this.accountService.createSubAccount(createAccountDTO);
    }
}