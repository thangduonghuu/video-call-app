import { Col, Row } from "antd";
import React, { useEffect, useRef, useState } from "react";
import {
  selectuserInRoom,
  stopAudioOnly,
  stopVideoOnly,
} from "pages/Room/RoomSlice";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { useSelector } from "react-redux";
import VideoCall from "features/videoCall/videoCall";

const Grid = ({ connectionPeerjs, userAvater }: any) => {
  const dataGrid = useSelector(selectuserInRoom).MemberInRoom;
  const MyVideo = React.useRef<any>();
  const dispatch = useAppDispatch();
  const [device, setdevice] = useState(true);
  const audio = useSelector(selectuserInRoom).audio;
  const video = useSelector(selectuserInRoom).video;
  // stop both mic and camera

  function openStrem(videoValue: boolean, audioValue: boolean) {
    return navigator.mediaDevices.getUserMedia({
      video: videoValue,
      audio: audioValue,
    });
  }
  useEffect(() => {
    openStrem(true, true)
      .then(async (stream) => {
        if (MyVideo.current != null) {
          MyVideo.current.srcObject = stream;
        }
      })
      .catch((error) => {
        if (error) {
          setdevice(false);
        }
      });
    connectionPeerjs.on("call", (call: any) => {
      call.answer(MyVideo.current.srcObject);
      call.on("stream", (remoteStream: any) => {
        // console.log(document.getElementsByClassName(call.options.metadata)[0]);
        if (document.getElementsByClassName(call.options.metadata)[0] == undefined) {
          let videoTest = document.createElement("video");

          videoTest.className = call.options.metadata;
          let videoGird = document.getElementById("video-grid");
          videoTest.srcObject = remoteStream;
          videoTest.addEventListener("loadedmetadata", () => {
            videoTest.play();
          });
          if (videoGird) {
            videoGird.append(videoTest);
          }
        }
      });
    });
  }, []);
  useEffect(() => {
    try {
      dispatch(stopAudioOnly(MyVideo.current.srcObject));
    } catch (e) {
      console.log("chua set up");
    }
  }, [audio]);
  useEffect(() => {
    try {
      dispatch(stopVideoOnly(MyVideo.current.srcObject));
    } catch (e) {}
  }, [video]);
  return (
    <Row
      style={{ width: "100%", height: "100%", overflow: "auto" }}
      gutter={[16, 16]}
    >
      <div id="video-grid">
        {device ? (
          <video ref={MyVideo} autoPlay></video>
        ) : (
          <div>
            <img src={userAvater.avatarUrl} width="400px"></img>
          </div>
        )}
        {dataGrid.length > 0 &&
          dataGrid.map((video) => {
            if (video.idUser != localStorage.getItem("owner")) {
              if (MyVideo.current.srcObject) {
                return (
                  <VideoCall
                    MyVideoCall={MyVideo.current.srcObject}
                    nameId={video.idUser}
                    connectionPeerjs={connectionPeerjs}
                    CallTo={video.peerId}
                  />
                );
              }
            }
          })}
      </div>
    </Row>
  );
};

export default Grid;
