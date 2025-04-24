// shopNo INT PRIMARY KEY,
//     shopName VARCHAR(255) NOT NULL,
//     village VARCHAR(255),
//     typeOfCard VARCHAR(100),
//     city VARCHAR(255)
export interface ShopDetailsModel {
    shopNo : string;
    shopName : string;
    village  : string;
    typeOfCard   : string;
    city : string;
  
}