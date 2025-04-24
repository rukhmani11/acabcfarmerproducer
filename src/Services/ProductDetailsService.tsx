import { ProductDetailsModel } from "../models/ProductDetailsModel";
import { axiosRetryConfig, customAxios } from "./AxiosHttpCommon";

const initialFieldValues: ProductDetailsModel = {
    productId: "",
    productName: "",
    description: "",
    rate: 0,
    quantity: 0
};

const url = "/ProductDetails";

function getAll() {
  return customAxios.get(`${url}/GetAll`, axiosRetryConfig);
}

export const ProductDetailsService = {
  initialFieldValues,
  getAll,
};
