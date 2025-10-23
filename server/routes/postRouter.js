/**
 * @file routes/postRouter.js
 * @description 게시글 관련 라우터
 * 251019 v1.0 meerkat
 */

import express from 'express';
import { postController } from '../app/controllers/postController.js';

const postRouter = express.Router();

postRouter.get('/', postController.index);

export default postRouter;