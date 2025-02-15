import React, { useEffect, useState } from "react";
import "./styles/App.css";
import NavHeader from "./components/NavHeader";
import PageFooter from "./components/PageFooter";
import { Layout, message } from "antd";
import RouteConfig from "./router/route";
import LoginForm from "./components/LoginForm";
import { getInfo, getUserById } from "./api/user/user.api";
import { Local_Authorization } from "./types/localStorage/keys.constant";
import { useDispatch } from "react-redux";
import { changeLoginStatus, initUserInfo } from "./redux/user/userSlice";
import RouteBefore from "./router/RouteBefore";

const { Header, Content, Footer } = Layout;

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  // 系统加载的时候，需要恢复用户登陆状态
  useEffect(() => {
    async function fetchData() {
      const result = await getInfo();
      if (result.data) {
        const { data } = await getUserById(result.data.id);
        // 存储用户信息
        dispatch(initUserInfo(data));
        dispatch(changeLoginStatus(true));
      } else {
        message.warning(result.msg);
        localStorage.removeItem(Local_Authorization);
      }
    }
    const authorization = localStorage.getItem(Local_Authorization);

    if (authorization) fetchData();
  }, [dispatch]);

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
        <RouteBefore />
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
