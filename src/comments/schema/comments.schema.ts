import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Post } from "src/posts/schema/post.schema";
import { Users } from "src/users/schema/users.schema";

@Schema({timestamps: true})
export class Comment extends Document{
    @Prop({type: Types.ObjectId, ref: "Users" , required: true})
    user: Users
    @Prop({type: Types.ObjectId, ref: "Post" , required: true})
    post: Post
    @Prop({required: true})
    text: string
    @Prop({default: false})
    edited: boolean
}

export const CommentSchema = SchemaFactory.createForClass(Comment);