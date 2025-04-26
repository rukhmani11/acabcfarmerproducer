import { YojanaDetailsModel } from "../models/YojanaDetailsModel";
import { axiosRetryConfig, customAxios } from "./AxiosHttpCommon";

const initialFieldValues: YojanaDetailsModel = {
  eChallan: "",
  yojanaName: "",
  financialYear: new Date(),
  shopNo: new Date(),
};

const url = "api/YojanaDetails";

function getAll() {
  return customAxios.get(`${url}/GetAll`, axiosRetryConfig);
}
function getYojanaDetailsListSelectList() {
  return customAxios.get(`${url}/GetSelectList`, axiosRetryConfig);
}

export const YojanaDetailsService = {
  initialFieldValues,
  getYojanaDetailsListSelectList,
  getAll,
};
// List<SelectListDTO> GetMBoqtitleSelectListByPackageId(Guid packageId);
//  public List<SelectListDTO> GetMBoqtitleSelectListByPackageId(Guid packageId)
//  {
//      var result = _dbContext.MBoqtitles.Where(x => x.BoqpackageId == packageId).Select(x => new SelectListDTO()
//      {
//          Value = x.BoqtitleId.ToString().ToLower(),
//          Text = x.BoqtitleName
//      }).OrderBy(x => x.Text).ToList();
//      return result;
//  }

//     [Route("GetSelectListByPackageId/{packageId}")]
//     [HttpGet]
//     public IActionResult GetSelectListByPackageId(Guid packageId)
//     {
//         List<SelectListDTO> res = _mBoqtitlesService.GetMBoqtitleSelectListByPackageId(packageId);
//         return Ok(res);
//     }

// using Newtonsoft.Json;
// using Newtonsoft.Json.Linq;
// using System.Net.Mail;
// using System.Runtime.Serialization;
// using static System.Runtime.InteropServices.JavaScript.JSType;

// namespace ANJDPMAPI.Models.DTOs
// {
//     [DataContract]
//     public class FailureModel
//     {

//         public FailureModel()
//         {
//             this.isSuccess = false;
//         }

//         //[DataMember(EmitDefaultValue = false)]
//         //public string errorId { get; set; }
//         //[DataMember(EmitDefaultValue = false)]
//         //public string source { get; set; }
//         //[DataMember(EmitDefaultValue = false)]
//         //public string status { get; set; }
//         //[DataMember(EmitDefaultValue = false)]
//         //public int errorCode { get; set; }
//         [DataMember]
//         public bool isSuccess { get; set; }
//         [DataMember(EmitDefaultValue = false)]
//         public string message { get; set; }

//         public int errorCode { get; set; }

//         public override string ToString()
//         {
//             return JsonConvert.SerializeObject(this);
//         }
//     }
//     [DataContract]
//     public class EncryptDecryptDTO
//     {
//         [DataMember]
//         public string Text { get; set; } = null!;
//     }

//     [DataContract]
//     public class SelectListDTO
//     {
//         [DataMember(EmitDefaultValue = false)]
//         public string Value { get; set; }
//         [DataMember(EmitDefaultValue = false)]
//         public string Text { get; set; }
//     }

//     [DataContract]
//     public class MultiSelectListDTO
//     {
//         [DataMember(EmitDefaultValue = false)]
//         public string value { get; set; } = null!;
//         [DataMember(EmitDefaultValue = false)]
//         public string label { get; set; } = null!;
//     }

//     [DataContract]
//     public class EmailModel
//     {
//         public string From { get; set; }
//         public string Sender { get; set; }
//         public string Password { get; set; }
//         public string Recepients { get; set; }
//         public string? CC { get; set; }
//         public string BCC { get; set; }
//         public string Subject { get; set; }
//         public string Body { get; set; }
//         public Attachment? Attachments { get; set; }
//         public string? Host { get; set; }
//         public int? Port { get; set; }
//         public bool? Isssl { get; set; }
//     }

//     [DataContract]
//     public class DocumentDTO
//     {
//         [DataMember(EmitDefaultValue = false)]
//         public long FileSize { get; set; }

//         [DataMember(EmitDefaultValue = false)]
//         public string FileName { get; set; } = null!;
//     }

// }
