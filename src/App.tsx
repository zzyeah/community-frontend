import React, { useState } from "react";
import "./styles/App.css";
import NavHeader from "./components/NavHeader";
import PageFooter from "./components/PageFooter";
import { Layout } from "antd";
import RouteConfig from "./router";
import LoginForm from "./components/LoginForm";

const { Header, Content, Footer } = Layout;

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function closeModal() {
    setIsModalOpen(false);
  }

  /**
   * 打开弹框
   */
  function loginHandle() {
    setIsModalOpen(true);
    console.log("loginHandle");
  }

  return (
    <div className="App">
      {/* 头部 */}
      <Header>
        <NavHeader loginHandle={loginHandle} />
      </Header>
      {/* 路由页面 */}
      <Content className="content">
        <RouteConfig></RouteConfig>
      </Content>
      {/* 底部 */}
      <Footer className="footer">
        <PageFooter />
      </Footer>
      {/* 登陆弹窗 */}
      <LoginForm isShow={isModalOpen} closeModal={closeModal} />
    </div>
  );
}

export default App;
