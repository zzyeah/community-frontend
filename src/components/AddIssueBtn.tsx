import { UserState } from "@/redux/user/userSlice";
import { Button, message } from "antd";
import React from "react";
import { useSelector } from "react-redux";

function AddIssue() {
  const { isLogin } = useSelector<{ user: UserState }, UserState>(
    (state) => state.user
  );
  function clickHandle() {
    // 调转至添加问答页面
    // 需要判断用户是否登陆
    if (isLogin) {
      // 跳转
    } else {
      message.warning('请先登陆')
    }
  }

  return (
    <div>
      <Button
        type="primary"
        size="large"
        style={{ width: "100%", marginBottom: "30px" }}
        onClick={clickHandle}
      >
        我要发问
      </Button>
    </div>
  );
}

export default AddIssue;
