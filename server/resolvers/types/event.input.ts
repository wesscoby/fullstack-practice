import { InputType, Field } from "type-graphql";
import { Length, IsNumber, IsDate } from "class-validator";


// Event Input Class
@InputType()
export class NewEventInput {
    @Field()
    @Length(20, 100, { message: "Title field must be at least 20 characters long" })
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