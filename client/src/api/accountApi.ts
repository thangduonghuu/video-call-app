import axios from 'axios';
import { SignInInput, SignUpInput } from 'constants/AccountType';

const API = 'http://localhost:4000';

export const accountApi = {
  signIn: (params: SignInInput) => {
    return axios
      .post(`${API}/sign-in`, {
        username: params.username,
        password: params.password,
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  signUp: (params: SignUpInput) => {
    return axios
      .post(`${API}/sign-up`, {
        username: params.username,
        password: params.password,
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};