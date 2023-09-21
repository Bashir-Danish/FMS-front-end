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

function deleteAccessTokenCookie() {
  document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

export { isAuthenticated, deleteAccessTokenCookie };
