import { Router } from 'express';
import * as postController from '../controllers/post';
import { checkAuth } from '../middleware/checkAuth'
import { checkRole } from '../middleware/checkRole';

const postRouter = Router();

postRouter.get('/:id', postController.getPost);
postRouter.get('/', postController.getPostList);

postRouter.use('/', checkAuth);
postRouter.use('/', checkRole);

postRouter.patch('/:id', postController.editPost);
postRouter.delete('/:id', postController.deletePost);
postRouter.post('/', postController.addPost);
postRouter.delete('/', postController.deletePostList)
export default postRouter;