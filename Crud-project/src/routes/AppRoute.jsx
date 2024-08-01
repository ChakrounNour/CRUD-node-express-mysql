import React from "react";
import { Route, Routes } from "react-router";
import ListBook from "../pages/ListBook";
import UpdateBook from "../components/organisms/UpdateBook";

function AppRoute() {
  return (
    <Routes>
      <Route path="/" element={<ListBook />} />
      <Route path="/bookUpdate/:idBook" element={<UpdateBook />} />
    </Routes>
  );
}

export default AppRoute;
