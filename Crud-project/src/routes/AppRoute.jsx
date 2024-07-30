import React from "react";
import { Route, Routes } from "react-router";
import ListBook from "../pages/ListBook";
import FormUpdateBook from "../components/organisms/FormUpdateBook";

function AppRoute() {
  return (
    <Routes>
      <Route path="/" element={<ListBook />} />
      <Route path="/bookUpdate/:idBook" element={<FormUpdateBook />} />
    </Routes>
  );
}

export default AppRoute;
