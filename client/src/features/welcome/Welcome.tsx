import React, { useEffect, useState } from 'react';
import './Welcome.scss';
import videoCallIcon from 'lotties/video-call.json';
import Lottie from 'react-lottie';
import { Row, Col, Space, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const Welcome = () => {
  const videoCallIconOption = {
    loop: true,
    autoplay: true,
    animationData: videoCallIcon,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const [loading, setLoading] = useState<boolean>(false);

  const outLoading = () => {
    setLoading(true);
  };
  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        window.location.href = 'http://localhost:3000/sign';
      }, 600);
    }
  }, [loading]);

  return (
    <div className="welcome-container">
      <Spin
        className="spin"
        spinning={loading}
        delay={500}
        indicator={<LoadingOutlined style={{ fontSize: '100px' }} />}
      >
        <Row>
          <Col span={12}>
            <div className="welcome-content-container">
              <Space direction="vertical">
                <h1 style={{ color: 'white' }} className="welcome__title">
                  Great Meetings Are Just The Beginning
                </h1>
                <p style={{ color: 'gray' }} className="welcome__dec">
                  We help your team build great meeting habits through
                  collaborative agendas and easy-to-schedule meetings
                </p>
                <Space className="welcome__controller" size="large">
                  <button
                    className="welcome__controller__btn welcome__controller__btn"
                    onClick={() => {
                      outLoading();
                    }}
                  >
                    Start Today!
                  </button>
                </Space>
              </Space>
            </div>
          </Col>
          <Col span={12}>
            <div className="welcome-content-container">
              <Lottie options={videoCallIconOption} height={800} width={800} />
            </div>
          </Col>
        </Row>
      </Spin>
    </div>
  );
};

export default Welcome;
