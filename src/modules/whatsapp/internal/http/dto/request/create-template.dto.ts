import { IsNotEmpty, IsObject, IsString } from "class-validator";

export class CreateTemplateDTO {
    @IsObject()
    @IsNotEmpty()
    readonly template: { [type: string]: any };

    @IsString()
    @IsNotEmpty()
    readonly friendlyName: string;

    @IsObject()
    @IsNotEmpty()
    readonly variables: { [key: string]: string };
}