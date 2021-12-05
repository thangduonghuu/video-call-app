import { Col, Row } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import {
  selectuserInRoom,
  stopAudioOnly,
  stopVideoOnly,
} from 'pages/Room/RoomSlice';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useSelector } from 'react-redux';
import VideoCall from 'features/videoCall/videoCall';
import './Grid.scss';

const Grid = ({ SocketRoom, connectionPeerjs, userAvater }: any) => {
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
    openStrem(video, audio)
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
    connectionPeerjs.on('call', (call: any) => {
      call.answer(MyVideo.current.srcObject);
      call.on('stream', (remoteStream: any) => {
        let videoGird = document.getElementById('video-grid');
        let allvideo = document.querySelectorAll('video');
        if (document.getElementById(call.options.metadata) == undefined) {
          let videoTest = document.createElement('video');
          videoTest.id = call.options.metadata;
          videoTest.className = 'grid-container__video-tag';
          videoTest.srcObject = remoteStream;
          videoTest.autoplay = true;
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
      console.log('chua set up');
    }
  }, [audio]);

  useEffect(() => {
    try {
      dispatch(stopVideoOnly(MyVideo.current.srcObject));
      SocketRoom.emmit('close-video', localStorage.getItem('owner'));
    } catch (e) {}
  }, [video]);
  return (
    <div id="video-grid" className="grid-container">
      {device ? (
        <video
          className="grid-container__video-tag"
          ref={MyVideo}
          autoPlay
          muted
        ></video>
      ) : (
        <img width="100%" src={userAvater.avatarUrl} alt="avatar"></img>
      )}

      {dataGrid.length > 0 &&
        dataGrid.map((video) => {
          if (video.idUser != localStorage.getItem('owner')) {
            if (MyVideo.current.srcObject) {
              return (
                <>
                  {dataGrid.length + 1 <= 4 ? (
                    <VideoCall
                      MyVideoCall={MyVideo.current.srcObject}
                      nameId={video.idUser}
                      connectionPeerjs={connectionPeerjs}
                      CallTo={video.peerId}
                    />
                  ) : (
                    <VideoCall
                      MyVideoCall={MyVideo.current.srcObject}
                      nameId={video.idUser}
                      connectionPeerjs={connectionPeerjs}
                      CallTo={video.peerId}
                    />
                  )}
                </>
              );
            }
          }
        })}
    </div>
  );
};

export default Grid;
