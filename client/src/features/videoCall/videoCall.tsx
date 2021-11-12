import React, { useEffect, useRef, useState } from "react";
const VideoCall = ({ connectionPeerjs, CallTo }: any) => {
  const MyVideo = React.useRef<any>();
  function openStrem() {
    return navigator.mediaDevices.getUserMedia({ video: true });
  }
  useEffect(() => {
    connectionPeerjs.call(CallTo, (call: any) => {
        openStrem().then((stream) => {
        call.answer(stream);
        call.on("stream", (remoteStream: any) => {
          if (MyVideo.current != null) {
            MyVideo.current.srcObject = stream;
          }
        });
      });
    });
  }, []);
  return (
    <>
      <video ref={MyVideo} autoPlay></video>
    </>
  );
};

export default VideoCall;
// VideoCall
