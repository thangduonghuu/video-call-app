import { useAppDispatch } from 'app/hooks';
import React, { useEffect, useRef, useState } from 'react';
import { selectuserInRoom } from 'pages/Room/RoomSlice';

const VideoCall = ({ connectionPeerjs, CallTo, nameId, MyVideoCall, styles }: any) => {
  const MyVideo = React.useRef<any>();

  useEffect(() => {
    try {
      let videoGird = document.getElementById('video-grid');
      if (videoGird) {
        videoGird.classList.remove(nameId);
      }
      let call = connectionPeerjs.call(CallTo, MyVideoCall, {
        metadata: localStorage.getItem('owner'),
      });
      // if()
      // console.log(document.getElementsByClassName(nameId));

      call.on('stream', (remoteStream: any) => {
        if (MyVideo.current != null) {
          MyVideo.current.srcObject = remoteStream;
        }
      });
    } catch (err) {}
  }, []);
  return (
    <video
      style={styles}
      className={nameId}
      ref={MyVideo}
      autoPlay
      muted
    ></video>
  );
};

export default VideoCall;
// VideoCall
