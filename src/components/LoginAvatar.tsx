import { UserState } from "@/redux/user/userSlice";
import { Avatar, Button, List, Popover } from "antd";
import { UserOutlined } from "@ant-design/icons";
import React from "react";
import { useSelector } from "react-redux";
import styles from "../styles/LoginAvatar.module.css";

export interface LoginAvatarProps {
  loginHandle: () => void;
}

// 该组件用于显示用户的头像，如果用户没有登录，那么就显示登录注册按钮
function LoginAvatar(props: LoginAvatarProps) {
  const { isLogin } = useSelector<{ user: UserState }, UserState>(
    (state) => state.user
  );

  let loginSatus = null;

  if (isLogin) {
    const content = (
      <List
        dataSource={["个人中心", "退出登陆"]}
        size="large"
        renderItem={(item) => {
          return <List.Item style={{ cursor: "pointer" }}>{item}</List.Item>;
        }}
      />
    );
    loginSatus = (
      <Popover content={content} trigger={"hover"} placement="bottom">
        <Avatar src="" size={"large"} icon={<UserOutlined />} />
      </Popover>
    );
  } else {
    loginSatus = (
      <Button type="primary" size="large" onClick={props.loginHandle}>
        注册/登录
      </Button>
    );
  }

  return <div className={styles.avatarContainer}>{loginSatus}</div>;
}

export default LoginAvatar;
