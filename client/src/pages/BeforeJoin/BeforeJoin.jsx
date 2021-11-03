import { Avatar, Button, Col, Layout, Row, Space, Typography } from 'antd';
import React, { useState } from 'react';
import {
  AudioOutlined,
  VideoCameraOutlined,
  AudioMutedOutlined,
} from '@ant-design/icons';
import './BeforeJoin.scss';
import Micro from 'features/micro/Micro';
import Camera from 'features/camera/Camera';

const { Content, Header } = Layout;
const { Title } = Typography;

const BeforeJoin = () => {
  const [enableMic, setEnableMic] = useState(true);
  const [enableCam, setEnableCam] = useState(true);

  return (
    <>
      <Layout style={{ backgroundColor: 'white' }}>
        <Header style={{ backgroundColor: 'white' }}>
          <Row justify="space-between" align="middle">
            <Col>
              <Title level={3}>Chat app</Title>
            </Col>
            <Col>
              <Space size="middle">
                <Title level={5}>Alex Sander</Title>
                <Avatar
                  size="large"
                  style={{
                    backgroundColor: '#7265e6',
                    verticalAlign: 'middle',
                  }}
                >
                  Alex
                </Avatar>
              </Space>
            </Col>
          </Row>
        </Header>
        <Content>
          <Row
            justify="space-around"
            align="middle"
            style={{
              backgroundColor: 'white',
              height: '90vh',
              width: '80vw',
              margin: '0 auto',
            }}
          >
            <Col>
              <div class="video-box">
                <Micro />
                <Camera />
              </div>
            </Col>
            <Col>
              <Space
                direction="vertical"
                style={{ alignItems: 'center' }}
                size="middle"
              >
                <Title level={3}>Ready to join?</Title>
                <Space size="large" className="before-join__control">
                  <Button type="primary">Ask to join</Button>
                  <Button>Back</Button>
                </Space>
              </Space>
            </Col>
          </Row>
        </Content>
      </Layout>
    </>
  );
};

export default BeforeJoin;
