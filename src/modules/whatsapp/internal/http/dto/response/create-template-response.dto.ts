import { Expose } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateTemplateResponseDTO {
    @IsString()
    @IsNotEmpty()
    @Expose()
    readonly sid: string;
}