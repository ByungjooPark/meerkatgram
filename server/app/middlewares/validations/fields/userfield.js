/**
 * @file app/middlewares/validations/validators/fields/userfield.js
 * @description User 유효성 검사 항목 정의 파일
 * 251019 v1.0 meerkat
 */

import fs from 'fs';
import path from 'path';
import { body } from 'express-validator';
import Role from '../../auth/configs/roleEnum.js'
import { pathUtil } from '../../../utils/pathUtil.js';

export const email = body('email')
  .notEmpty()
  .withMessage('이메일은 필수 항목입니다.')
  .bail()
  .isEmail().withMessage('유효한 이메일을 입력해주세요.');

export const password = body('password')
  .notEmpty()
  .withMessage('비밀번호는 필수 항목입니다.')
  .bail()
  .matches(/^[a-zA-Z0-9!@#$]{5,20}$/)
  .withMessage('영어대소문자·숫자·!·@·#·$, 5~20자 허용');

export const nick = body('nick')
  .notEmpty()
  .withMessage('닉네임은 필수 항목입니다.')
  .bail()
  .matches(/^[a-zA-Z가-힣0-9_-]+$/u)
  .withMessage('한글·영어대소문자·숫자·_·- 만 허용');

export const role = body('role')
  .notEmpty()
  .withMessage('권한은 필수 항목입니다.')
  .bail()
  .custom(val => val in Role)
  .withMessage('유효한 권한이 아닙니다.');

export const profile = body('profile')
  .notEmpty()
  .withMessage('프로필은 필수 항목입니다.')
  .bail()
  .custom(val => {
    
    if(!val.startsWith(`${process.env.APP_URL}${process.env.STORAGE_USER_PROFILE_PATH}`)) {
      return false;
    }

    return true;
  })
  .withMessage('허용하지 않는 프로필 경로입니다.')
  .bail()
  .custom(val => {
    const splitPath = val.split('/');
    const fullPath = path.join(pathUtil.getStorageProfileDirPath(), splitPath[splitPath.length - 1]);

    if(!fs.existsSync(fullPath)) {
      return false;
    }

    return true;
  })
  .withMessage('존재하지 않는 프로필 경로입니다.');