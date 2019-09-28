import { InputType, Field } from "type-graphql";
import { Length, IsNotEmpty, IsEmail } from "class-validator";


//* Register User Input
@InputType()
export class NewUserInput {
    @Field()
    @Length(2, 50, { message: "First name field must be between 2 and 50 chars long" })
    @IsNotEmpty({ message: "First name field must NOT be empty"})
    firstName: string;

    @Field()
    @Length(2, 50, { message: "Last name field must be between 2 and 50 chars long" })
    @IsNotEmpty({ message: "Last name field must NOT be empty"})
    lastName: string;

    @Field()
    @IsEmail()
    email: string;
    
    @Field()
    @IsNotEmpty({ message: "First name field must NOT be empty"})
    password: string;
}

//* User Login Input
@InputType()
export class LoginInput {
    @Field()
    email: string;

    @Field()
    password: string;
}