import { Button, Tooltip } from 'antd';
import React, { useState } from 'react';
import { VideoCameraOutlined } from '@ant-design/icons';

const Camera = () => {
  const [isDisabled, setIsDisabled] = useState<Boolean>(false);

  return (
    <>
      {!isDisabled ? (
        <Tooltip title="Turn off camera">
          <Button
            shape="circle"
            type="text"
            icon={<VideoCameraOutlined />}
            size="large"
            onClick={() => setIsDisabled(true)}
          />
        </Tooltip>
      ) : (
        <Tooltip title="Turn on camera">
          <Button
            shape="circle"
            danger
            type="primary"
            icon={<VideoCameraOutlined />}
            size="large"
            onClick={() => setIsDisabled(false)}
          />
        </Tooltip>
      )}
    </>
  );
};

export default Camera;
