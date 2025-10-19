/**
 * @file app/errors/myError.js
 * @description 커스텀 myError 파일
 * 251007 v1.0 meerkat
 */

import { SYSTEM_ERROR } from '../../../configs/responseCodeConfig.js';

/**
 * type 별칭: ResponseCodeConfig
 * @typedef {import('../../../configs/responseCodeConfig.type').ResponseCodeConfig} ResponseCodeConfig
 */

/**
 * 
 * @param {string} msg - 에러메세지
 * @param {{[key: string]: ResponseCodeConfig}} codeInfo - 응답 코드 정보
 * @returns 
 */
export function myError(msg = '', codeInfo = SYSTEM_ERROR) {
  const err = new Error(msg);
  err.codeInfo = codeInfo;
  return err;
}