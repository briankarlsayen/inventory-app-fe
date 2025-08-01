import axios from "axios";

const timeoutMs = 30000;

export const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/inventory/",
  timeout: timeoutMs,
});
