// apiClient.ts
import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:3000",
  timeout: 15000,
});

export const lambdaClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_LAMBDA_URL,
  timeout: 15000,
});

// (opsiyonel) token header
const attachAuth = (client: typeof apiClient) => {
  client.interceptors.request.use((config) => {
    const token = null; // burayı kendi kaynağınla doldur
    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
};

attachAuth(apiClient);
