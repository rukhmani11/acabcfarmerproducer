import { Homemodel } from "../models/Homemodel";


const initialFieldValues: Homemodel = {
    Bank: "",
    // Abrv: "",
    Active: true,
    BankId: ""
};
const url = '/api/Banks';

// function getAll() {

//   return customAxios.get(`${url}/GetAll`, axiosRetryConfig);
// }
// function post(payload: BankModel) {
//   return customAxios.post(`${url}/Add`, payload, axiosRetryConfig);
// }

// function put(payload: BankModel) {
//   return customAxios.put(`${url}/Edit`, payload, axiosRetryConfig);
// }

// function remove(id: number) {
//   return customAxios.delete(`${url}/${id}`, axiosRetryConfig);
// }

// function getById(id: number) {
//   return customAxios.get(`${url}/GetById/${id}`, axiosRetryConfig);
// }

// function getSelectList() {
//   return customAxios.get(`${url}/GetSelectList`, axiosRetryConfig);
//}
export const homeService = {
  initialFieldValues,
//   getAll,
//   post,
//   put,
//   remove,
//   getById,
//   getSelectList,
};