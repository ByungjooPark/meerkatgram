/**
 * @file app/middlewares/auth/configs/rolePermissions.js
 * @description 라우터별 접근 권한 설정
 * 251019 v1.0 meerkat
 */

import Role from "./roleEnum.js"
const {FREE, PRO} = Role;

/**
 * 인증 및 인가가 필요한 path만 정의
 */
const rolePermissions = {
  GET: [
    { path: /^\/api\/posts$/, roles: [FREE, PRO] },
    { path: /^\/api\/follows\/following$/, roles: [FREE, PRO] }
  ],
  POST: [
    { path: /^\/api\/files\/images$/, roles: [FREE, PRO] },
    { path: /^\/api\/posts$/, roles: [FREE, PRO] },
    { path: /^\/api\/posts\/d+$/, roles: [FREE, PRO] }
  ],
  PUT: [
      // ...
  ],
  DELETE: [
      // ...
  ]
}
Object.freeze(rolePermissions);

export default rolePermissions;