import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';
export const CurrentUser = createParamDecorator(
  (_: never, context: ExecutionContext): Request & { userId?: string } => {
    const request = context.switchToHttp().getRequest<Request>();
    return request;
  },
);
