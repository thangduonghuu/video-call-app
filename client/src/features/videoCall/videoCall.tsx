import React, { useEffect, useRef, useState } from "react";
const VideoCall = ({ connectionPeerjs, CallTo }: any) => {
  const MyVideo = React.useRef<any>();
  function openStrem() {
    return navigator.mediaDevices.getUserMedia({ video: true });
  }
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(async (stream) => {
        let call = await connectionPeerjs.call(CallTo, stream);
        console.log(connectionPeerjs.call(CallTo, stream));

        call.on("stream", (remoteStream: any) => {
          console.log(remoteStream);

          if (MyVideo.current != null) {
            MyVideo.current.srcObject = remoteStream;
          }
        });
      });

    // console.log(connectionPeerjs);
    // console.log(CallTo);
  }, []);
  return (
    <>
      <video ref={MyVideo} autoPlay></video>
    </>
  );
};

export default VideoCall;
// VideoCall
