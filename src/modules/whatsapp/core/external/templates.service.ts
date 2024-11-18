import { HttpClient } from "@src/shared/module/http-client/client/http.client";
import { TwilioHeaders } from "../../infra/twilio-decorators";

// Exemplo com credentials em headers
export class ExternalTemplatesService {
    constructor(private readonly httpClient: HttpClient) { }
    async submit(sid: string, headers: TwilioHeaders) {
        return await this.httpClient.post(`https://content.twilio.com/v1/Content/${sid}/ApprovalRequests/whatsapp`, null,
            {
                auth: {
                    username: headers.accountSid,
                    password: headers.authToken
                }
            }
        )
    }
}