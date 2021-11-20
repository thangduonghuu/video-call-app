import { Button, Tooltip } from "antd";
import React, { useState } from "react";
import { VideoCameraOutlined } from "@ant-design/icons";
import { stopVideoButton } from "pages/Room/RoomSlice";
import { useAppDispatch } from "app/hooks";

const Camera = () => {
  const dispatch = useAppDispatch();
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
            onClick={() => {
              setIsDisabled(true);
              dispatch(stopVideoButton());
            }}
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
            onClick={() => {
              setIsDisabled(false);
              dispatch(stopVideoButton());
            }}
          />
        </Tooltip>
      )}
    </>
  );
};

export default Camera;
