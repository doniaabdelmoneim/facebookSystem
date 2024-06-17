import { Router } from "express";
import { addComment, deleteComment, getComments, updateComment } from "./comment.controllers.js";

const commentRouter=Router();

commentRouter.get("/",getComments)
commentRouter.post("/",addComment)
commentRouter.put("/:id",updateComment)
commentRouter.delete("/:id",deleteComment)

export default commentRouter