import axios, {AxiosInstance} from 'axios';
import cookie from 'react-cookies';
import {notification} from "antd";

class Provider {
  getInstance(): AxiosInstance {
    const instance = axios.create({
      baseURL: '/api',
      withCredentials: true,
      headers: {
        "X-CSRFToken": cookie.load('csrftoken')
      },
    });

    instance.interceptors.response.use(function (response) {
      return response;
    }, function (error) {
      if (error.response) {
        if (error.response.status >= 500 && error.response.status < 600) {
          notification.error({
            message: 'Internal Error',
            description: 'The server has met some problem.'
          })
        }
        return Promise.reject(error);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        // console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        // console.log('Error', error.message);
      }
      // console.log(error.config);
    });

    return instance;
  }
}

const provider = new Provider();

export default provider;