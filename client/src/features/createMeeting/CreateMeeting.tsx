import { Button } from 'antd';
import React from 'react';
import { VideoCameraAddOutlined } from '@ant-design/icons';
import './CreateMeeting.scss';

const CreateMeeting = () => {
  return (
    <Button
      className="create-meeting-btn"
      type="primary"
      icon={<VideoCameraAddOutlined />}
      size="large"
    >
      New meeting
    </Button>
  );
};

export default CreateMeeting;
