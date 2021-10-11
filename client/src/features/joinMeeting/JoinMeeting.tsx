import { Input, Space, Button, Form } from 'antd';
import React, { useState } from 'react';
import { LoginOutlined } from '@ant-design/icons';
import './JoinMeeting.scss';
const JoinMeeting = () => {
  const [isActive, setIsActive] = useState<Boolean>(false);

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Form
      className="join-meeting-form"
      name="join-code"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Space>
        <Form.Item name="code">
          <Input
            className="join-meeting-input"
            size="large"
            placeholder="Enter a code"
            bordered={false}
            prefix={<LoginOutlined />}
            onChange={(e) => {
              if (e.target.value) {
                setIsActive(true);
              } else {
                setIsActive(false);
              }
            }}
          />
        </Form.Item>
        <Form.Item>
          {isActive && (
            <Button
              htmlType="submit"
              type="text"
              size="large"
              className="join-meeting-btn"
            >
              Join
            </Button>
          )}
        </Form.Item>
      </Space>
    </Form>
  );
};

export default JoinMeeting;
