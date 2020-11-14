import { Router, Request, Response } from "express";
import { Jwt } from "../utilities/Jwt";
import { PostController } from "../controllers/PostController";
export const postRoutes = Router();
postRoutes.use(new Jwt().validateToken);

const postController: PostController = new PostController();

postRoutes.put('/', (request: Request, response: Response) => {

    let files = request["files"];

    return postController.addPost(request.body, files, request["userId"]).then((res) => {
        response.send(res);
    }).catch((err) => {
        response.status(err.code ? err.code : 500).send(err);
    });
});


postRoutes.post('/my_post', (request: Request, response: Response) => {

    let params = request.body;
    return postController.getMyPosts(request["userId"], params.search, params.page, params.perPage).then((res) => {
        response.send(res);
    }).catch((err) => {
        response.status(err.code ? err.code : 500).send(err);
    });
});

postRoutes.delete('/:postId/remove', (request: Request, response: Response) => {

    const postId: number = parseInt(request.params.postId);
    return postController.deletePost(postId, request["userId"]).then((res) => {
        response.send(res);
    }).catch((err) => {
        response.status(err.code ? err.code : 500).send(err);
    });
});


