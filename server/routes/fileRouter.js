/**
 * @file routes/fileRouter.js
 * @description file 관련 라우터
 * 251019 v1.0 meerkat
 */


import express from 'express';
import { fileController } from '../app/controllers/fileController.js';
import { multerMiddleware } from '../app/middlewares/multer/multerMiddleware.js';

const fileRouter = express.Router();

fileRouter.post('/profiles', multerMiddleware.profileUploder, fileController.storeProfile);
fileRouter.post('/posts', multerMiddleware.postUploder, fileController.storePosts);

export default fileRouter;