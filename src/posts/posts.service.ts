import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Post } from './schema/post.schema';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { NotFoundError } from 'rxjs';
import { log } from 'console';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  async create(data: any) {
    try {
      if (data.text.trim() == '') {
        throw new BadRequestException('Faltan datos obligatorios');
      }

      const newPost = new this.postModel(data);
      const savedPost = await newPost.save();
      const populatedPost = savedPost.populate('user');
      return populatedPost;
    } catch (error) {
      console.log('Error ' + error);
      throw error;
    }
  }

  async get() {
    //Luego aplicar algoritmo para mezclar publicaciones de amigos y de desconocidos || Tambien modificar el tema de la paginacion
    try {
      const posts = await this.postModel
        .find()
        .populate('user')
        .sort({ createdAt: -1 })
        .limit(10)
        .exec();
      console.log(posts);

      let allPosts: any[] = [];
      let arrayAuxiliar: any[] = [];
      let contador = 0;
      if (posts.length > 3) {
        for (let i = 0; i < posts.length; i++) {
          arrayAuxiliar.push(posts[i]);
          contador++;
          if (contador > 1) {
            contador = 0;
            allPosts.push(arrayAuxiliar);
            arrayAuxiliar = [];
          }
        }
      } else {
        allPosts.push(posts);
      }

      return allPosts;
    } catch (error) {
      console.log('Error ' + error);
      throw error;
    }
  }

  async getUserPosts(userId: any) {
    try {
      const response = await this.postModel
        .find({ user: userId })
        .populate('user')
        .limit(3)
        .exec();

      console.log(response);

      return response;
    } catch (error) {
      console.log('Error ' + error);
      throw error;
    }
  }

  async incrementLike(data: any) {
    try {
      console.log(data.postId);

      const response = await this.postModel.updateOne(
        { _id: data.postId },
        { likes: data.likes + 1 },
      );
      console.log(response);
    } catch (error) {
      console.log('Error ' + error);
      throw error;
    }
  }

  async decrementLike(data: any) {
    try {
      const response = await this.postModel.updateOne(
        { _id: data.postId },
        { likes: data.likes - 1 },
      );
    } catch (error) {
      console.log('Error ' + error);
      throw error;
    }
  }

  async delete(data: any) {
    try {
      const response = await this.postModel.deleteOne({ _id: data });
      return response;
    } catch (error) {
      console.log('Error ' + error);
      throw error;
    }
  }

  async getPostsFromDate(data: any) {
    try {
        console.log(data);
        
      const response : Post[] = await this.postModel.find({
        createdAt: {
          $gte: new Date(data.inicio),
          $lte: new Date(data.final),
        },
      });
      

      if(response.length <= 0){
        throw new NotFoundException("Posts no encontrados");
      }

      let dataResponse = {};

      for(let i = 0; response.length > i; i++){
        console.log(response[i]);
        
        if(dataResponse[`${response[i].user}`] != undefined){
            dataResponse[`${response[i].user}`] = dataResponse[`${response[i].user}`] + 1;
        }else{
            dataResponse[`${response[i].user}`] = 1;
        }
      }

      

      return dataResponse;
    } catch (error) {
        console.log('Error ' + error);
      throw error;
    }
  }
}
