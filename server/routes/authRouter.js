/**
 * @file routes/authRouter.js
 * @description 인증 관련 라우터
 * 251019 v1.0 meerkat
 */


import express from 'express';
import loginValidator from '../app/middlewares/validations/validators/loginValidator.js';
import validationHandler from '../app/middlewares/validations/validationHandler.js';
import { authController } from '../app/controllers/authController.js';

const authRouter = express.Router();

authRouter.post('/login', loginValidator, validationHandler, authController.login);
// authRouter.post('/reissue', authController.reissueAccessToken);

export default authRouter;