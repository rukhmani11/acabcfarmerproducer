import { ProductDetailsModel } from "../models/ProductDetailsModel";
import { axiosRetryConfig, customAxios } from "./AxiosHttpCommon";

const initialFieldValues: ProductDetailsModel = {
    productId: "",
    productName: "",
    description: "",
    rate: 0,
    quantity: 0
};

const url = "api/ProductDetails";

function getAll() {
  return customAxios.get(`${url}/GetAll`, axiosRetryConfig);
}
function put(payload: ProductDetailsModel) {
  return customAxios.put(`${url}/Edit`, payload, axiosRetryConfig);
}

function getById(id: number) {
  return customAxios.get(`${url}/GetById/${id}`, axiosRetryConfig);
}
function getByIds(ids: number[]) {
  const idsString = ids.join(','); // join [1, 2] into "1,2"
  debugger;
 return customAxios.get(`${url}/GetByIds/${idsString}`, axiosRetryConfig);

}

export const ProductDetailsService = {
  initialFieldValues,
  getAll,
  getById,
  put,
  getByIds
};
