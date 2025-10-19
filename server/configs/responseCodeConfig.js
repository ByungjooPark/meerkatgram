/**
 * @file configs/responseCodeConfig.js
 * @description 서비스 전역 응답 코드 설정 모듈 , 각 API 응답 시 참조되는 표준 응답 코드 정의
 * 251019 v1.0 meerkat
 */

/**
 * type 별칭: ResponseCodeConfig
 * @typedef {import('../../../configs/responseCodeConfig.type').ResponseCodeConfig} ResponseCodeConfig
 */

/**
 * 정상 처리 응답 코드 설정
 * @type {{[key: string]: ResponseCodeConfig}}
 */
export const SUCCESS = {
  code: '00',
  msg: 'NORMAL_CODE',
  info: '정상 처리',
  status: 200
};

/**
 * 인증 에러 응답 코드 설정
 * @type {{[key: string]: ResponseCodeConfig}}
 */
export const NOT_REGISTERED_ERROR = {
  code: 'E01',
  msg: 'Not Registered Error',
  info: '아이디나 비밀번호가 틀렸습니다.',
  status: 401 // Unauthorized
};

/**
 * 인증 에러 응답 코드 설정
 * @type {{[key: string]: ResponseCodeConfig}}
 */
export const UNAUTHORIZED_ERROR = {
  code: 'E02',
  msg: 'Unauthorized Error',
  info: '로그인이 필요한 서비스입니다.',
  status: 401 // Unauthorized
};

/**
 * 전역 응답 코드 설정
 * @type {{[key: string]: ResponseCodeConfig}}
 */
export const FORBIDDEN_ERROR = {
  code: 'E03',
  msg: 'Forbidden Error',
  info: '권한이 부족하여 제공할 수 없는 서비스입니다.',
  status: 403
};

/**
 * 전역 응답 코드 설정
 * @type {{[key: string]: ResponseCodeConfig}}
 */
export const NOT_FOUND_ERROR = {
  code: 'E20',
  msg: 'Not Found Error',
  info: '제공되지 않는 서비스입니다.',
  status: 404
};

/**
 * 전역 응답 코드 설정
 * @type {{[key: string]: ResponseCodeConfig}}
 */
export const BAD_REQUEST_ERROR = {
  code: 'E21',
  msg: 'Bad Request Error',
  info: '요청 파라미터에 이상이 있습니다.',
  status: 400
};

/**
 * DB 에러 응답 코드 설정
 * @type {{[key: string]: ResponseCodeConfig}}
 */
export const DB_ERROR = {
  code: 'E80',
  msg: 'DB Error',
  info: '서비스 제공 상태가 원활하지 않습니다',
  status: 500
};

/**
 * 시스템 에러 응답 코드 설정
 * @type {{[key: string]: ResponseCodeConfig}}
 */
export const SYSTEM_ERROR = {
  code: 'E99',
  msg: 'Application Error',
  info: '서비스 제공 상태가 원활하지 않습니다',
  status: 500
};