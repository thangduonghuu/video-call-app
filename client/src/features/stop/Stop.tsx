import { Button, Tooltip } from 'antd';
import React, { useState } from 'react';
import { PoweroffOutlined } from '@ant-design/icons';

const Stop = () => {
  return (
    <>
      <Tooltip title="Stop video call">
        <Button
          shape="circle"
          type="primary"
          danger
          icon={<PoweroffOutlined />}
          size="large"
        />
      </Tooltip>
    </>
  );
};

export default Stop;
