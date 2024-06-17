import { Router } from "express";
import { addPost, deletePost, getPost, getPostById, updatePost } from "./post.controllers.js";

const postRouter=Router();
postRouter.get("/",getPost)
postRouter.post("/",addPost)
postRouter.put("/:id",updatePost)
postRouter.delete("/:id",deletePost)
postRouter.get("/:id",getPostById)


export default postRouter