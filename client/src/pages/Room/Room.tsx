import { Button, Col, Layout, Row, Space, Tooltip, Typography } from 'antd';
import Camera from 'features/camera/Camera';
import Micro from 'features/micro/Micro';
import Stop from 'features/stop/Stop';
import React, { useState } from 'react';
import './Room.scss';
import {
  TeamOutlined,
  MessageOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import Chat from 'features/chat/Chat';
import Grid from 'features/grid/Grid';


const { Title, Text } = Typography;
const { Content, Header, Footer, Sider } = Layout;
const Room = () => {
  const [isHiddenSiderChatbox, setIsHiddenSiderChatbox] = useState(true);
  const [isHiddenSiderMember, setIsHiddenSiderMember] = useState(true);

  return (
    <div className="room-ctn">
      <Layout className="room">
        <Layout className="room__content">
          <Content className="room__content__grid">
            <Grid />
            
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
