import { Router } from "express";
import { registerUser, loginUser, logoutUser } from "../../controllers/auth.controller";
import verifyToken from "../../middlewares/verifyAuth.middleware";
const authRouter = Router();

authRouter.post("/register", verifyToken, registerUser)
authRouter.post("/login", loginUser);
authRouter.post("/logout",verifyToken, logoutUser);

export default authRouter;