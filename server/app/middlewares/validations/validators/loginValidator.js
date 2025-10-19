/**
 * @file app/middlewares/validations/validators/loginValidator.js
 * @description login 유효성 검사 정의 파일
 * 251019 v1.0 meerkat
 */

import { email, password } from './fields/userField.js';
export default [email, password];