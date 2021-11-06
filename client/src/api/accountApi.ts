import axios from "axios";
import { SignInInput, SignUpInput, AccountState } from "constants/AccountType";

const API = "http://localhost:4000";

export const accountApi = {
  signIn: (params: SignInInput) => {
    return axios
      .post(
        `${API}/login`,
        {
          username: params.username,
          password: params.password,
        },
        { withCredentials: true }
      )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  CheckLogin: () => {
    return axios
      .get(
        `${API}/login/CheckLogin`,
        { withCredentials: true }
      )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  signUp: (params: SignUpInput) => {
    return axios
      .post(
        `${API}/register`,
        {
          username: params.username,
          password: params.password,
        },
        { withCredentials: true }
      )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  UserInfo: (params: any) => {
    return axios
      .post(
        `${API}/user`,
        {
          owner: params.owner,
        },
        { withCredentials: true }
      )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
