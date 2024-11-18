import { Injectable } from "@nestjs/common";
import { TwilioClient } from "../../infra/twilio.client";
import { TwilioText, Types } from "twilio/lib/rest/content/v1/content";
import { CreateTemplateDTO } from "../../http/dto/request/create-template.dto";

@Injectable()
export class InternalTemplateService {
    constructor(private readonly client: TwilioClient) { }

    async listTemplates() {
        return await this.client.listTemplates();
    }

    async createTemplate(body: CreateTemplateDTO) {
        const createdTemplate = await this.client.createTemplate(body.template, body.friendlyName, body.variables);
        return {
            sid: createdTemplate.sid,
        }
    }

    async deleteTemplate(sid: string) {
        return await this.client.deleteTemplate(sid)
    }
}