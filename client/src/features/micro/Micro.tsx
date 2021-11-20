import { Button, Tooltip } from "antd";
import React, { useState } from "react";
import { AudioOutlined, AudioMutedOutlined } from "@ant-design/icons";
import {stopAudioButton} from "pages/Room/RoomSlice";
import { useAppDispatch, useAppSelector } from "app/hooks";
const Micro = () => {
  const dispatch = useAppDispatch();
  const [isDisabled, setIsDisabled] = useState<Boolean>(false);

  return (
    <>
      {!isDisabled ? (
        <Tooltip title="Turn off microphone">
          <Button
            shape="circle"
            type="text"
            icon={<AudioOutlined />}
            size="large"
            onClick={() => {setIsDisabled(true); dispatch(stopAudioButton())}}
          />
        </Tooltip>
      ) : (
        <Tooltip title="Turn on microphone">
          <Button
            shape="circle"
            danger
            type="primary"
            icon={<AudioMutedOutlined />}
            size="large"
            onClick={() => {setIsDisabled(false); dispatch(stopAudioButton())}}
          />
        </Tooltip>
      )}
    </>
  );
};

export default Micro;
