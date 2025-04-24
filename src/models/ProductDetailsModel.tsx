// CREATE TABLE ProductDetails (
//     productId INT PRIMARY KEY AUTO_INCREMENT,
//     productName VARCHAR(255) NOT NULL,
//     description TEXT,
//     rate DECIMAL(10, 2),
//     quantity INT
// );
export interface ProductDetailsModel {
    productId : string;
    productName : string;
    description  : string;
    rate   : number;
    quantity : number;
  
}