import { getConnection, SelectQueryBuilder } from "typeorm";
import { Post } from "../entities/Post";
import { addPosFacadeValidator, findMyPosFacadeValidator, getPostByIdFacadeValidation, deletePostFacadeValidation } from "../schemas/PostSchema";
import { DataValidationException, SecurityException } from "../exceptions/Exeptions";
import { PaginationDTO } from "../utilities/PaginationDTO";


export class PostFacade {

    constructor() {

    }

    add(post: Post): Promise<any> {
        return new Promise((resolve: any, reject: any) => {
            try {

                const { value, error } = addPosFacadeValidator.validate(post);
                if (error) throw new DataValidationException(error.message);
                post = value;

                post.creationDate = new Date();
                getConnection().manager.save(post).then(() => {
                    resolve();
                }, (error) => {
                    reject(error);
                });

            } catch (error) {
                reject(error);
            }
        });
    }

    findMyPosts(userId: number, search: string, paginationParam: PaginationDTO): Promise<any> {
        return new Promise((resolve: any, reject: any) => {
            try {
                const { value, error } = findMyPosFacadeValidator.validate({ userId });
                if (error) throw new DataValidationException(error.message);

                let queryBuilder: SelectQueryBuilder<Post> = getConnection().createQueryBuilder()
                    .select("post")
                    .from(Post, "post")
                    .where("post.userId=:userId", { userId })
                    .orderBy("post.creationDate", "DESC");

                if (search) {
                    queryBuilder.andWhere("(post.title LIKE :search OR post.description LIKE :search)", { search: `%${search}%` })
                }

                  
                if (paginationParam && paginationParam.isValid) {
                    queryBuilder.limit(paginationParam.perPage)
                    queryBuilder.offset(paginationParam.offSet)
                }


                queryBuilder.getMany().then((responses: Post[]) => {
                    resolve(responses);
                }, (error) => {
                    reject(error);
                });

            } catch (error) {
                reject(error);
            }
        });
    }

    deletePost(postId: number, userId: number): Promise<any> {
        return new Promise(async (resolve: any, reject: any) => {
            try {
                const { value, error } = deletePostFacadeValidation.validate({ postId, userId });
                if (error) throw new DataValidationException(error.message);

                let savedPost = await this.getPostById(postId);
                if (!savedPost) throw new SecurityException();
                if (savedPost.userId != userId) throw new SecurityException("No Autorizado");

                getConnection().manager.deleteById(Post, postId).then(() => {
                    resolve();
                }, (error) => {
                    reject(error);
                });

            } catch (error) {
                reject(error);
            }
        });
    }

    getPostById(postId: number): Promise<Post> {
        return new Promise((resolve: any, reject: any) => {
            try {
                const { value, error } = getPostByIdFacadeValidation.validate({ postId });
                if (error) throw new DataValidationException(error.message);

                let post: Post = new Post();
                post.id = postId;

                getConnection().manager.findOne(Post, post).then((response: Post) => {
                    resolve(response);
                }, (error) => {
                    reject(error);
                });

            } catch (error) {
                reject(error);
            }
        });
    }

}