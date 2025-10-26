/**
 * @file routes/postRouter.js
 * @description 게시글 관련 라우터
 * 251019 v1.0 meerkat
 */

import express from 'express';
import { postController } from '../app/controllers/postController.js';
import postShowValidator from '../app/middlewares/validations/validators/posts/postShowValidator.js';
import postValidator from '../app/middlewares/validations/validators/posts/postValidator.js';
import validationHandler from '../app/middlewares/validations/validationHandler.js'
import postUpdateValidator from '../app/middlewares/validations/validators/posts/postUpdateValidator.js';

const postRouter = express.Router();

postRouter.get('/', postController.index);
postRouter.get('/:id', postShowValidator, validationHandler, postController.show);
postRouter.post('/', postValidator, validationHandler, postController.store);
postRouter.put('/:id', postUpdateValidator, validationHandler, postController.update);
postRouter.delete('/:id', postController.destroy);

export default postRouter;