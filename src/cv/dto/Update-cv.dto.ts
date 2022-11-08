import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from "class-validator";

export class UpdateCvDto{

    @IsNotEmpty()
    @IsOptional()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsOptional()
    @IsString()
    firstname: string;

    @IsNotEmpty()
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(15)
    @Max(65)
    age: number;

    @IsNotEmpty()
    @IsOptional()
    @Type(() => Number) 
    @IsNumber()
    cin: number;

    @IsNotEmpty()
    @IsOptional()
    @IsString()
    job: string;

    @IsNotEmpty()
    @IsOptional()
    @IsString()
    path: string;

}