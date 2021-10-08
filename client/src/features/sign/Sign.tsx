import { Col, Row, Space, Form, Input, Button } from 'antd';
import React, { FC, useState } from 'react';
import SignInIcon from 'lotties/sign-in.json';
import './Sign.scss';
import Lottie from 'react-lottie';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const Sign = () => {
  const [isShowSignIn, setIsShowSignIn] = useState(true);

  return (
    <div className="sign-container">
      <div className="sign">
        <Row>
          <Col span={12}>
            <div className="sign__left">
              <PanelSignIn state={isShowSignIn} />
              {!isShowSignIn && <SignUpForm setState={setIsShowSignIn} />}
            </div>
          </Col>
          <Col span={12}>
            <div className="sign__right">
              {isShowSignIn && <SignInForm setState={setIsShowSignIn} />}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

const PanelSignIn: FC<{ state: boolean }> = (props) => {
  const signInIconOption = {
    loop: true,
    autoplay: true,
    animationData: SignInIcon,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <Space
      direction="vertical"
      className={props.state ? 'panel panel--left' : 'panel panel--right'}
    >
      <Lottie options={signInIconOption} height={450} width={450} />
      <div
        style={{
          width: '250px',
          margin: ' 0 auto',
          textAlign: 'center',
        }}
      >
        <h2 style={{ color: 'white' }}>
          Start for free and get attractive features
        </h2>
      </div>
    </Space>
  );
};

const SignInForm: FC<{
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}> = (props) => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Space direction="vertical" className="sign-form-ctn">
      <div className="sign__right__header">
        <h1>Welcome back!</h1>
        <p style={{ color: 'gray' }}>
          Don't have an account yet?{' '}
          <span
            style={{ color: '#9b88ec', cursor: 'pointer', fontWeight: 'bold' }}
            onClick={() => {
              props.setState(false);
            }}
          >
            Register now
          </span>
        </p>
      </div>
      <Form
        className="sign__right__form"
        layout="vertical"
        name="sign-in"
        autoComplete="off"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Username:"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input
            className="sign__right__form__username"
            size="large"
            placeholder="username"
            prefix={<UserOutlined />}
          />
        </Form.Item>
        <Form.Item
          label="Password:"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password
            size="large"
            placeholder="••••••••"
            prefix={<LockOutlined />}
            className="sign__right__form__password"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            className="sign__right__form__btn-sign"
          >
            Sign in
          </Button>
        </Form.Item>
      </Form>
    </Space>
  );
};

interface validate {
  validateStatus:
    | ''
    | 'warning'
    | 'success'
    | 'error'
    | 'validating'
    | undefined;
  errorMsg: string;
}
const SignUpForm: FC<{
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}> = (props) => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const [password, setPassword] = useState<string>('');
  const [errorConfirmPassword, setErrorConfirmPassword] = useState<validate>({
    validateStatus: '',
    errorMsg: '',
  });
  const [disableConfirmPassword, setDisableConfirmPassword] =
    useState<boolean>(true);

  const handleConfirmPassword = (value: string) => {
    if (password === value) {
      setErrorConfirmPassword({
        validateStatus: 'success',
        errorMsg: '',
      });
    } else
      setErrorConfirmPassword({
        validateStatus: 'error',
        errorMsg: 'Password does not match, try again!',
      });
  };
  return (
    <Space direction="vertical" className="sign-form-ctn">
      <div className="sign__right__header">
        <h1>Get's started</h1>
        <p style={{ color: 'gray' }}>
          Already have an account?{' '}
          <span
            style={{ color: '#9b88ec', cursor: 'pointer', fontWeight: 'bold' }}
            onClick={() => {
              props.setState(true);
            }}
          >
            Sign in
          </span>
        </p>
      </div>
      <Form
        className="sign__right__form"
        layout="vertical"
        name="sign-up"
        autoComplete="off"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Username:"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input
            className="sign__right__form__username"
            size="large"
            placeholder="username"
            prefix={<UserOutlined />}
          />
        </Form.Item>
        <Form.Item
          label="Password:"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password
            size="large"
            placeholder="••••••••"
            prefix={<LockOutlined />}
            className="sign__right__form__password"
            onChange={(e) => {
              setPassword(e.target.value);
              setDisableConfirmPassword(false);
            }}
          />
        </Form.Item>
        <Form.Item
          label="Confirm password:"
          rules={[
            {
              required: true,
              message: 'Please input your confirm your password!',
            },
          ]}
          hasFeedback
          validateStatus={errorConfirmPassword.validateStatus}
          help={errorConfirmPassword.errorMsg}
          style={{ marginBottom: '24px' }}
        >
          <Input.Password
            size="large"
            placeholder="••••••••"
            prefix={<LockOutlined />}
            className="sign__right__form__password"
            onChange={(e) => handleConfirmPassword(e.target.value)}
            disabled={disableConfirmPassword}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            className="sign__right__form__btn-sign"
          >
            Sign up
          </Button>
        </Form.Item>
      </Form>
    </Space>
  );
};

export default Sign;
