import { Modal, Radio, RadioChangeEvent } from "antd";
import React, { useState } from "react";
import styles from "../styles/LoginForm.module.css";

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
  const { Group, Button } = Radio;
  const [value, setValue] = useState(LoginFormRadioButtonTypes.LOGIN);

  function handleOk(): void {
    throw new Error("Function not implemented.");
  }

  function onChange(e: RadioChangeEvent) {
    const { value } = e.target;
    setValue(value);
  }

  function LoginContainer() {
    return <>登陆面板</>;
  }

  function RegisterContainer() {
    return <>注册面板</>;
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
        <Group
          value={value}
          onChange={onChange}
          className={styles.radioGroup}
          buttonStyle="solid"
        >
          <Button
            value={LoginFormRadioButtonTypes.LOGIN}
            className={styles.radioButton}
          >
            登陆
          </Button>
          <Button
            value={LoginFormRadioButtonTypes.REGISTER}
            className={styles.radioButton}
          >
            注册
          </Button>
        </Group>
        {/* 下面需要显示对应功能的表单 */}
        {container}
      </Modal>
    </div>
  );
}

export default LoginForm;
