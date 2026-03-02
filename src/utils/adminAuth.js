export const ADMIN_TOKEN_KEY = "lasglowtech_admin_token";
export const ADMIN_USER_KEY = "lasglowtech_admin_user";

export const saveAdminSession = ({ token, admin }) => {
  if (token) {
    localStorage.setItem(ADMIN_TOKEN_KEY, token);
  }
  if (admin) {
    localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(admin));
  }
};

export const getAdminToken = () => localStorage.getItem(ADMIN_TOKEN_KEY);

export const getAdminUser = () => {
  const raw = localStorage.getItem(ADMIN_USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (error) {
    return null;
  }
};

export const clearAdminSession = () => {
  localStorage.removeItem(ADMIN_TOKEN_KEY);
  localStorage.removeItem(ADMIN_USER_KEY);
};

export const isAdminAuthenticated = () => Boolean(getAdminToken());
