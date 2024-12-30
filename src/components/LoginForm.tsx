import {
  Button,
  Checkbox,
  Col,
  Form,
  FormInstance,
  Input,
  Modal,
  Radio,
  RadioChangeEvent,
  Row,
} from "antd";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { getCaptcha } from "../api/user";
import styles from "../styles/LoginForm.module.css";

export interface LoginFormProps {
  isShow: boolean;
  closeModal: () => void;
}

export enum LoginFormRadioButtonTypes {
  LOGIN,
  REGISTER,
}

export interface IBaseInfo {
  loginId: string;
  captcha: string;
}

export interface LoginInfo extends IBaseInfo {
  loginPwd: string;
  remember: boolean;
}

export interface RegisterInfo extends IBaseInfo {
  nickname: string;
}

function LoginForm(props: LoginFormProps) {
  const { isShow, closeModal } = props;
  const { Group: RadioGroup, Button: RadioButton } = Radio;
  const { Item: FormItem } = Form;
  const { Password } = Input;
  const [value, setValue] = useState(LoginFormRadioButtonTypes.LOGIN);
  const loginFormRef = useRef<FormInstance>();
  const registerFormRef = useRef<FormInstance>();

  // 登录表单的状态数据
  const [loginInfo, setLoginInfo] = useState<LoginInfo>({
    loginId: "",
    loginPwd: "",
    captcha: "",
    remember: false,
  });

  // 注册表单的状态数据
  const [registerInfo, setRegisterInfo] = useState<RegisterInfo>({
    loginId: "",
    nickname: "",
    captcha: "",
  });

  const [captcha, setCaptcha] = useState<string>(null);

  useEffect(() => {
    captchaClickHandle();
  }, [props.isShow]);

  function handleOk(): void {
    throw new Error("Function not implemented.");
  }

  function onChange(e: RadioChangeEvent) {
    const { value } = e.target;
    setValue(value);
  }
  function loginHandle(values: any): void {
    throw new Error("Function not implemented.");
  }

  function registerHandle(values: any): void {
    throw new Error("Function not implemented.");
  }

  async function captchaClickHandle() {
    const result = await getCaptcha();
    setCaptcha(result);
  }

  function updateInfo<T extends IBaseInfo, K extends keyof T>(
    loginInfo: T,
    value: T[K],
    key: K,
    setLoginInfo: Dispatch<SetStateAction<T>>
  ): void {
    const obj = { ...loginInfo };
    obj[key] = value;
    setLoginInfo(obj);
  }

  function LoginContainer() {
    return (
      <div className={styles.container}>
        <Form
          name="basic1"
          autoComplete="off"
          onFinish={loginHandle}
          ref={loginFormRef}
        >
          <FormItem
            label="登录账号"
            name="loginId"
            rules={[
              {
                required: true,
                message: "请输入账号",
              },
            ]}
          >
            <Input
              placeholder="请输入你的登录账号"
              value={loginInfo.loginId}
              onChange={(e) =>
                updateInfo(loginInfo, e.target.value, "loginId", setLoginInfo)
              }
            />
          </FormItem>

          <FormItem
            label="登录密码"
            name="loginPwd"
            rules={[
              {
                required: true,
                message: "请输入密码",
              },
            ]}
          >
            <Password
              placeholder="请输入你的登录密码，新用户默认为123456"
              value={loginInfo.loginPwd}
              onChange={(e) =>
                updateInfo(loginInfo, e.target.value, "loginPwd", setLoginInfo)
              }
            />
          </FormItem>

          {/* 验证码 */}
          <FormItem
            name="logincaptcha"
            label="验证码"
            rules={[
              {
                required: true,
                message: "请输入验证码",
              },
            ]}
          >
            <Row align="middle">
              <Col span={16}>
                <Input
                  placeholder="请输入验证码"
                  value={loginInfo.captcha}
                  onChange={(e) =>
                    updateInfo(
                      loginInfo,
                      e.target.value,
                      "captcha",
                      setLoginInfo
                    )
                  }
                />
              </Col>
              <Col span={6}>
                <div
                  className={styles.captchaImg}
                  onClick={captchaClickHandle}
                  dangerouslySetInnerHTML={{ __html: captcha }}
                ></div>
              </Col>
            </Row>
          </FormItem>

          <FormItem
            name="remember"
            wrapperCol={{
              offset: 5,
              span: 16,
            }}
          >
            <Checkbox
              onChange={(e) =>
                updateInfo(
                  loginInfo,
                  e.target.checked,
                  "remember",
                  setLoginInfo
                )
              }
              checked={loginInfo.remember}
            >
              记住我
            </Checkbox>
          </FormItem>

          <FormItem
            wrapperCol={{
              offset: 5,
              span: 16,
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: 20 }}
            >
              登录
            </Button>
            <Button type="primary" htmlType="submit">
              重置
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }

  function RegisterContainer() {
    return (
      <div className={styles.container}>
        <Form
          name="basic2"
          autoComplete="off"
          ref={registerFormRef}
          onFinish={registerHandle}
        >
          <FormItem
            label="登录账号"
            name="loginId"
            rules={[
              {
                required: true,
                message: "请输入账号，仅此项为必填项",
              },
              // 验证用户是否已经存在
              // { validator: checkLoginIdIsExist },
            ]}
            validateTrigger="onBlur"
          >
            <Input
              placeholder="请输入账号"
              value={registerInfo.loginId}
              onChange={(e) =>
                updateInfo(
                  registerInfo,
                  e.target.value,
                  "loginId",
                  setRegisterInfo
                )
              }
            />
          </FormItem>

          <FormItem label="用户昵称" name="nickname">
            <Input
              placeholder="请输入昵称，不填写默认为新用户xxx"
              value={registerInfo.nickname}
              onChange={(e) =>
                updateInfo(
                  registerInfo,
                  e.target.value,
                  "nickname",
                  setRegisterInfo
                )
              }
            />
          </FormItem>

          <FormItem
            name="registercaptcha"
            label="验证码"
            rules={[
              {
                required: true,
                message: "请输入验证码",
              },
            ]}
          >
            <Row align="middle">
              <Col span={16}>
                <Input
                  placeholder="请输入验证码"
                  value={registerInfo.captcha}
                  onChange={(e) =>
                    updateInfo(
                      registerInfo,
                      e.target.value,
                      "captcha",
                      setRegisterInfo
                    )
                  }
                />
              </Col>
              <Col span={6}>
                <div
                  className={styles.captchaImg}
                  onClick={captchaClickHandle}
                  dangerouslySetInnerHTML={{ __html: captcha }}
                ></div>
              </Col>
            </Row>
          </FormItem>

          <FormItem
            wrapperCol={{
              offset: 5,
              span: 16,
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: 20 }}
            >
              注册
            </Button>
            <Button type="primary" htmlType="submit">
              重置
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }

  let container = null;
  if (value === LoginFormRadioButtonTypes.LOGIN) {
    container = <LoginContainer />;
  } else {
    container = <RegisterContainer />;
  }

  return (
    <div>
      <Modal
        title="注册/登陆"
        open={isShow}
        onOk={handleOk}
        onCancel={closeModal}
      >
        <RadioGroup
          value={value}
          onChange={onChange}
          className={styles.radioGroup}
          buttonStyle="solid"
        >
          <RadioButton
            value={LoginFormRadioButtonTypes.LOGIN}
            className={styles.radioButton}
          >
            登陆
          </RadioButton>
          <RadioButton
            value={LoginFormRadioButtonTypes.REGISTER}
            className={styles.radioButton}
          >
            注册
          </RadioButton>
        </RadioGroup>
        {/* 下面需要显示对应功能的表单 */}
        {container}
      </Modal>
    </div>
  );
}

export default LoginForm;
