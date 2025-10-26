/**
 * @file routes/commentRouter.js
 * @description commentRouter
 * 251019 v1.0 meerkat
 */


import express from 'express';
import { commentController } from '../app/controllers/commentController.js';

const commentRouter = express.Router();

commentRouter.get('/', commentController.index);
commentRouter.get('/:commentId', commentController.show);
commentRouter.post('/', commentController.store);
commentRouter.put('/:commentId', commentController.update);
commentRouter.delete('/:commentId', commentController.destroy);

export default commentRouter;