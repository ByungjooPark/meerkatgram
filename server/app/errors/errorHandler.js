/**
 * @file app/errors/errorHeandler.js
 * @description errorHeandler 파일
 * 251019 v1.0 meerkat
 */

import { BaseError } from "sequelize";
import { DB_ERROR, SYSTEM_ERROR } from "../../configs/responseCodeConfig.js";
import { logger } from "../../configs/winstonConfig.js";

/**
 * 모든 에러는 `err.codeInfo`프로퍼티를 포함하고 있을 것 (없으면 시스템 에러로 처리)
 * `err.codeInfo`은 {import('../../../configs/responseCodeConfig.type').ResponseCodeConfig} 참조
 */
export default (err, req, res, next) => {
  // Sequelize 에러 처리
  if(err instanceof BaseError) {
    err.codeInfo = DB_ERROR;
  }
  
  // 커스텀 에러가 아닌 경우, 시스템 에러로 설정
  if(!err.codeInfo) {
    err.codeInfo = SYSTEM_ERROR;
  }
  
  logger.error(`${err.name}: ${err.message}\n${err.stack}`);

  res.status(err.codeInfo.status).send(err.codeInfo);
}