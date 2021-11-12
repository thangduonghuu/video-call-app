import { Col, Row } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { selectuserInRoom } from "pages/Room/RoomSlice";
import { useAppSelector } from "app/hooks";
import { useSelector } from "react-redux";
import VideoCall from "features/videoCall/videoCall";

const Grid = ({ connectionPeerjs}: any) => {
  const dataGrid = useSelector(selectuserInRoom).MemberInRoom;

  return (
    <Row
      style={{ width: "100%", height: "100%", overflow: "auto" }}
      gutter={[16, 16]}
    >
      {dataGrid.map((video) => {
        if (video.idUser != localStorage.getItem("owner")) {
          return <VideoCall connectionPeerjs={connectionPeerjs}  CallTo={video.idUser} />;
        }
      })}
    </Row>
  );
};

export default Grid;
