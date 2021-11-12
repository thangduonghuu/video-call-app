import { Button } from "antd";
import React from "react";
import { VideoCameraAddOutlined } from "@ant-design/icons";
import "./CreateMeeting.scss";
import { RoomMeeting, Members } from "constants/RoomMeeting";
import { CreateAMeeting } from "pages/HomePage/HomePageSlice";
import { v4 as uuid_v4 } from "uuid";
import { useAppDispatch } from "app/hooks";
import { useHistory } from "react-router";
const CreateMeeting = ({ socketId }: any) => {
  const dispatch = useAppDispatch();
  const CreateRoomMeettiing = () => {
    let newRoom = uuid_v4();
    // console.log({ roomId: newRoom });

    // dispatch(createAroom({ socketId: socketId ,roomId : newRoom }));
    dispatch(CreateAMeeting({ roomId: newRoom }));
    // window.location.assign(`http://localhost:3000/MeetingRoom/${newRoom}`);
  };
  return (
    <Button
      onClick={CreateRoomMeettiing}
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
