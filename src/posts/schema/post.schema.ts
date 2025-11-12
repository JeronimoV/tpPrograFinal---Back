import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Users } from "src/users/schema/users.schema";

@Schema({timestamps: true})
export class Post extends Document{
    @Prop({type: Types.ObjectId, ref: "Users" , required: true})
    user: Users
    @Prop({required: true})
    text: string
    @Prop()
    images: string[]
    @Prop({default: 0})
    likes : number
    
}

export const PostSchema = SchemaFactory.createForClass(Post);