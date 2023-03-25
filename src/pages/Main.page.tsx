import * as react from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { LoaderComponent } from "../components/ui/atoms/Loader.component";
import { applicationState } from "../store/application/selector";
import { HomePage } from "./Home.page.tsx";
import { LoginPage } from "./Login.page";
import { RegisterPage } from "./Register.page";
import "react-toastify/dist/ReactToastify.css";
import { NavbarComponent } from "../components/ui/organisms/Navbar.component";
import { OrdersPage } from "./Orders.page";
import { AdminPage } from "./Admin.page";
import { SupplierPage } from "./Supplier.page";

interface MainPageProps {}

export const MainPage: React.FunctionComponent<MainPageProps> = ({}) => {
  const dispatch = useDispatch();
  const { loading, user, token } = useSelector(applicationState);
  const location = useLocation();
  const nav = useNavigate();

  return (
    <div>
      <LoaderComponent isLoading={loading} />
      <ToastContainer
        style={{
          zIndex: 99999,
        }}
      />
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/supplier" element={<SupplierPage />} />
        <Route path="/admin" element={<AdminPage />} />
        {/* ENROLLMENT */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
};
