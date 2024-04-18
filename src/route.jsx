import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// user
import LandingPage from "./pages/user/LandingPage.jsx";
import Mango from "./pages/user/Mangopage.jsx";
import MangoDetail from "./components/user/mango/detail.jsx";

// admin
import Dashboard from "./pages/admin/dashboard.jsx";
import AdminRoute from "./AdminRoute.jsx";
import AdminLogin from "./pages/admin/admin.jsx";
import AdminMango from "./pages/admin/mango.jsx";
import AddMango from "./components/admin/mango/addmango.jsx";
import Editmango from "./components/admin/mango/editmango.jsx";

const route = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* User Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="mango" element={<Mango />} />
        <Route path="mango/detail/:id" element={<MangoDetail />} />

        {/* Admin Routes */}
        <Route path="admin" element={<AdminLogin />} />
        <Route element={<AdminRoute />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="admin/mango" element={<AdminMango />} />
          <Route path="admin/mango/add" element={<AddMango />} />
          <Route path="admin/mango/edit/:id" element={<Editmango />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default route;
