import React from 'react'
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import { SelectListModel } from '../models/ApiResponse';

///////////////Toast Notifications/////////////////////

//https://fkhadra.github.io/react-toastify/introduction/
const success = (msg: string) => toast.success(msg, {
  position: "top-left",
  theme: "colored",
});

function error(msg: string) {
  return toast.error(msg, {
    position: "top-left",
    theme: "colored",
  });
}

function warning(msg: string) {
  return toast.warning(msg, {
    position: "top-left",
    theme: "colored",
  });
}

function info(msg: string) {
  return toast.info(msg, {
    position: "top-left",
    theme: "colored",
  });
}
///////////////Ends Toast Notifications/////////////////////


function getDocTypeMenuText(docType: string) {
  switch (docType) {
    case 'OP':
      return 'Opening Balance';
    case 'CP':
      return 'Cash Payment';
    case 'CR':
      return 'Cash Receipt';
    case 'BP':
      return 'Bank Payment';

    default:
      return '';
  }
}

function convertLocalToUTCDate(date: Date) {
  if (!date) {
    return date
  }

  //date = new Date(date);
  // var now = new Date();
  // var utc = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
  date = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0));
  //date.setUTCHours(0);
  return date;
}

function getISODateOnly(date: Date) {
  let dateOnly = null;
  if (date)
    dateOnly = date.toISOString().split('T')[0];
  return dateOnly;
}

function getISODateOnlyForDatePicker(date: Date) {
  let dateOnly = null;
  if (date)
    dateOnly = getISODateOnly(convertLocalToUTCDate(date));
  return dateOnly;
}

function validateEmail(email: string) {

  let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
  return regex.test(email);
}

function getBoqUploadNatures() {
  const result = [
    { value: 'Package', label: 'Package' },
    { value: 'DontProcess', label: 'DontProcess' },
    { value: 'Information', label: 'Information' },
  ];
  return result;
}

const addMonths = (date: Date, months: number) => {
  date.setMonth(date.getMonth() + months);
  return date;
}

function convertJsonToBlob(obj: any) {
  const str = JSON.stringify(obj);
  const bytes = new TextEncoder().encode(str);
  const blob = new Blob([bytes], {
    type: "application/json;charset=utf-8"
  });
  return blob;
}

function convertJsonToBlobExcel(obj: any) {
  const str = JSON.stringify(obj);
  const bytes = new TextEncoder().encode(str);
  const blob = new Blob([bytes], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  });
  return blob;
}


const formatDateTime = (value: any) => {
  try {
    return value ? dayjs(value).format("DD-MMM-YYYY hh:mm A") : "";
  }
  catch (e: any) {
    console.log(e);
    return "";
  }
}

// const mapToMultiSelectList = (list: SelectListModel[]) => {
//   const options = list.map(({ Text, Value }) => ({
//     label: Text,
//     value: Value,
//   }));
//   return options;
// }

// const isFormValid = (errors: any): boolean => {
//   const checkValues = (obj: any): boolean =>
//     Object.values(obj).every(
//       (x) => (typeof x === 'string' && x === '') || (typeof x === 'object' && checkValues(x))
//     );

//   return checkValues(errors);
// };


export const globalService = {
  success,
  error,
  info,
  warning,
  formatDateTime,
  convertLocalToUTCDate,
  getBoqUploadNatures,
  validateEmail,
  getDocTypeMenuText,
  addMonths,
  convertJsonToBlobExcel,

  getISODateOnly,
  getISODateOnlyForDatePicker
};