import { ShopDetailsModel } from "../models/ShopDetailsModel";
import { axiosRetryConfig, customAxios } from "./AxiosHttpCommon";

const initialFieldValues: ShopDetailsModel = {
  shopNo: "",
  shopName: "",
  village: "",
  typeOfCard: "",
  city: "",
};

const url = "/ShopDetails";

function getAll() {
  return customAxios.get(`${url}/GetAll`, axiosRetryConfig);
}
function getShopdetailsByshopNo(getByshopNo: number) {
  return customAxios.get(`${url}/GetShopdetailsByshopNo/${getByshopNo}`, axiosRetryConfig);
}

export const ShopDetailsService = {
  initialFieldValues,
  getAll,
  getShopdetailsByshopNo
};
