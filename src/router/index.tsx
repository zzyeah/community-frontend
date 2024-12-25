import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Issues from "../pages/Issues";
import Interviews from "../pages/Interviews";
import Books from "../pages/Books";

function RouteConfig() {
  return (
    <Routes>
      <Route path="/issues" element={<Issues />}></Route>
      <Route path="/books" element={<Books />}></Route>
      <Route path="/interviews" element={<Interviews />}></Route>
      <Route
        path="/"
        element={<Navigate replace to="/issues"></Navigate>}
      ></Route>
    </Routes>
  );
}

export default RouteConfig;
