import React, { FC, useEffect } from 'react';
import './HomePage.scss';
import { Avatar, Layout, PageHeader, Space, Typography, Row, Col } from 'antd';
import Clock from 'react-live-clock';
import CreateMeeting from 'features/createMeeting/CreateMeeting';
import JoinMeeting from 'features/joinMeeting/JoinMeeting';
import Lottie from 'react-lottie';
import homePageIcon from 'lotties/home-page.json';
const { Header, Content } = Layout;
const { Title, Text } = Typography;

const HomePage = () => {
  return (
    <div className="home-page-container">
      <Layout className="home-page">
        <Header className="home-page__header">
          <PageHeader
            onBack={() => (window.location.href = '/welcome')}
            title="Meet"
            subTitle="Home page"
            extra={[
              <Space size="large">
                <Space>
                  <Title level={5} style={{ margin: '0px' }}>
                    <Clock
                      format={'MMMM Mo, YYYY • h:mm:ss A'}
                      ticking={true}
                    />
                  </Title>
                </Space>

                <Space>
                  <Avatar src="https://i.pinimg.com/originals/18/60/64/186064435781b1d78013dcb4ba9208a4.jpg" />
                  <Title level={5} style={{ margin: '0px' }}>
                    Rimuru
                  </Title>
                </Space>
              </Space>,
            ]}
          />
        </Header>
        <Content className="home-page__content">
          <Row>
            <Col className="home-page__content__col">
              <Space direction="vertical" size="large">
                <div className="home-page__content__col__text-ctn">
                  <Title>Premium video meetings. Now free for everyone.</Title>
                  <Text type="secondary">
                    We re-engineered the service we built for secure business
                    meetings, Meet, to make it free and available for all.
                  </Text>
                </div>
                <Space className="home-page__content__col__create">
                  <CreateMeeting />
                  <JoinMeeting />
                </Space>
              </Space>
            </Col>
            <Col className="home-page__content__col">
              <Icon />
            </Col>
          </Row>
        </Content>
      </Layout>
    </div>
  );
};

const Icon = () => {
  const signInIconOption = {
    loop: true,
    autoplay: true,
    animationData: homePageIcon,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <Space direction="vertical">
      <Lottie options={signInIconOption} height={450} width={450} />
    </Space>
  );
};

export default HomePage;