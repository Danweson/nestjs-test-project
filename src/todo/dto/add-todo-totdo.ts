import { IsIn, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class AddTodoDto{

    @IsString()
    @IsNotEmpty()
    @MinLength(6, {
       message:  "The Minimal size of name field is at least 6"
    })
    @MaxLength(25, {
        message:  "The Maximal size of name field is at top 25"
     })
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

}