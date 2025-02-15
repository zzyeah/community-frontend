import PageHeader from "@/components/PageHeader";
import { useMemo, useState } from "react";
import styles from "@/styles/Personal.module.css";
import { useLogin } from "@/hook/useLogin";
import {
  Button,
  Card,
  Form,
  Image,
  Input,
  message,
  Modal,
  Upload,
  UploadFile,
} from "antd";
import PersonalInfoItem from "@/components/PersonalInfoItem";
import { formatDate } from "@/utils/tools";
import { UploadChangeParam } from "antd/es/upload";
import { PlusOutlined } from "@ant-design/icons";
import { Local_Authorization } from "@/types/localStorage/keys.constant";
import { useDispatch } from "react-redux";
import { updateUserInfoAsync, UserInfo } from "@/redux/user/userSlice";
import { useForm } from "antd/es/form/Form";
import { UserCheckPwdRequest } from "@/types/api/user/userCheckPwd.request";
import { checkPassword } from "@/api/_index";

export enum PersonalModifyModalName {
  personalCenter = "personalCenter",
  socialAccount = "socialAccount",
  personalProfile = "personalProfile",
}

export interface CenterFormState {
  oldpassword: string;
  newpassword: string;
  passwordConfirm: string;
  name: string;
}

export interface AccountFormState {
  mail: string;
  qq: string;
  wechat: string;
  github: string;
}

export interface ProfileFormState {
  intro: string;
}
export type formState = Partial<CenterFormState> &
  Partial<AccountFormState> &
  Partial<ProfileFormState>;

function Personal() {
  const { userInfo } = useLogin();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [panelName, setPanelName] = useState<PersonalModifyModalName>(
    PersonalModifyModalName.personalCenter
  );

  const [centerForm] = useForm();
  const [accountForm] = useForm();
  const [profileForm] = useForm();

  const centerFormInitialValues = useMemo<CenterFormState | Object>(() => {
    if (!userInfo) return {};
    return {
      oldpassword: "",
      newpassword: "",
      passwordConfirm: "",
      name: userInfo.name,
    };
  }, [userInfo]);

  const socialAccountInitialValues = useMemo<AccountFormState | {}>(() => {
    if (!userInfo) return {};
    return {
      mail: userInfo.mail,
      qq: userInfo.qq,
      wechat: userInfo.wechat,
      github: userInfo.github,
    };
  }, [userInfo]);

  const profileFormInitialValues = useMemo<ProfileFormState | {}>(() => {
    if (!userInfo) return {};
    return {
      intro: userInfo.intro,
    };
  }, [userInfo]);

  const showModal = (name: PersonalModifyModalName) => {
    setPanelName(name);
    switch (name) {
      case PersonalModifyModalName.personalCenter:
        centerForm.resetFields();
        break;
      case PersonalModifyModalName.socialAccount:
        accountForm.resetFields();
        break;
      case PersonalModifyModalName.personalProfile:
        profileForm.resetFields();
        break;
    }
    setIsModalOpen(true);
  };

  function updateUserInfo(value: formState, mess?: string) {
    let request: Partial<UserInfo> & formState = {
      ...value,
    };
    if (request.passwordConfirm) {
      request.loginPwd = request.passwordConfirm;
    }
    dispatch<any>(
      updateUserInfoAsync({
        userId: userInfo.id,
        newInfo: request,
      })
    );

    message.success(mess || "更新信息成功");
  }

  const personalCenterFinish = (value: CenterFormState) => {
    console.log(value);
    if (value.newpassword && !value.passwordConfirm) {
      message.error("确认密码不能为空");
      return;
    }
    if (!value.name) {
      message.error("昵称不能为空");
      return;
    }
    updateUserInfo(value);
    setIsModalOpen(false);
    // 用户点击了确定按钮，表明要确定修改信息
  };

  const socialAccountFinish = (value: AccountFormState) => {
    console.log(value);
    updateUserInfo(value);
    setIsModalOpen(false);
    // 用户点击了确定按钮，表明要确定修改信息
  };

  const profileFinish = (value: ProfileFormState) => {
    console.log(value);
    updateUserInfo(value);
    setIsModalOpen(false);
    // 用户点击了确定按钮，表明要确定修改信息
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  function handleAvatar(url: string | undefined, key: string) {
    if (!url) return;
    updateUserInfo({ [key]: url }, "更新头像成功");
  }

  async function checkPasswordIsCorrect() {
    const password = centerForm.getFieldValue("oldpassword");
    if (password) {
      const request = new UserCheckPwdRequest(userInfo.id, password);
      const { data } = await checkPassword(request);
      if (!data) {
        throw new Error("密码错误");
      }
    }
  }

  function ModalContent() {
    switch (panelName) {
      case PersonalModifyModalName.personalCenter:
        return (
          <>
            <Form<CenterFormState>
              autoComplete="off"
              onFinish={personalCenterFinish}
              form={centerForm}
              initialValues={centerFormInitialValues}
            >
              {/* 登录密码 */}
              <Form.Item
                label="登录密码"
                name="oldpassword"
                rules={[
                  { required: true },
                  {
                    validator: checkPasswordIsCorrect,
                  },
                ]}
                validateTrigger="onBlur"
              >
                <Input.Password
                  maxLength={6}
                  placeholder="如果要修改密码，请先输入旧密码"
                />
              </Form.Item>

              {/* 新的登录密码 */}
              <Form.Item label="新密码" name="newpassword">
                <Input.Password maxLength={6} placeholder="请输入新密码" />
              </Form.Item>

              {/* 确认密码 */}
              <Form.Item
                label="确认密码"
                name="passwordConfirm"
                rules={[
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("newpassword") === value) {
                        if (!getFieldValue("oldpassword")) {
                          return Promise.reject(new Error("请先输入旧密码"));
                        }
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("两次密码不一致"));
                    },
                  }),
                ]}
                validateTrigger="onBlur"
              >
                <Input.Password maxLength={6} placeholder="请确认密码" />
              </Form.Item>

              {/* 用户昵称 */}
              <Form.Item label="用户昵称" name="name">
                <Input placeholder="昵称可选，默认为新用户" />
              </Form.Item>

              {/* 确认修改按钮 */}
              <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  确认
                </Button>

                <Button type="link" htmlType="reset" className="resetBtn">
                  重置
                </Button>
              </Form.Item>
            </Form>
          </>
        );

      case PersonalModifyModalName.socialAccount:
        return (
          <>
            <Form<AccountFormState>
              form={accountForm}
              initialValues={socialAccountInitialValues}
              autoComplete="off"
              onFinish={socialAccountFinish}
            >
              <Form.Item label="邮箱" name="mail">
                <Input placeholder="请填写邮箱" />
              </Form.Item>
              <Form.Item label="QQ号" name="qq">
                <Input placeholder="请填写 QQ 号" />
              </Form.Item>
              <Form.Item label="微信" name="wechat">
                <Input placeholder="请填写微信号" />
              </Form.Item>
              <Form.Item label="github" name="github">
                <Input placeholder="请填写 github " />
              </Form.Item>

              {/* 确认修改按钮 */}
              <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  确认
                </Button>

                <Button type="link" htmlType="submit" className="resetBtn">
                  重置
                </Button>
              </Form.Item>
            </Form>
          </>
        );

      case PersonalModifyModalName.personalProfile:
        return (
          <>
            <Form<ProfileFormState>
              form={profileForm}
              initialValues={profileFormInitialValues}
              autoComplete="off"
              onFinish={profileFinish}
            >
              {/* 自我介绍 */}
              <Form.Item label="自我介绍" name="intro">
                <Input.TextArea rows={6} placeholder="选填" />
              </Form.Item>

              {/* 确认修改按钮 */}
              <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  确认
                </Button>

                <Button type="link" htmlType="reset" className="resetBtn">
                  重置
                </Button>
              </Form.Item>
            </Form>
          </>
        );
    }
  }

  if (!userInfo) return null;

  return (
    <div>
      <PageHeader title="个人中心" />
      {/* 信息展示 */}
      <div className={styles.container}>
        <div className={styles.row}>
          {/* 基本信息 */}
          <Card
            title="基本信息"
            extra={
              <div
                className={styles.edit}
                onClick={() => {
                  showModal(PersonalModifyModalName.personalCenter);
                }}
              >
                编辑
              </div>
            }
          >
            <PersonalInfoItem
              info={{ itemName: "登录账号", itemValue: userInfo.loginId }}
            />
            <PersonalInfoItem
              info={{ itemName: "账号密码", itemValue: "**** **** ***" }}
            />
            <PersonalInfoItem
              info={{ itemName: "用户昵称", itemValue: userInfo.name }}
            />
            <PersonalInfoItem
              info={{ itemName: "用户积分", itemValue: `${userInfo.points}` }}
            />
            <PersonalInfoItem
              info={{
                itemName: "注册时间",
                itemValue: formatDate(`${userInfo.registerDate}`),
              }}
            />
            <PersonalInfoItem
              info={{
                itemName: "上次登录时间",
                itemValue: formatDate(`${userInfo.lastLoginDate}`),
              }}
            />
            <div style={{ fontWeight: "100", height: "50px" }}>当前头像</div>
            <Image src={userInfo.avatar} width={100} />
            <div style={{ fontWeight: "100", height: "50px" }}>上传新头像</div>
            <Upload
              action={`/api/upload`}
              maxCount={1}
              listType="picture-card"
              headers={{
                authorization: `Bearer ${localStorage.getItem(
                  Local_Authorization
                )}`,
              }}
              onChange={(e: UploadChangeParam<UploadFile<any>>) => {
                console.log(e);
                if (e.file.status === "done") {
                  // 说明上传完毕
                  const url = e.file.response.data;
                  // 处理用户头像更新
                  handleAvatar(url, "avatar");
                }
              }}
            >
              <PlusOutlined />
            </Upload>
          </Card>
        </div>
        <div className={styles.row}>
          {/* 社交帐号 */}
          <Card
            title="社交帐号"
            extra={
              <div
                className={styles.edit}
                onClick={() => {
                  showModal(PersonalModifyModalName.socialAccount);
                }}
              >
                编辑
              </div>
            }
          >
            <PersonalInfoItem
              info={{ itemName: "邮箱", itemValue: userInfo.mail || "未填写" }}
            />
            <PersonalInfoItem
              info={{ itemName: "QQ号", itemValue: userInfo.qq || "未填写" }}
            />
            <PersonalInfoItem
              info={{
                itemName: "微信号",
                itemValue: userInfo.wechat || "未填写",
              }}
            />
            <PersonalInfoItem
              info={{
                itemName: "github",
                itemValue: userInfo.github || "未填写",
              }}
            />
          </Card>
        </div>
        <div className={styles.row}>
          {/* 个人简介 */}
          <Card
            title="个人简介"
            extra={
              <div
                className={styles.edit}
                onClick={() => {
                  showModal(PersonalModifyModalName.personalProfile);
                }}
              >
                编辑
              </div>
            }
          >
            <p className={styles.intro}>{userInfo.intro || "未填写"}</p>
          </Card>
        </div>
      </div>
      {/* 修改信息的对话框 */}
      <Modal
        title={panelName}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={false}
      >
        <ModalContent />
      </Modal>
    </div>
  );
}

export default Personal;
