import { localstorageUtil } from "./localstorageUtil.js";


function chkIsLogind() {
  return localstorageUtil.getAccessToken() ? true : false;
}

export const authUtil = {
  chkIsLogind
}