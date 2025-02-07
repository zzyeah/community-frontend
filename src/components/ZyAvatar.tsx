import { UserOutlined } from "@ant-design/icons";
import { Avatar, AvatarProps } from "antd";
import React from "react";

function ZyAvatar(props: AvatarProps) {
  const { src } = props;
  if (!src) {
    return <Avatar icon={<UserOutlined />} />;
  }
  return <Avatar {...props} />;
}

export default ZyAvatar;
