/**
 * @file app/middlewares/validations/validators/postValidator.js
 * @description post 유효성 검사 정의 파일
 * 251019 v1.0 meerkat
 */

import { title, content, image } from '../../fields/postField.js';
export default [title, content, image];