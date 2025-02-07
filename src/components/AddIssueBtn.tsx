import { UserState } from "@/redux/user/userSlice";
import { RoutePaths } from "@/types/router/routePaths.enum";
import { Button, message } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AddIssueBtn() {
  const { isLogin } = useSelector<{ user: UserState }, UserState>(
    (state) => state.user
  );
  const navigate = useNavigate();
  function clickHandle() {
    // 调转至添加问答页面
    // 需要判断用户是否登陆
    if (isLogin) {
      // 跳转
      navigate(RoutePaths.IssueAdd);
    } else {
      message.warning("请先登陆");
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

export default AddIssueBtn;
