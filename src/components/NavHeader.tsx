import { Input, Select, Space } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import LoginAvatar from "./LoginAvatar";
import { RoutePaths } from "@/types/router/routePaths.enum";
import { useState } from "react";
import { SearchOptions } from "@/types/common/searchOptions.enum";
const { Search } = Input;

const options = [
  {
    value: SearchOptions.Issue,
    label: "问答",
  },
  {
    value: SearchOptions.Book,
    label: "书籍",
  },
];
function NavHeader(props) {
  const [searchOption, setSearchOption] = useState<SearchOptions>(
    SearchOptions.Issue
  );
  const navigate = useNavigate();
  function onSearch(
    value: string,
    event,
    { source }: { source: "input" | "clear" }
  ) {
    if (!value) {
      if (source === "clear") {
        return;
      }
      // 跳转首页
      navigate(RoutePaths.Home);
    }
    if (value) {
      navigate(RoutePaths.searchPage, {
        state: { value, searchOption },
      });
    }
  }

  function selectOnChange(value: SearchOptions) {
    setSearchOption(value);
  }

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
            defaultValue={SearchOptions.Issue}
            options={options}
            size="large"
            style={{ width: "20%" }}
            onChange={selectOnChange}
          />
          <Search
            placeholder="请输入要搜索的内容"
            allowClear
            enterButton="搜索"
            size="large"
            style={{
              width: "80%",
            }}
            onSearch={onSearch}
          />
        </Space.Compact>
      </div>
      {/* 登陆按钮 */}
      <div className="loginBtnContainer">
        <LoginAvatar loginHandle={props.loginHandle} />
      </div>
    </div>
  );
}

export default NavHeader;
