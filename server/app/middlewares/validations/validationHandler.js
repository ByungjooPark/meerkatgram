/**
 * @file app/middlewares/validations/validationHandler.js
 * @description 유효성 검사 핸들러 파일
 * 251019 v1.0 meerkat
 */

import { validationResult } from 'express-validator';
import { BAD_REQUEST_ERROR } from '../../../configs/responseCodeConfig.js';
import { createBaseResponse } from '../../utils/createBaseResponse.js';

export default function validationHandler(request, response, next) {
  const errors = validationResult(request);
  
  if (!errors.isEmpty()) {
    const errorCustom = errors.formatWith(error => `${error.path}: ${error.msg}`);
    return response.status(BAD_REQUEST_ERROR.status).send(createBaseResponse(BAD_REQUEST_ERROR, errorCustom.array()));
  }

  next();
}