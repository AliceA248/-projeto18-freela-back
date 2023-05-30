import { Router } from "express";
import schemaValidation from "../middleware/schema.validation.js";
import { signUpValidate, signInValidate } from "../schemas/user.schemas.js";
import { signUp, signIn } from "../controllers/user.controllers.js";
import { userSignIn, userSignUp } from "../middleware/user.middleware.js";

const userRouter = Router();

userRouter.post("/signup", schemaValidation(signUpValidate), userSignUp, signUp);
userRouter.post("/signin", schemaValidation(signInValidate), userSignIn, signIn);

export default userRouter;
