import { Button, Tooltip } from 'antd';
import React, { FC, useState } from 'react';
import { PoweroffOutlined } from '@ant-design/icons';

const Stop: FC<{ exit: () => void }> = ({ exit }) => {
  return (
    <>
      <Tooltip title="Stop video call">
        <Button
          onClick={() => exit()}
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
