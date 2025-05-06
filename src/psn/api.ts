import "server-only"
import axios from "axios";
import { exchangeAccessCodeForAuthTokens, exchangeNpssoForAccessCode } from "psn-api";

const psnApi = axios.create({
    baseURL: "https://m.np.playstation.com/api/graphql/v1",
    headers: {
        "content-type": "application/json", 
        "apollographql-client-name": "PlayStationApp-Android",
    }
})

psnApi.interceptors.request.use(async config => {
    // TODO store token in a cookie and check if it is expired
    const accessCode = await exchangeNpssoForAccessCode(process.env.NPSSO!);
    const auth = await exchangeAccessCodeForAuthTokens(accessCode);

    config.headers["Authorization"] = `Bearer ${auth.accessToken}`;

    return config;
}, error => Promise.reject(error))

export const getSearchResults = (searchTerm: string) => psnApi.get(`/op?operationName=metGetContextSearchResults&variables={"searchTerm":"${searchTerm}","searchContext":"MobileUniversalSearchGame","displayTitleLocale":"en-US"}&extensions={"persistedQuery":{"version":1,"sha256Hash":"ac5fb2b82c4d086ca0d272fba34418ab327a7762dd2cd620e63f175bbc5aff10"}}`)
