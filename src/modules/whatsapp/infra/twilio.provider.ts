import { Provider, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Twilio } from 'twilio';

export const TwilioProvider: Provider = {
    provide: Twilio,
    scope: Scope.REQUEST,
    inject: [REQUEST],
    useFactory: (request: Request) => {
        const accountSid = request.headers['twilio-account-sid'] as string;
        const authToken = request.headers['twilio-auth-token'] as string;
        if (!accountSid || !authToken) {
            throw new Error('Twilio credentials not found in request headers');
        }
        return new Twilio(accountSid, authToken);
    },
};