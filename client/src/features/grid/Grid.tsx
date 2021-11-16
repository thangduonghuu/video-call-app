import { Col, Row } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { selectuserInRoom } from "pages/Room/RoomSlice";
import { useAppSelector } from "app/hooks";
import { useSelector } from "react-redux";
import VideoCall from "features/videoCall/videoCall";

const Grid = ({ connectionPeerjs }: any) => {
  const dataGrid = useSelector(selectuserInRoom).MemberInRoom;
  const MyVideo = React.useRef<any>();
  function openStrem() {
    return navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  }
  useEffect(() => {
    openStrem().then(async (stream) => {
      if (MyVideo.current != null) {
        MyVideo.current.srcObject = stream;
      }
    });

    connectionPeerjs.on("call", (call: any) => {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream: any) => {
          // loc am thanh
          var videoOnly = new MediaStream(stream.getVideoTracks());
          
          call.answer(videoOnly);
          call.on("stream", (remoteStream: any) => {
            let videoTest = document.createElement("video");
            videoTest.className = call.options.metadata;
            // console.log();
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
        {/* {console.log(dataGrid)} */}
        <video ref={MyVideo} autoPlay></video>
        {dataGrid.length > 0 &&
          dataGrid.map((video) => {
            if (video.idUser != localStorage.getItem("owner")) {
              return (
                <VideoCall
                  nameId={video.idUser}
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
