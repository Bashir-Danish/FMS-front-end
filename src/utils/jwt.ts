function isAuthenticated() {
  let isAuth = false;
  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split("=");
    if (name === "access_token") {
      isAuth = true;
      break;
    }
  }
  return isAuth;
}

export default isAuthenticated;
