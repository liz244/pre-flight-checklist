import axios from "axios";

const API_BASE_URL = "https://greenvelvet.alwaysdata.net/pfc/";
const API_TOKEN = "d5fa35ae8a987406ebe76d639f4fa0f040a85a47";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    token: API_TOKEN,
  },
});

export default api;
