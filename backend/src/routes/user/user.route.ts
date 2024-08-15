import { Router } from "express";
import verifyToken from "../../middlewares/verifyAuth.middleware";
import { updateUser, deleteUser, getAllUsers, getUserById } from "../../controllers/user.controller";
const userRouter = Router();

userRouter.patch("/update", verifyToken, updateUser);
userRouter.delete("/delete", verifyToken, deleteUser);
userRouter.get("/all", verifyToken, getAllUsers);
userRouter.get("/:userId", verifyToken, getUserById);


export default userRouter;