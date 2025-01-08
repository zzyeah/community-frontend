import {
  changeLoginStatus,
  clearUserInfo,
  UserState,
} from "@/redux/user/userSlice";
import { Avatar, Button, List, Popover, Image } from "antd";
import { UserOutlined } from "@ant-design/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/LoginAvatar.module.css";
import { Local_Authorization } from "@/_index";
import { useNavigate } from "react-router-dom";
import { LoginAvatarListItem } from "@/types/loginAvatar/loginAvatarItemList.enum";

export interface LoginAvatarProps {
  loginHandle: () => void;
}

// 该组件用于显示用户的头像，如果用户没有登录，那么就显示登录注册按钮
function LoginAvatar(props: LoginAvatarProps) {
  const { isLogin, userInfo } = useSelector<{ user: UserState }, UserState>(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function listClickHandle(item: LoginAvatarListItem) {
    switch (item) {
      case LoginAvatarListItem.PERSONAL_CENTER:
        break;
      case LoginAvatarListItem.LOGOUT:
        // 退出登陆
        // 清除Token
        localStorage.removeItem(Local_Authorization);
        // 清除用户信息
        dispatch(clearUserInfo());
        dispatch(changeLoginStatus(false));
        // 跳转回 /
        navigate("/");
        break;
    }
  }

  function Logined() {
    const content = (
      <List
        dataSource={[
          LoginAvatarListItem.PERSONAL_CENTER,
          LoginAvatarListItem.LOGOUT,
        ]}
        size="large"
        renderItem={(item, i) => {
          return (
            <List.Item
              style={{ cursor: "pointer" }}
              key={i}
              onClick={() => listClickHandle(item)}
            >
              {item}
            </List.Item>
          );
        }}
      />
    );
    return (
      <Popover content={content} trigger={"hover"} placement="bottom">
        <Avatar
          src={<Image src={userInfo?.avatar} preview={false} />}
          size={"large"}
          icon={<UserOutlined />}
        />
      </Popover>
    );
  }

  function UnLogin() {
    return (
      <Button type="primary" size="large" onClick={props.loginHandle}>
        注册/登录
      </Button>
    );
  }

  function Login() {
    if (isLogin) return <Logined />;
    return <UnLogin />;
  }

  return (
    <div className={styles.avatarContainer}>
      <Login />
    </div>
  );
}

export default LoginAvatar;
