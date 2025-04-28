import { LoginModel } from "../models/LoginModel";
import { PaymentDetailsModel } from "../models/PaymentDetailsModel";
import { axiosRetryConfig, customAxios } from "./AxiosHttpCommon";

const initialFieldValues: LoginModel = {
    UserId: "",
    Username: "",
    Password: ""
};

const url = "api/User";
// kccfunction user(payload: LoginModel) {
//   debugger
//   return customAxios.post(`${url}/User`, payload, axiosRetryConfig);
// }

function UserGet(username: string ,password: string) {
  return customAxios.get(`${url}/UserGet/${username}/${password}`, axiosRetryConfig);
}

function getAll() {
  return customAxios.get(`${url}/GetAll`, axiosRetryConfig);
}
export const LoginService = {
  initialFieldValues,
  UserGet,
  getAll,
};
