import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RouteConfig from "./route";
import routeBeforeConfig from "./RouteBeforeConfig";
import { Local_Authorization } from "@/types/localStorage/keys.constant";
import { Alert } from "antd";
import { RoutePaths } from "@/types/router/routePaths.enum";

function RouteBefore() {
  const navigator = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  console.log(location.pathname);

  const currentPath = routeBeforeConfig.filter((it) => it.path === pathname)[0];
  if (currentPath.needLogin && !localStorage.getItem(Local_Authorization)) {
    return (
      <Alert
        message="请先登录"
        type="error"
        closable
        onClose={handleClose}
        style={{
          marginTop: "30px",
          marginBottom: "30px",
        }}
      />
    );
  }

  function handleClose() {
    navigator(RoutePaths.Home);
  }

  return <RouteConfig />;
}

export default RouteBefore;
