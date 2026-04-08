import axios from 'axios';

const API_BASE_URL = 'http://192.168.181.215:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add detailed logging
api.interceptors.request.use(config => {
  console.log(` Request: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
  return config;
});

api.interceptors.response.use(
  response => {
    console.log(`✅ Response: ${response.status} from ${response.config.url}`);
    return response;
  },
  error => {
    console.log(` Error Details:`);
    console.log(`   Message: ${error.message}`);
    console.log(`   URL: ${error.config?.baseURL}${error.config?.url}`);
    console.log(`   Method: ${error.config?.method}`);
    if (error.code) console.log(`   Code: ${error.code}`);
    return Promise.reject(error);
  }
);

export default api;