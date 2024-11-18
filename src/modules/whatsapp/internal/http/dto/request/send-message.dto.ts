import { IsNotEmpty, IsString } from "class-validator";

export class SendMessageDTO {
    @IsString()
    @IsNotEmpty()
    readonly body: string;

    @IsString()
    @IsNotEmpty()
    readonly from: string;

    @IsString()
    @IsNotEmpty()
    readonly to: string;
}