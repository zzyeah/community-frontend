import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Issues from "../pages/Issues";
import Interviews from "../pages/Interviews";
import Books from "../pages/Books";
import AddIssue from "../pages/AddIssue";
import { RoutePaths } from "@/types/router/routePaths.enum";
import IssuesDetail from "@/pages/IssuesDetail";
import SearchPage from "@/pages/SearchPage";

function RouteConfig() {
  return (
    <Routes>
      <Route path={RoutePaths.Issue} element={<Issues />}></Route>
      <Route path={RoutePaths.IssueAdd} element={<AddIssue />}></Route>
      <Route
        path={`${RoutePaths.IssueDetail}`}
        element={<IssuesDetail />}
      ></Route>
      <Route path={RoutePaths.Books} element={<Books />}></Route>
      <Route path={RoutePaths.Interviews} element={<Interviews />}></Route>
      <Route path={RoutePaths.searchPage} element={<SearchPage />}></Route>
      <Route
        path={RoutePaths.Home}
        element={<Navigate replace to={RoutePaths.Issue}></Navigate>}
      ></Route>
    </Routes>
  );
}

export default RouteConfig;
