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
  
  // 시스템 에러와 DB 에러 시에만 로그 출력
  if(err.codeInfo.code === SYSTEM_ERROR.code || err.codeInfo.code === DB_ERROR.code) {
    logger.error(`${err.name}: ${err.message}\n${err.stack}`);
  }

  // 디버그 모드에서만 콘솔로 로그 출력
  if(process.env.APP_DEBUG_MODE === 'debug') {
    console.log(err.stack);
  }

  res.status(err.codeInfo.status).send(err.codeInfo);
}