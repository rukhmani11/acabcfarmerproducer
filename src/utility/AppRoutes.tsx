import { Routes, Route } from "react-router-dom";
import YojanaDetailsForm from "../components/Master/YojanaDetailsForm";

import ShopDetailsForm from "../components/Master/ShopDetailsForm";

import RequireAuth from "./RequireAuth";
import { ROLES } from "./Config";
import ProductEditForm from "../components/Master/ProductEditForm";
import ProductDetailsForm from "../components/Master/ProductDetailsForm";
import ProductList from "../components/Master/ProductList";
import PageNotFound from "../components/layout/PageNotFound";
import Login from "../components/Master/Login";
import { AuthProvider } from "./context/AuthContext";


const App = () => {
  return (
    <AuthProvider>
    <Routes>
      <Route path="/" element={<YojanaDetailsForm />} />
      <Route path="/shopDetails/:shopNo" element={<ShopDetailsForm />} />
      <Route path="/login" element={<Login />} />
      {/* <Route path="/unauthorized" element={<Unauthorized />} /> */}

      <Route element={<RequireAuth allowedRoles={[ROLES.admin]} />}>
        <Route path="/editproduct/:productId" element={<ProductEditForm />} />
        <Route path="/productList" element={<ProductList />} />
        <Route path="/productDetails" element={<ProductDetailsForm />} />
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  </AuthProvider>
  );
};

export default App;
