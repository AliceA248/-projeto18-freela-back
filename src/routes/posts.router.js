import { Router } from 'express';
import multer from 'multer';
import { authValidation } from '../middleware/auth.middleware.js';
import { addPost, getUserPostsById } from '../controllers/posts.controllers.js';
import { schema } from '../schemas/post.schemas.js';
import validationSchema from '../middleware/schema.validation.js';

const postRouter = Router();
const upload = multer();

postRouter.post('/create-post', upload.single('photo'), authValidation, validationSchema(), addPost);
postRouter.get('/get-user-posts/:id', getUserPostsById);

export default postRouter;
