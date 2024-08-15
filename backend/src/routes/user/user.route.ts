import { Router } from "express";
import verifyToken from "../../middlewares/verifyAuth.middleware";
import { updateUser, deleteUser, getAllUsers } from "../../controllers/principle.controller";
const userRouter = Router();

userRouter.patch("/update", verifyToken, updateUser);
userRouter.delete("/delete", verifyToken, deleteUser);
userRouter.get("/all", verifyToken, getAllUsers);




export default userRouter;