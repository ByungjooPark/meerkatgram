/**
 * @file routes/userRouter.js
 * @description 유저 관련 라우터
 * 251019 v1.0 meerkat
 */

import express from 'express';
import { userConstroller } from '../app/controllers/userController.js';
import registrationValidator from '../app/middlewares/validations/validators/registrationValidator.js';
import validationHandler from '../app/middlewares/validations/validationHandler.js';

const userRouter = express.Router();

userRouter.post('/', registrationValidator, validationHandler, userConstroller.store);

export default userRouter;