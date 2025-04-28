import { PaymentDetailsModel } from "../models/PaymentDetailsModel";
import { axiosRetryConfig, customAxios } from "./AxiosHttpCommon";

const initialFieldValues: PaymentDetailsModel = {
    PaymentId: "",
    PaymentAmount: "",
    Description: "",
};

const url = "api/PaymentDetails";

function getAll() {
  return customAxios.get(`${url}/GetAll`, axiosRetryConfig);
}
function Post(payload: PaymentDetailsModel) {
  return customAxios.post(`${url}/add`, payload, axiosRetryConfig);
}

function getById(id: number) {
  return customAxios.get(`${url}/GetById/${id}`, axiosRetryConfig);
}
export const PaymentDetailsService = {
  initialFieldValues,
  getAll,
  getById,
  Post,
};
