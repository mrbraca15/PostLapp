import { Router, Request, Response } from "express";
import { UserService } from "../controllers/UserServices";

export const userRoutes = Router();

const userService: UserService = new UserService();

userRoutes.post('/signUp', (request: Request, response: Response) => {
    userService.signUp(request, response);
});

userRoutes.post('/signIn', (request: Request, response: Response) => {
    userService.signIn(request, response);
});

