import { Modal, Space, Typography } from 'antd';
import { FC } from 'react';
import { SecurityScanTwoTone } from '@ant-design/icons';
import './ModalShareLink.scss';
import { useHistory, useLocation } from 'react-router';

const { Title, Text, Paragraph } = Typography;

export interface Props {
  visible: boolean;
  handleVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalShareLink: FC<Props> = (props) => {
  const { visible, handleVisible } = props;
  let location = useLocation();  

  return (
    <Modal
      className="modal-box"
      title={null}
      footer={null}
      width={400}
      visible={visible}
      onCancel={() => handleVisible(false)}
    >
      <Space direction="vertical" size="large">
        <Title level={5}>Your meeting's ready</Title>
        <Text>Share this meeting link with others you want in the meeting</Text>
        <div className="link-box">
          <Paragraph className="paragraph-link-box" copyable ellipsis>
            {location.pathname}
          </Paragraph>
        </div>
        <Space>
          <SecurityScanTwoTone className="icon-sercure" />
          <Text type="secondary" className="secondary-text">
            People who use this meeting link must get your permissions before
            they can join
          </Text>
        </Space>
      </Space>
    </Modal>
  );
};
export default ModalShareLink;
