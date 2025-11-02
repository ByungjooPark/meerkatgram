/**
 * @file app/utils/jwtUtils.js
 * @description jwt 유틸리티
 * 251019 v1.0 meerkat
 */

import dayjs from "dayjs";

export const cookieUtils = {
  setCookieRefreshToken,
  getCookieRefreshToken,
}

// ---------------------
// ------ public -------
// ---------------------
/**
 * 리프래시 토큰 쿠키에 셋팅
 * @param {Response} response 
 * @param {string} refreshToken 
 */
function setCookieRefreshToken(response, refreshToken) {
  setCookie(
    response,
    process.env.JWT_REFRESH_TOKEN_COOKIE_NAME,
    refreshToken,
    parseInt(process.env.JWT_REFRESH_TOKEN_COOKIE_EXPIRY),
    true,
    true
  );
}

/**
 * 리프래시 토큰 쿠키 획득
 * @param {Request} request 
 * @returns 
 */
function getCookieRefreshToken(request) {
  return getCookie(request, process.env.JWT_REFRESH_TOKEN_COOKIE_NAME);
}

// ---------------------
// ------ Private -------
// ---------------------
/**
 * 
 * @param {Response} response 
 * @param {string} cookieName 
 * @param {string} cookieValue 
 * @param {number} ttl 
 * @param {boolean} httpOnlyFlg 
 * @param {boolean} secureFlg
 */
function setCookie(response, cookieName, cookieValue, ttl, httpOnlyFlg = true, secureFlg = false) {
  response.cookie(
    cookieName,
    cookieValue,
    {
      expires: dayjs().add(ttl, 'millisecond').toDate(),
      httpOnly: httpOnlyFlg,
      // secure: process.env.APP_MODE !== 'dev',
      secure: secureFlg,
      sameSite: 'None',
    }
  );
}
/**
 * 
 * @param {Request} request 
 * @param {string} cookieName 
 * @returns {string|''} tokenValue
 */
function getCookie(request, cookieName) {
    let cookieValue = '';
    
    if(request.cookies) {
        cookieValue = request.cookies[cookieName];
    }

    return cookieValue;
}