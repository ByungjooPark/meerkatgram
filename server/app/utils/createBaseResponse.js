/**
 * @file app/utils/createBaseResponse.js
 * @description 공통 응답 형식을 생성하는 유틸리티
 * 251019 v1.0 meerkat
 */

/**
 * 기본 응답 DTO를 생성
 * @param {import("../../configs/responseCodeConfig.type.js").ResponseCodeConfig} codeInfo - 결과 코드 정보
 * @param {null|[]|{}} data - 응답 데이터
 * @returns {import("../utils/createBaseResponse.type.js").CreateBaseResponse} 최종 응답 객체
 */
export function createBaseResponse(codeInfo, data = null) {
  const response = {
    code: codeInfo.code,
    message: codeInfo.msg
  };

  if(data) {
    response.data = data;
  }

  return response;
}