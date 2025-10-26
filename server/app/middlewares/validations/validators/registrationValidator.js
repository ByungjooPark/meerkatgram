/**
 * @file app/middlewares/validations/validators/registrationValidator.js
 * @description registration 유효성 검사 정의 파일
 * 251019 v1.0 meerkat
 */

import { email, nick, password, role, profile } from "../fields/userField.js";

export default [email, password, nick, role, profile];