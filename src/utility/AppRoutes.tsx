import { Route, Routes } from "react-router-dom";
import YojanaDetailsForm from "../components/Master/YojanaDetailsForm";
import ShopDetailsForm from "../components/Master/ShopDetailsForm";
import ProductDetailsForm from "../components/Master/ProductDetailsForm";
import ProductEditForm from "../components/Master/ProductEditForm";
import Login from "../components/Master/Login";


function AppRoutes() {
  return (
    <Routes>
    <Route path="/" element={<YojanaDetailsForm />} />
    <Route path="/shopDetails/:shopNo" element={<ShopDetailsForm />} />
    <Route path="/editproduct/:productId" element={<ProductEditForm />} />
    <Route path="/productDetails" element={<ProductDetailsForm />} />
    <Route path="/login" element={<Login />} />
  </Routes>
  
  
);
}

export default AppRoutes;