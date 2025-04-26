import { ShopDetailsModel } from "../models/ShopDetailsModel";
import { axiosRetryConfig, customAxios } from "./AxiosHttpCommon";

const initialFieldValues: ShopDetailsModel = {
  shopNo: "",
  shopName: "",
  village: "",
  typeOfCard: "",
  city: "",
};

const url = "api/ShopDetails";

function getAll() {
  return customAxios.get(`${url}/GetAll`, axiosRetryConfig);
}
function getShopdetailsByshopNo(ShopNo: number) {
  
  return customAxios.get(`${url}/GetShopdetailsByshopNo/${ShopNo}`, axiosRetryConfig);
}

export const ShopDetailsService = {
  initialFieldValues,
  getAll,
  getShopdetailsByshopNo
};
