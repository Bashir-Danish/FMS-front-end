export const getToken = () => {
    let token = window.localStorage.getItem('tokenId');
    if (token == 'undefined') {
      token = ''
    }
  
    return token
  };
  export const saveToken = (token: string) => {
    window.localStorage.setItem('tokenId', token);
    
  };
  export const saveUser = (user :any )=> {
    window.localStorage.setItem('user', user);
  };
  export const destroyToken = () => {
    window.localStorage.removeItem('tokenId');
  };
  
  export default { getToken, saveToken, destroyToken ,saveUser };
  