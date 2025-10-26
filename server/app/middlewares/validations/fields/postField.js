/**
 * @file app/middlewares/validations/validators/fields/postField.js
 * @description post 유효성 검사 항목 정의 파일
 * 251019 v1.0 meerkat
 */

import fs from 'fs';
import path from 'path';
import { body, param } from 'express-validator';
import { pathUtil } from '../../../utils/pathUtil.js';

export const id = param('id')
  .notEmpty()
  .withMessage('게시글 번호는 필수 항목입니다.')
  .bail()
  .matches(/^[0-9]+$/)
  .withMessage('허용하지 않는 게시글 번호 경로입니다.');

export const title = body('title')
  .notEmpty()
  .withMessage('제목은 필수 항목입니다.');

export const content = body('content')
  .notEmpty()
  .withMessage('내용은 필수 항목입니다.');

export const image = body('image')
  .notEmpty()
  .withMessage('이미지는 필수 항목입니다.')
  .bail()
  .custom(val => {
    if(!val.startsWith(`${process.env.APP_URL}${process.env.STORAGE_POST_IMAGE_PATH}`)) {
      return false;
    }

    return true;
  })
  .withMessage('허용하지 않는 이미지 경로입니다.')
  .bail()
  .custom(val => {
    const splitPath = val.split('/');
    const fullPath = path.join(pathUtil.getStoragePostDirPath(), splitPath[splitPath.length - 1]);

    if(!fs.existsSync(fullPath)) {
      return false;
    }

    return true;
  })
  .withMessage('존재하지 않는 이미지 경로입니다.');