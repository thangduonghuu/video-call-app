import { Button, Col, Layout, Row, Space, Tooltip, Typography } from "antd";
import Camera from "features/camera/Camera";
import Micro from "features/micro/Micro";
import Stop from "features/stop/Stop";
import React, { useEffect, useState } from "react";
import Peer from "peerjs";
import "./Room.scss";
import {
  TeamOutlined,
  MessageOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import Chat from "features/chat/Chat";
import Grid from "features/grid/Grid";
import { useAppDispatch, useAppSelector } from "app/hooks";
import {
  joinRoom,
  someOneJoinRoom,
  someOneDisconnect,
  selectuserInRoom,
  GetInfoUser,
} from "./RoomSlice";

import { useLocation } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
// import {   } from "pages/Room/RoomSlice";
const { Title, Text } = Typography;
// let peer = new Peer({
//   secure: true,
//   host: "mypeerserverjs.herokuapp.com",
//   port: 443,
// });
let peer = new Peer({
  host: "/",
  port: 3002,
});
// let socket = io("servervideocall.herokuapp.com");
let socket = io("http://localhost:4000");
const { Content, Header, Footer, Sider } = Layout;
const Room = () => {
  const dispatch = useAppDispatch();
  const memeberInroom = useAppSelector(selectuserInRoom);
  const [isHiddenSiderChatbox, setIsHiddenSiderChatbox] = useState(true);
  const [isHiddenSiderMember, setIsHiddenSiderMember] = useState(true);
  const currentURL = useLocation();

  useEffect(() => {
    dispatch(GetInfoUser({ owner: localStorage.getItem("owner") }));
    peer.on("open", async (id) => {
      await localStorage.setItem("peerid", id);
      await dispatch(
        joinRoom({
          username: localStorage.getItem("username"),
          socketInfo: socket,
          RoomId: currentURL.pathname.slice(13),
          peerId: id,
        })
      );
    });

    socket.on("SomeOneJoin", async (userOnlineInRoom: any) => {
      dispatch(someOneJoinRoom(userOnlineInRoom));
    });
    socket.on("someOneDisconnect", async (userOut: any) => {
      dispatch(
        someOneDisconnect({
          userDisconect: userOut.idUserDisconnect,
          userCurrent: userOut.usersCurrentInroom,
        })
      );
    });
  }, []);
  // console.log(peer);

  return (
    <div className="room-ctn">
      <Layout className="room">
        <Layout className="room__content">
          <Content className="room__content__grid">
            <Grid
              SocketRoom={socket}
              connectionPeerjs={peer}
              userAvater={memeberInroom}
            />
          </Content>
          <Sider
            className="room__content__sider "
            width={350}
            hidden={isHiddenSiderChatbox}
          >
            <Chat />
          </Sider>
          <Sider
            className="room__content__sider"
            width={350}
            hidden={isHiddenSiderMember}
          >
            member
            {/* {console.log(memeberInroom.MemberInRoom)} */}
            {memeberInroom.MemberInRoom &&
              memeberInroom.MemberInRoom.map((member: any) => {
                return <div> {member.username} </div>;
              })}
          </Sider>
        </Layout>
        <Footer className="room__footer">
          <Row>
            <Col span={8}></Col>
            <Col span={8} className="room__footer__middle">
              <Space size="large">
                <Tooltip title="Show member">
                  <Button
                    type="text"
                    icon={<TeamOutlined />}
                    shape="circle"
                    size="large"
                    onClick={() => setIsHiddenSiderMember(!isHiddenSiderMember)}
                  />
                </Tooltip>
                <Micro />
                <Stop />
                <Camera />
                <Tooltip title="Show chatbox">
                  <Button
                    type="text"
                    icon={<MessageOutlined />}
                    shape="circle"
                    size="large"
                    onClick={() =>
                      setIsHiddenSiderChatbox(!isHiddenSiderChatbox)
                    }
                  />
                </Tooltip>
              </Space>
            </Col>
            <Col span={8}></Col>
          </Row>
        </Footer>
      </Layout>
    </div>
  );
};

export default Room;
