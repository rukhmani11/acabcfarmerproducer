import { Route, Routes } from "react-router-dom";
import YojanaDetailsForm from "../components/Master/YojanaDetailsForm";
import ShopDetailsForm from "../components/Master/ShopDetailsForm";
import ProductDetailsForm from "../components/Master/ProductDetailsForm";


function AppRoutes() {
  return (
    <Routes>
      {/* public routes */}
      <Route path="/" element={<YojanaDetailsForm />}>
        {/* <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="example" element={<Example />} />
        <Route path="dashboard" element={<Dashboard />} /> */}
         <Route path="shopDetails/:shopNo" element={<ShopDetailsForm />} />
         <Route path="productDetails" element={<ProductDetailsForm />} />
        </Route>

{/* catch all for page not found */}
{/* //<Route path="*" element={<PageNotFound />} /> */}
</Routes>
);
}

export default AppRoutes;