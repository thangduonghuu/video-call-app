import { Col, Row, Space } from 'antd';
import Lottie from 'react-lottie';
import SignInIcon from 'lotties/sign-in.json';
import { FC, useState } from 'react';
import SignUp from 'features/signUp/SignUp';
import SignIn from 'features/signIn/SignIn';
import './Sign.scss'
const Sign = () => {
  const [isShowSignIn, setIsShowSignIn] = useState(true);

  return (
    <div className="sign-container">
      <div className="sign">
        <Row>
          <Col span={12}>
            <div className="sign__left">
              <PanelSignIn state={isShowSignIn} />
              {!isShowSignIn && <SignUp setState={setIsShowSignIn} />}
            </div>
          </Col>
          <Col span={12}>
            <div className="sign__right">
              {isShowSignIn && <SignIn setState={setIsShowSignIn} />}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

const PanelSignIn: FC<{ state: boolean }> = (props) => {
  const signInIconOption = {
    loop: true,
    autoplay: true,
    animationData: SignInIcon,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <Space
      direction="vertical"
      className={props.state ? 'panel panel--left' : 'panel panel--right'}
    >
      <Lottie options={signInIconOption} height={450} width={450} />
      <div
        style={{
          width: '250px',
          margin: ' 0 auto',
          textAlign: 'center',
        }}
      >
        <h2 style={{ color: 'white' }}>
          Start for free and get attractive features
        </h2>
      </div>
    </Space>
  );
};

export default Sign;
