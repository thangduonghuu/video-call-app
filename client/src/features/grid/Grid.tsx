import { Col, Row } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { selectuserInRoom } from "pages/Room/RoomSlice";
import { useAppSelector } from "app/hooks";
import { useSelector } from "react-redux";
import VideoCall from "features/videoCall/videoCall";

const Grid = ({ connectionPeerjs }: any) => {
  const dataGrid = useSelector(selectuserInRoom).MemberInRoom;
  useEffect(() => {
    connectionPeerjs.on("call", (call: any) => {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream: any) => {
          call.answer(stream);
          call.on("stream", (remoteStream: any) => {
            console.log(remoteStream);
            let videoTest = document.createElement("video");
            let videoGird = document.getElementById("video-grid");
            videoTest.srcObject = remoteStream;
            videoTest.addEventListener("loadedmetadata", () => {
              videoTest.play();
            });
            if (videoGird) {
              videoGird.append(videoTest);
            }
          });
        });
    });
  }, []);
  return (
    <Row
      style={{ width: "100%", height: "100%", overflow: "auto" }}
      gutter={[16, 16]}
    >
      <div id="video-grid">
        {dataGrid.length > 1 &&
          dataGrid.map((video) => {
            if (video.idUser != localStorage.getItem("owner")) {
              return (
                <VideoCall
                  connectionPeerjs={connectionPeerjs}
                  CallTo={video.peerId}
                />
              );
            }
          })}
      </div>
    </Row>
  );
};

export default Grid;
