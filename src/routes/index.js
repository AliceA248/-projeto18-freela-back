import { Router } from "express";

import userRouter from "./users.router.js";
import postRouter from "./posts.router.js";

const router = Router();

router.use(userRouter);
router.use(postRouter);


export default router;