const tokenValue: string = 'user_credentials';
export const setToken = (token: string) => {
  return localStorage.setItem(tokenValue, token);
};

export const getToken = () => {
  return localStorage.getItem(tokenValue);
};

export const removeToken = () => {
  return localStorage.removeItem(tokenValue);
};
