import { addPostControllerValidator, findMyPosFacadeValidator } from "../schemas/PostSchema";
import { DataValidationException } from "../exceptions/Exeptions";
import { PostFacade } from "../facade/PostFacade";
import { Post } from "../entities/Post";
import { AmazonS3 } from "../utilities/aws/AmazonS3";
import { PaginationDTO } from "../utilities/PaginationDTO";
export class PostController {

    private postFacade: PostFacade;
    private s3: AmazonS3;

    constructor() {
        this.postFacade = new PostFacade();
        this.s3 = new AmazonS3();
    }

    async addPost(body: any, files: any[], userId: number) {
        try {
            const { value, error } = addPostControllerValidator.validate(Object.assign(body, { files, userId }));
            if (error) throw new DataValidationException(error.message);

            let post: Post = new Post();
            post.title = value.title;
            post.description = value.description;
            post.userId = userId;

            let file = await this.s3.uploadFile(files[0]);
            post.image = file.Location;

            return this.postFacade.add(post);
        } catch (error) {
            return Promise.reject(error);
        }
    }


    async getMyPosts(userId: number, search: string, page: number, perPage: number) {
        try {

            let paginationParam: PaginationDTO = new PaginationDTO(page, perPage);
            return this.postFacade.findMyPosts(userId, search, paginationParam);
        } catch (error) {
            return Promise.reject(error);
        }
    }


    async deletePost(postId: number, userId: number) {
        try {
            return this.postFacade.deletePost(postId, userId);
        } catch (error) {
            return Promise.reject(error);
        }
    }
}