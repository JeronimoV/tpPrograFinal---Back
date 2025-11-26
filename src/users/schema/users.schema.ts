import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Post } from "src/posts/schema/post.schema";

@Schema()
export class Users extends Document{
    @Prop({required: true})
    name: string
    @Prop({required: true})
    surname: string
    @Prop({required: true})
    password: string
    @Prop({required: true, unique: true})
    email: string
    @Prop({required: true, unique: true})
    userName: string
    @Prop({required: true})
    fechaNacimiento: Date
    @Prop({required: true})
    descripcion: string
    @Prop({required: true})
    image: string
    @Prop({type: Types.ObjectId, ref: "Post"})
    likes: Post[]
    @Prop({default: false})
    admin : boolean
    @Prop({default: true})
    userEnabled : boolean
}

export const UsersSchema = SchemaFactory.createForClass(Users);