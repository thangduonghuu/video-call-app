import React, { useEffect, useRef, useState } from "react";
const VideoCall = ({ connectionPeerjs, CallTo, nameId }: any) => {
  const MyVideo = React.useRef<any>();
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then(async (stream: any) => {
        // var videoOnly = new MediaStream(stream.getVideoTracks());
        let call = await connectionPeerjs.call(CallTo, stream, {
          metadata: localStorage.getItem("owner"),
        });

        call.on("stream", (remoteStream: any) => {
          if (MyVideo.current != null) {
            MyVideo.current.srcObject = remoteStream;
          }
        });
      });
  }, []);
  return <video className={nameId} ref={MyVideo} autoPlay></video>;
};

export default VideoCall;
// VideoCall
