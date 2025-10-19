/**
 * @file app/middlewares/validations/validators/fields/userfield.js
 * @description User 유효성 검사 항목 정의 파일
 * 251019 v1.0 meerkat
 */

import { body } from 'express-validator';

export const email = body('email')
  .isEmail().withMessage('유효한 이메일을 입력해주세요.');

export const password = body('password')
  .matches(/^[a-zA-Z0-9!@#$]{5,20}$/)
  .withMessage('영문·숫자·!·@·#·$, 5~20자 허용');