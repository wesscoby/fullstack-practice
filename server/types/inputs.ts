import { InputType, Field } from "type-graphql";
import { Length, IsNotEmpty, IsEmail, IsNumber, IsDate } from "class-validator";


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

// Event Input Class
@InputType()
export class NewEventInput {
    @Field()
    @Length(10, 100, { message: "Title field must be at least 10 characters long" })
    title: string;
    
    @Field()
    @Length(30, 250, { message: "Title field must be at least 20 characters long" })
    description: string
    
    @Field()
    @IsNumber()
    price: number;
    
    @Field()
    @IsDate()
    date: Date;
}