import { Col, Row } from 'antd';
import React from 'react';

const Grid = () => {
  const dataGrid = [
    {
      video:
        'http://www.imgworlds.com/wp-content/uploads/2015/12/18-CONTACTUS-HEADER.jpg',
    },
    {
      video:
        'http://www.imgworlds.com/wp-content/uploads/2015/12/18-CONTACTUS-HEADER.jpg',
    },
    {
      video:
        'http://www.imgworlds.com/wp-content/uploads/2015/12/18-CONTACTUS-HEADER.jpg',
    },
    {
      video:
        'http://www.imgworlds.com/wp-content/uploads/2015/12/18-CONTACTUS-HEADER.jpg',
    },
    {
      video:
        'http://www.imgworlds.com/wp-content/uploads/2015/12/18-CONTACTUS-HEADER.jpg',
    },
  ];
  return (
    <Row
      style={{ width: '100%', height: '100%', overflow: 'auto' }}
      gutter={[16, 16]}
    >
      {dataGrid.map((video) => {
        if (dataGrid.length === 1) {
          return (
            <Col span={24}>
              <img src={video.video} alt="some" width="100%" />
            </Col>
          );
        } else if (dataGrid.length === 2) {
          return (
            <Col span={12}>
              <img src={video.video} alt="some" width="100%" />
            </Col>
          );
        } else if (dataGrid.length >= 3) {
          return (
            <Col span={8}>
              <img src={video.video} alt="some" width="100%" />
            </Col>
          );
        }
      })}
    </Row>
  );
};

export default Grid;
