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
import { useAppDispatch } from "app/hooks";
import { joinRoom, someOneJoinRoom, someOneDisconnect } from "./RoomSlice";
import { useLocation } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
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
const Room = ({ SocketRoom }: any) => {
  const dispatch = useAppDispatch();
  const [isHiddenSiderChatbox, setIsHiddenSiderChatbox] = useState(true);
  const [isHiddenSiderMember, setIsHiddenSiderMember] = useState(true);
  const currentURL = useLocation();

  useEffect(() => {
    peer.on("open", (id) => {
      localStorage.setItem("peerid", id);

      dispatch(
        joinRoom({
          socketInfo: socket,
          RoomId: currentURL.pathname.slice(13),
          peerId: id,
        })
      );
    });
  }, []);
  // console.log(peer);
  socket.on("SomeOneJoin", async (userOnlineInRoom: any) => {
    dispatch(someOneJoinRoom(userOnlineInRoom));
  });
  socket.on("someOneDisconnect", async (userDisconect: any) => {
    dispatch(someOneDisconnect(userDisconect));
  });
  return (
    <div className="room-ctn">
      <Layout className="room">
        <Layout className="room__content">
          <Content className="room__content__grid">
            <Grid connectionPeerjs={peer} />
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
