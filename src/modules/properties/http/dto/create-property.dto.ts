import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreatePropertyDTO {
    @IsString()
    @IsNotEmpty()
    readonly address: string

    @IsNumber()
    @IsNotEmpty()
    readonly price: number

    @IsString()
    @IsNotEmpty()
    readonly location: string

}