import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Input, Space, Form, Button } from 'antd';
import { FC, useState } from 'react';

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
const SignUp: FC<{
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

export default SignUp;
