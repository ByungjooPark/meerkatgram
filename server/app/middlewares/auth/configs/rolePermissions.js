/**
 * @file app/middlewares/auth/configs/rolePermissions.js
 * @description 라우터별 접근 권한 설정
 * 251019 v1.0 meerkat
 */

import Role from "./roleEnum.js"

const {FREE, PRO} = Role;

export const rolePermissions = {
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