import { type ExecutionContext, createParamDecorator } from '@nestjs/common'
import type { Request } from 'express'

export interface TwilioHeaders {
  accountSid: string
  authToken: string
}

export const TwilioHeaders = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): TwilioHeaders => {
    const request = ctx.switchToHttp().getRequest<Request>()
    const accountSid = request.headers['twilio-account-sid'] as string
    const authToken = request.headers['twilio-auth-token'] as string
    return { accountSid, authToken }
  }
)
