import { Router } from "express";
import {
  addUser,
  deleteUser,
  getUserById,
  getUsers,
  loginUser,
  updateUser,
} from "./user.controllers.js";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/:id",getUserById);
userRouter.post("/signup",addUser);

userRouter.post("/login", loginUser);
userRouter.delete("/:id", deleteUser);
userRouter.put("/:id", updateUser);



export default userRouter;
