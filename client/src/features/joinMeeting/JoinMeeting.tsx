import { Input, Space, Button } from 'antd';
import React, { useState } from 'react';
import { LoginOutlined } from '@ant-design/icons';
import './JoinMeeting.scss';
const JoinMeeting = () => {
  const [isActive, setIsActive] = useState<Boolean>(false);

  return (
    <Space>
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
      {isActive && (
        <Button type="text" size="large" className="join-meeting-btn">
          Join
        </Button>
      )}
    </Space>
  );
};

export default JoinMeeting;
