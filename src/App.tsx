import React from "react";
import "./styles/App.css";
import NavHeader from "./components/NavHeader";
import PageFooter from "./components/PageFooter";
import { Layout } from "antd";
import RouteConfig from "./router";

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <div className="App">
      {/* 头部 */}
      <Header>
        <NavHeader />
      </Header>
      {/* 路由页面 */}
      <Content className="content">
        <RouteConfig></RouteConfig>
      </Content>
      {/* 底部 */}
      <Footer className="footer">
        <PageFooter />
      </Footer>
    </div>
  );
}

export default App;
