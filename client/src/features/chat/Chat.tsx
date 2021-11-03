import { Button, Layout, Space, Typography, Form, Input } from 'antd';

import React from 'react';
import { CloseOutlined, SendOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Content, Header, Footer } = Layout;
const Chat = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  return (
    <>
      <Layout>
        <Header style={{ backgroundColor: 'white', padding: '0' }}>
          <Space style={{ justifyContent: 'space-between', width: '100%' }}>
            <Title level={4}>In-call messages</Title>
            <Button type="text" shape="circle" icon={<CloseOutlined />} />
          </Space>
        </Header>
        <Content style={{ width: '100%', height: '100%' }}>
          <Layout>
            <Content style={{ width: '100%', height: '620px', backgroundColor: 'white' }}></Content>
            <Footer style={{ width: '100%', height: '20%', backgroundColor: 'white', padding: '1rem 0' }}>
              <Form onFinish={onFinish} autoComplete="off" name="chat">
                <Space>
                  <Form.Item name="textLine">
                    <Input placeholder="Text here..." bordered={false} 
                    style={{backgroundColor: '#eee', borderRadius: '1.15rem', width: '280px', height: '40px'}}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      htmlType="submit"
                      type="text"
                      shape="circle"
                      icon={<SendOutlined />}
                    />
                  </Form.Item>
                </Space>
              </Form>
            </Footer>
          </Layout>
        </Content>
      </Layout>
    </>
  );
};

export default Chat;
