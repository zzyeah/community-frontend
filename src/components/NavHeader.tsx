import { Button, Input, Select, Space } from "antd";
import { NavLink } from "react-router-dom";
const { Search } = Input;
const options = [
  {
    value: "issue",
    label: "问答",
  },
  {
    value: "book",
    label: "书籍",
  },
];
function NavHeader() {
  return (
    <div className="headerContainer">
      {/* 头部logo */}
      <div className="logoContainer">
        <div className="logo"></div>
      </div>
      {/* 头部导航 */}
      <nav className="navContainer">
        <NavLink to="/" className="navigation">
          问答
        </NavLink>
        <NavLink to="/books" className="navigation">
          书籍
        </NavLink>
        <NavLink to="/interviews" className="navigation">
          面试题
        </NavLink>
        <a
          href="https://www.baidu.com/"
          className="navigation"
          target="_blank"
          rel="noreferrer"
        >
          视频教程
        </a>
      </nav>
      {/* 搜索栏 */}
      <div className="searchContainer">
        <Space.Compact>
          <Select
            defaultValue="issue"
            options={options}
            size="large"
            style={{ width: "20%" }}
          />
          <Search
            placeholder="请输入要搜索的内容"
            allowClear
            enterButton="搜索"
            size="large"
            style={{
              width: "80%",
            }}
          />
        </Space.Compact>
      </div>
      {/* 登陆按钮 */}
      <div className="loginBtnContainer">
        <Button type="primary" size="large">
          注册/登录
        </Button>
      </div>
    </div>
  );
}

export default NavHeader;
