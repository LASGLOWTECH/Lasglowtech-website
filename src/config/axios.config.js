

// import axios from "axios";
// const isLocalhost = Boolean(
//     window.location.hostname === "localhost" ||
//     // [::1] is the IPv6 localhost address.
//     window.location.hostname === "[::1]" ||
//     // 127.0.0.1/8 is considered localhost for IPv4.
//     window.location.hostname.match(
//         /^127\.(?:\d{1,3}\.){2}\d{1,3}$/
//     )
// );
// const API_URL = isLocalhost
//     ? "http://localhost:5000"
//     : "https://lasglowserver.phoenixstech.com";
// // const API_URL = "http://localhost:5000";

// const instance = axios.create({
//     withCredentials: true,
//     baseURL: API_URL
// });

// export default instance;

import axios from "axios";

const isLocalhost =
  window.location.hostname === "localhost" ||
  window.location.hostname === "[::1]" ||
  /^127\.(?:\d{1,3}\.){2}\d{1,3}$/.test(window.location.hostname);

// Production: set VITE_API_URL when building (e.g. https://api.lasglowtech.com.ng).
// If missing at build time, fall back to same origin so the app still loads (API may need proxy).
const envApiUrl = import.meta.env.VITE_API_URL;
export const API_BASE_URL =
  (typeof envApiUrl === "string" && envApiUrl.trim() !== "" ? envApiUrl.trim() : null) ||
  (isLocalhost ? "http://localhost:5000" : window.location.origin);

if (!isLocalhost && !envApiUrl) {
  console.warn(
    "[Lasglowtech] VITE_API_URL was not set at build time. API requests use:",
    API_BASE_URL
  );
}

const instance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: false,
});

export default instance;
