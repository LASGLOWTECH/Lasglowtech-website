export const AUTH_TOKEN_KEY = "lasglowtech_auth_token";
export const AUTH_USER_KEY = "lasglowtech_auth_user";

export const saveSession = ({ token, user }) => {
  if (token) {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  }
  if (user) {
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  }
};

export const getToken = () => localStorage.getItem(AUTH_TOKEN_KEY);

export const getUser = () => {
  const raw = localStorage.getItem(AUTH_USER_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch (error) {
    return null;
  }
};

export const getUserRole = () => {
  const user = getUser();
  return user?.role || "client";
};

export const getRoleHomePath = (role) => {
  if (role === "client") return "/client/dashboard";
  if (role === "learner" || role === "student" || role === "talent") return "/careers/dashboard";
  return "/client/dashboard";
};

export const clearSession = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
};

export const isAuthenticated = () => Boolean(getToken());
