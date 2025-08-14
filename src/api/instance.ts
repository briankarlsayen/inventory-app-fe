import axios from "axios";

const timeoutMs = 30000;

export const baseURL = "http://127.0.0.1:8000/api/inventory/";

export const instance = axios.create({
  baseURL,
  timeout: timeoutMs,
});

let isRefreshing = false;
let failedQueue = [];
const refreshToken = localStorage.getItem("refresh") ?? null;

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 and not already retrying
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Queue requests until token refresh finishes
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = "Bearer " + token;
            return instance(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const res = await axios.post(baseURL + "auth/refresh/", {
          refresh: refreshToken,
        });
        let accessToken = res.data.access; // store new access
        localStorage.setItem("access", res.data.access);
        processQueue(null, accessToken);
        originalRequest.headers["Authorization"] = "Bearer " + accessToken;

        return instance(originalRequest);
      } catch (err) {
        processQueue(err, null);
        // Refresh failed → redirect to login
        window.location.href = "/login";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
