import "server-only";
import axios from "axios";
import {
  exchangeAccessCodeForAuthTokens,
  exchangeNpssoForAccessCode,
} from "psn-api";

export const psnApi = axios.create({
  baseURL: "https://m.np.playstation.com/api/graphql/v1",
  headers: {
    "content-type": "application/json",
    "apollographql-client-name": "PlayStationApp-Android",
  },
});

psnApi.interceptors.request.use(
  async (config) => {
    // TODO store token in a cookie and check if it is expired and handle the type cast for process env
    const accessCode = await exchangeNpssoForAccessCode(process.env.NPSSO!);
    const auth = await exchangeAccessCodeForAuthTokens(accessCode);

    config.headers["Authorization"] = `Bearer ${auth.accessToken}`;

    return config;
  },
  (error) => Promise.reject(error),
);
