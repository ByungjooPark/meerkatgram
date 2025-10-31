function getAccessToken() {
  return localStorage.getItem('accessToken');
}

function setAccessToken(token) {
  localStorage.setItem('accessToken', token);
}

export const localstorageUtil = {
  getAccessToken,
  setAccessToken,
}