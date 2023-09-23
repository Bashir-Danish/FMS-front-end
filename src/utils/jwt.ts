

export const isAuth = () => {
  const token = window.localStorage.getItem("tokenId");

  if (token && token !== "undefined") {
    return true; 
  } else {
    return false; 
  }
};

export const getToken = () => {
  let token = window.localStorage.getItem("tokenId");
  if (token == "undefined") {
    token = "";
  }
  return token;
};

export const saveToken = (token: string) => {
  window.localStorage.setItem('tokenId', token);

};
export const destroyToken = () => {
  window.localStorage.removeItem('tokenId');
};

export default { getToken, saveToken, destroyToken };
