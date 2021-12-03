import {
  Button,
  Col,
  Layout,
  Row,
  Space,
  Tooltip,
  Typography,
  message,
  List,
  Avatar,
} from "antd";
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
  UserDeleteOutlined,
  UserAddOutlined,
  UserOutlined,
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

import { useLocation, useHistory } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import ModalShareLink from "components/ModalShareLink/ModalShareLink";
// import {   } from "pages/Room/RoomSlice";
const { Title, Text } = Typography;
// let peer = new Peer({
//   secure: true,
//   host: 'mypeerserverjs.herokuapp.com',
//   port: 443,
// });
let peer = new Peer({
  host: "/",
  port: 3002,
});
// let socket = io('servervideocall.herokuapp.com');
let socket = io("http://localhost:4000");
const { Content, Header, Footer, Sider } = Layout;
const Room = () => {
  const dispatch = useAppDispatch();
  const memeberInroom = useAppSelector(selectuserInRoom);
  const [isVisibleModalShareLink, setIsVisibleModalShareLink] = useState(false);
  const [isHiddenSiderMember, setIsHiddenSiderMember] = useState(true);
  const currentURL = useLocation();

  useEffect(() => {
    dispatch(GetInfoUser({ owner: localStorage.getItem("owner") }));
    peer.on("open", async (id) => {
      await localStorage.setItem("peerid", id);
      localStorage.setItem("currentRoom", currentURL.pathname.slice(13));
      socket.emit("join_room", {
        username: localStorage.getItem("username"),
        room_id: currentURL.pathname.slice(13),
        ownerId: localStorage.getItem("owner"),
        peerId: id,
        avatar: localStorage.getItem("avatar"),
      });
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
    socket.on("newUserJoin", (data: any) => {
      message.info(data.message);
    });
    socket.on('SomeOneCloseCamara' , async (data: any) => {
      
    })
  }, []);
  
  let history = useHistory();

  const exitRoom = () => {
    message.loading('Loading...', 0.2);
    setTimeout(() => {
      history.push('/home');
    }, 500)
  }

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
            className="room__content__sider"
            width={350}
            hidden={isHiddenSiderMember}
          >
            <Space
              size="large"
              direction="vertical"
              className="room__content__sider__space-list"
            >
              <Title level={3}>Member</Title>
              <List
                itemLayout="horizontal"
                dataSource={memeberInroom.MemberInRoom}
                renderItem={(item: any) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar src={item.avatar} icon={<UserOutlined />} />
                      }
                      title={
                        <>
                          <b style={{ margin: "0px" }}>{item.username}</b>
                          <Tooltip title="Kick this user">
                            <Button
                              danger
                              type="link"
                              shape={"circle"}
                              icon={<UserDeleteOutlined />}
                            />
                          </Tooltip>
                        </>
                      }
                    />
                  </List.Item>
                )}
              />
            </Space>
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
                <Stop exit={exitRoom} />
                <Camera socket={socket} />
                <Tooltip title="Share this room">
                  <Button
                    type="text"
                    icon={<UserAddOutlined />}
                    shape="circle"
                    size="large"
                    onClick={() => setIsVisibleModalShareLink(true)}
                  />
                  <ModalShareLink
                    visible={isVisibleModalShareLink}
                    handleVisible={setIsVisibleModalShareLink}
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
