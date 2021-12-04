import React, { FC, useEffect, useState } from "react";
import "./HomePage.scss";
import {
  Avatar,
  Layout,
  PageHeader,
  Space,
  Typography,
  Row,
  Col,
  Modal,
  Upload,
  message,
  Button,
  List,
  Badge,
} from "antd";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import Clock from "react-live-clock";
import CreateMeeting from "features/createMeeting/CreateMeeting";
import JoinMeeting from "features/joinMeeting/JoinMeeting";
import Lottie from "react-lottie";
import homePageIcon from "lotties/home-page.json";
import { accountApi } from "api/accountApi";
import {
  GetInfoUser,
  selectHomePageUser,
  createAroom,
  uploadAvatar,
  ListAllMeeting,
} from "./HomePageSlice";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { Room } from "constants/AccountType";
import { useHistory } from "react-router";
const { Header, Content } = Layout;
const { Title, Text } = Typography;

function getBase64(img: any, callback: any) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file: any) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}

const HomePage = ({ SocketRoom }: any) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(GetInfoUser({ owner: localStorage.getItem("owner") }));
    dispatch(ListAllMeeting({ owner: localStorage.getItem("owner") }));
  }, []);
  let UserInfo = useAppSelector(selectHomePageUser);

  // -> upload file
  const [visibleModalUpload, setVisibleModalUpload] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [imgSrc, setImgSrc] = useState<any>();
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Select file image .png/.jpeg </div>
    </div>
  );

  const handleChange = (info: any) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      console.log(info);
      getBase64(info.file.originFileObj, (imageUrl: any) => {
        setImgSrc(imageUrl);
        dispatch(uploadAvatar(imageUrl));
        setLoading(false);
      });
    }
  };

  const dummyRequest = ({ file, onSuccess }: any) => {
    let data = new FormData();
    data.append("file", file);
    data.append("owners", localStorage.getItem("owner") || "");
    accountApi.updateImage(data);
    setTimeout(() => {
      onSuccess("ok");
    }, 500);
  };

  // -> list room
  let history = useHistory();
  const rooms: Array<Room> = useAppSelector((state) => state.HomePage.rooms);
  const handleJoinRoom = (name: string) => {
    history.push(`/MeetingRoom/${name}`);
  };
  console.log(rooms);

  return (
    <div className="home-page-container">
      <Layout className="home-page">
        <Header className="home-page__header">
          <PageHeader
            onBack={() => (window.location.href = "/welcome")}
            title="Meet"
            subTitle="Home page"
            extra={[
              <Space size="large">
                <Space>
                  <Title level={5} style={{ margin: "0px" }}>
                    <Clock
                      format={"MMMM Mo, YYYY • h:mm:ss A"}
                      ticking={true}
                    />
                  </Title>
                </Space>
                <Modal
                  width={450}
                  visible={visibleModalUpload}
                  title="Upload avatar"
                  onCancel={() => setVisibleModalUpload(false)}
                  footer={[]}
                  className="modal-upload-img"
                >
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                    customRequest={dummyRequest}
                  >
                    {imgSrc ? (
                      <img src={imgSrc} alt="avatar" height="400" width="400" />
                    ) : (
                      uploadButton
                    )}
                  </Upload>
                </Modal>
                <Space>
                  <Button
                    style={{ padding: 0, margin: 0 }}
                    type="link"
                    onClick={() => setVisibleModalUpload(true)}
                  >
                    <Avatar src={UserInfo.avatarUrl} />
                  </Button>
                  <Title level={5} style={{ margin: "0px" }}>
                    {UserInfo.username}
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
                  <CreateMeeting socketId={SocketRoom} />
                  <JoinMeeting />
                </Space>
              </Space>
            </Col>
            <Col className="home-page__content__col">
              {!rooms ? (
                <Icon />
              ) : (
                <Space
                  direction="vertical"
                  size="large"
                  className="home-page__content__col__list-rooms"
                >
                  {rooms.map((item) => {
                    return (
                      <div
                        className="home-page__content__col__list-rooms__room"
                        onClick={() => handleJoinRoom(item.name)}
                      >
                        <b>{item.name}</b>
                        <Badge status="success" text="Available" />
                      </div>
                    );
                  })}
                </Space>
              )}
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
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <Space direction="vertical">
      <Lottie options={signInIconOption} height={450} width={450} />
    </Space>
  );
};

export default HomePage;
