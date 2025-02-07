import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/AddIssue.module.css";
import { Button, Form, Input, message, Select } from "antd";
import { Editor } from "@toast-ui/react-editor";
import { useDispatch, useSelector } from "react-redux";
import { getTypeList, TypeState } from "@/redux/type/typeSlice";
import { typeOptionCreator } from "@/utils/tools";
import { AddIssueRequest } from "@/types/api/addIssue/addIssue.request";
import { UserState } from "@/redux/user/userSlice";
import { addIssue } from "@/api/issue";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "@/types/router/routePaths.enum";
import ZyEditor from "@/components/ZyEditor";

export interface AddIssueProps {}
export type AddIssueData = AddIssueRequest;
export type AddIssueFormState = Omit<AddIssueData, "userId">;
function AddIssue(_: AddIssueProps) {
  const [addIssueForm] = Form.useForm<AddIssueFormState>();
  const editorRef = useRef<Editor>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [issueInfo] = useState<AddIssueData>({
    issueTitle: "",
    issueContent: "",
    typeId: "",
    userId: "",
  });
  const { typeList } = useSelector<{ type: TypeState }, TypeState>(
    (state) => state.type
  );
  const { userInfo } = useSelector<{ user: UserState }, UserState>(
    (state) => state.user
  );
  /**
   * 提交回答的回调函数
   * @param values
   */
  function addHandle(values: any): void {
    console.log(values);
    const result: AddIssueData = {
      ...addIssueForm.getFieldsValue(),
      issueContent: editorRef.current?.getInstance().getHTML(),
      userId: userInfo?.id,
    };
    addIssue(result);
    navigate(RoutePaths.Home);
    message.success("你的问题已经提交，审核通过后将会进行展示");
  }

  useEffect(() => {
    if (!typeList.length) {
      dispatch<any>(getTypeList());
    }
  }, [dispatch, typeList.length]);

  return (
    <div className={styles.container}>
      <Form<AddIssueFormState>
        name="basic"
        initialValues={issueInfo}
        autoComplete="off"
        onFinish={addHandle}
        form={addIssueForm}
      >
        {/* 问答标题 */}
        <Form.Item
          label="标题"
          name="issueTitle"
          rules={[{ required: true, message: "请输入标题" }]}
        >
          <Input placeholder="请输入标题" size="large" />
        </Form.Item>

        {/* 问题类型 */}
        <Form.Item
          label="问题分类"
          name="typeId"
          rules={[{ required: true, message: "请选择问题所属分类" }]}
        >
          <Select style={{ width: 200 }}>
            {typeOptionCreator(Select, typeList)}
          </Select>
        </Form.Item>

        {/* 问答内容 */}
        <Form.Item
          label="问题描述"
          name="issueContent"
          rules={[{ required: true, message: "请输入问题描述" }]}
        >
          <ZyEditor ref={editorRef} />
        </Form.Item>

        {/* 确认按钮 */}
        <Form.Item wrapperCol={{ offset: 3, span: 16 }}>
          <Button type="primary" htmlType="submit">
            确认新增
          </Button>

          <Button type="link" htmlType="submit" className="resetBtn">
            重置
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default AddIssue;
