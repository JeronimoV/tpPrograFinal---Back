import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Comment } from './schema/comments.schema';
import { Model } from 'mongoose';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
  ) {}

  async create(data: any) {
    console.log(data);

    try {
      if (
        data.text.trim() == '' ||
        data.user.trim() == '' ||
        data.post.trim() == ''
      ) {
        throw new BadRequestException('Faltan datos obligatorios');
      }

      const newComment = new this.commentModel(data);
      const savedPost = await newComment.save();
      const populatedPost = savedPost.populate('user');
      return populatedPost;
    } catch (error) {
      console.log('Error ' + error);
      throw error;
    }
  }

  async get(postId: any, amount: number) {
    try {
      if (postId == null || amount == null) {
        throw new BadRequestException('Faltan datos obligatorios');
      }
      console.log('aca' + amount);

      const comments = await this.commentModel
        .find({ post: postId })
        .populate('user')
        .limit(3 * amount)
        .exec();
      return comments;
    } catch (error) {
      console.log('Error ' + error);
      throw error;
    }
  }

  async edit(data: any) {
    try {
      if (data.commentId.trim() == '') {
        throw new BadRequestException('Faltan datos obligatorios');
      }
      const comments = await this.commentModel
        .updateOne(
          { _id: data.commentId },
          { text: data.newText, edited: true },
        )
        .exec();

      return comments;
    } catch (error) {
      console.log('Error ' + error);
      throw error;
    }
  }

  async getCommentsFromDate(data: any) {
    try {
      console.log(data);

      const response: Comment[] = await this.commentModel.find({
        createdAt: {
          $gte: new Date(data.inicio),
          $lte: new Date(data.final),
        },
      });

      let dataResponse = {};

      for (let i = 0; response.length > i; i++) {
        let fecha = response[i]["createdAt"].toISOString().split("T")[0]

        if(dataResponse[`${fecha}`] == undefined){
          dataResponse[`${fecha}`] = 1
        }else{
          dataResponse[`${fecha}`] = dataResponse[`${fecha}`] + 1
        }
        
      }

      return dataResponse;
    } catch (error) {
      console.log('Error ' + error);
      throw error;
    }
  }

  async getCommentsFromPosts(data: any) {
    try {
      console.log(data);

      const response: Comment[] = await this.commentModel.find({
        createdAt: {
          $gte: new Date(data.inicio),
          $lte: new Date(data.final),
        },
      });

      let dataResponse = {};

      for (let i = 0; response.length > i; i++) {

        if(dataResponse[`${response[i].post}`] == undefined){
          dataResponse[`${response[i].post}`] = 1
        }else{
          dataResponse[`${response[i].post}`] = dataResponse[`${response[i].post}`] + 1
        }
        
      }

      return dataResponse;
    } catch (error) {
      console.log('Error ' + error);
      throw error;
    }
  }
}
