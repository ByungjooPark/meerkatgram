function getAccessToken() {
  return localStorage.getItem('accessToken');
}

function setAccessToken(token) {
  localStorage.setItem('accessToken', token);
}

function clearLocalstorage() {
  localStorage.clear();
}

export const localstorageUtil = {
  getAccessToken,
  setAccessToken,
  clearLocalstorage,
}