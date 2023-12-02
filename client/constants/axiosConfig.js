import axios from 'axios';
// import { store } from "../app/store";
// import { popError } from "../features/alert/alert.slice";
console.log(process.env.REACT_APP_API_URL);

// ! CURRENTLY HARD CODING THE BASE URL
const AxiosConfig = axios.create();
//     {
//   baseURL: 'https://localhost:3000' || process.env.REACT_APP_API_URL,
// }

// Where you would set stuff like your 'Authorization' header, etc ...
// AxiosConfig.defaults.headers.common["Authorization"] = "AUTH TOKEN FROM AxiosConfig";
AxiosConfig.defaults.headers.post['Content-Type'] = 'application/json';
// Also add/ configure interceptors && all the other cool stuff

AxiosConfig.interceptors.request.use(
  (request) => {
    console.log(request);
    if (!request.headers.Authorization) {
      const token = localStorage.getItem('accessToken');
      if (token) {
        request.headers.Authorization = `Bearer ${token}`;
      }
    }
    return request;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  },
);

AxiosConfig.interceptors.response.use(
  (response) => {
    console.log(response);
    // Edit response config
    return response;
  },
  async (error) => {
    console.log(error);
    // store.dispatch(popError({ title: error.message }));
    const originalConfig = error.config;
    if (error.response) {
      // Access Token was expired
      if (error.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          // const rs = await refreshToken();
          const rs = { data: { accessToken: 'Nothing' } };
          const { accessToken } = rs.data;
          window.localStorage.setItem('accessToken', accessToken);

          AxiosConfig.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
          return AxiosConfig(originalConfig);
        } catch (_error) {
          if (_error.response && _error.response.data) {
            return Promise.reject(_error.response.data);
          }
          return Promise.reject(_error);
        }
      }
      if (error.response.status === 403 && error.response.data) {
        return Promise.reject(error.response.data);
      }
    }

    return Promise.reject(error);
  },
);

export default AxiosConfig;
