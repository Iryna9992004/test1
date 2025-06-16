import { IsEmail, IsString } from "class-validator";

export class JwtPayload {
    @IsEmail()
    email!: string;

    @IsString()
    name!: string;
}