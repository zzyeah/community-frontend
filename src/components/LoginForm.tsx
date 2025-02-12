import {
  Button,
  Checkbox,
  CheckboxChangeEvent,
  Col,
  Form,
  FormInstance,
  Input,
  message,
  Modal,
  Radio,
  RadioChangeEvent,
  Row,
} from "antd";
import { useEffect, useState } from "react";
import { getCaptcha, login, register, userIsExist } from "../api/user/user.api";
import styles from "@/styles/LoginForm.module.css";
import { RuleObject } from "antd/es/form";
import { StoreValue } from "antd/es/form/interface";
import {
  UserLoginInfo,
  UserRegisterInfo,
  IBaseInfo,
} from "../types/loginForm/userInfo.interface";
import { UserRegisterRequest } from "../types/api/user/userRegister.request";
import { useDispatch } from "react-redux";
import { changeLoginStatus, initUserInfo } from "@/redux/user/userSlice";
import { UserLoginRequest } from "@/types/api/user/userLogin.request";

export interface LoginFormProps {
  isShow: boolean;
  closeModal: () => void;
}

export enum LoginFormRadioButtonTypes {
  LOGIN,
  REGISTER,
}

function LoginForm(props: LoginFormProps) {
  const { isShow, closeModal } = props;
  const { Group: RadioGroup, Button: RadioButton } = Radio;
  const { Item: FormItem } = Form;
  const { Password } = Input;
  const [formType, setFormType] = useState(LoginFormRadioButtonTypes.LOGIN);
  const [loginForm] = Form.useForm<UserLoginInfo>();
  const [registerForm] = Form.useForm<UserRegisterInfo>();
  const dispatch = useDispatch();

  // 登录表单的状态数据
  const [loginInfo] = useState<UserLoginInfo>({
    loginId: "",
    loginPwd: "",
    captcha: "",
    remember: false,
  });

  // 注册表单的状态数据
  const [registerInfo] = useState<UserRegisterInfo>({
    loginId: "",
    nickname: "",
    captcha: "",
  });

  const [captcha, setCaptcha] = useState<string>(null);

  async function captchaClickHandle() {
    const result = await getCaptcha();
    setCaptcha(result);
  }

  useEffect(() => {
    captchaClickHandle();
  }, [props.isShow]);

  function handleOk(): void {
    throw new Error("Function not implemented.");
  }

  function onChange(e: RadioChangeEvent) {
    const { value } = e.target;
    setFormType(value);
  }

  function loginFormCancel() {
    loginForm.resetFields();
  }

  function registerFormCancel() {
    registerForm.resetFields();
  }

  function handleCancel() {
    loginFormCancel();
    registerFormCancel();
    closeModal();
  }

  async function loginHandle(values: UserLoginInfo) {
    const req = new UserLoginRequest(values);
    const res = await login(req);
    if (res.code === 0) {
      const { data } = res;
      if (!data) {
        // 账号密码不正确
        message.error("账号或密码不正确");
        captchaClickHandle();
      } else if (!data.enabled) {
        // 账号被禁用了
        message.warning("账号被禁用");
        captchaClickHandle();
      } else {
        // 说明账号密码正确，能够登录
        // 将用户的信息存储到状态仓库，方便后面使用
        dispatch(initUserInfo(data));
        dispatch(changeLoginStatus(true));
        handleCancel();
      }
    } else {
      message.warning(res.msg);
      captchaClickHandle();
    }
  }

  async function registerHandle(values: any) {
    const req = new UserRegisterRequest(values);
    const result = await register(req);
    if (result.code === 0) {
      message.success("用户注册成功，默认密码为123456");
      // 存储到数据仓库里面
      dispatch(initUserInfo(result.data));
      // 更新登陆状态
      dispatch(changeLoginStatus(true));
      // 关闭登陆弹出框
      handleCancel();
    } else {
      message.warning(result.msg);
      captchaClickHandle();
    }
  }

  async function checkLoginIdIsExist(_: RuleObject, value: StoreValue) {
    if (value) {
      const { data } = await userIsExist(value);
      if (data) {
        throw new Error("用户名已存在");
      }
    }
  }

  function handleFormValueChange<T extends IBaseInfo, K extends keyof T>(
    form: FormInstance<T>,
    key: K,
    value: T[K]
  ) {
    const obj: any = { ...form.getFieldsValue() };
    obj[key] = value;
    form.setFieldsValue(obj);
  }

  function LoginContainer() {
    return (
      <div className={styles.container}>
        <Form<UserLoginInfo>
          name="basic1"
          autoComplete="off"
          onFinish={loginHandle}
          form={loginForm}
          initialValues={loginInfo}
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
            <Input placeholder="请输入你的登录账号" />
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
            <Password placeholder="请输入你的登录密码，新用户默认为123456" />
          </FormItem>

          {/* 验证码 */}
          <FormItem
            name="captcha"
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
                  onChange={(e) =>
                    handleFormValueChange(loginForm, "captcha", e.target.value)
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
              onChange={(e: CheckboxChangeEvent) =>
                handleFormValueChange(loginForm, "remember", e.target.checked)
              }
              checked={loginForm.getFieldInstance("remember")}
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
            <Button type="primary" htmlType="reset">
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
          form={registerForm}
          onFinish={registerHandle}
          onReset={registerFormCancel}
          initialValues={registerInfo}
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
              { validator: checkLoginIdIsExist },
            ]}
            validateTrigger="onBlur"
            validateDebounce={100}
          >
            <Input placeholder="请输入账号" />
          </FormItem>

          <FormItem label="用户昵称" name="nickname">
            <Input placeholder="请输入昵称，不填写默认为新用户xxx" />
          </FormItem>

          <FormItem
            name="captcha"
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
                  onChange={(e) =>
                    handleFormValueChange(
                      registerForm,
                      "captcha",
                      e.target.value
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
            <Button type="primary" htmlType="reset">
              重置
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }

  function FormContent() {
    if (formType === LoginFormRadioButtonTypes.LOGIN) {
      return <LoginContainer />;
    }
    return <RegisterContainer />;
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
          value={formType}
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
        <FormContent />
      </Modal>
    </div>
  );
}

export default LoginForm;
