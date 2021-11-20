import { useAppDispatch } from "app/hooks";
import React, { useEffect, useRef, useState } from "react";
import { selectuserInRoom } from "pages/Room/RoomSlice";

const VideoCall = ({ connectionPeerjs, CallTo, nameId , MyVideoCall }: any) => {
  const MyVideo = React.useRef<any>();


  useEffect(() => {
    try {
   
          let call = connectionPeerjs.call(CallTo, MyVideoCall, {
            metadata: localStorage.getItem("owner"),
          });
          call.on("stream", (remoteStream: any) => {
            if (MyVideo.current != null) {
              MyVideo.current.srcObject = remoteStream;
            }
          });
    
    } catch (err) {
      console.log(err);
    }
  }, []);
  return <video className={nameId} ref={MyVideo} autoPlay></video>;
};

export default VideoCall;
// VideoCall
