import { Input, Space, Form, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { FC, useEffect } from 'react';
import { useAppDispatch } from 'app/hooks';
import { signIn , CheckLoginUser } from './signInSlice';

const SignIn: FC<{
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}> = (props) => {
  const dispatch = useAppDispatch();
  

  useEffect(() => {
    dispatch(CheckLoginUser())
  },[])

  const onFinish = (values: any) => {
    dispatch(signIn(values));
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

export default SignIn;
