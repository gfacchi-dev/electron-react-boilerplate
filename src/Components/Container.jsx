import { Col, Menu, Row } from 'antd';
import React from 'react';
import { withRouter } from 'react-router';

const getSelectedKey = (location) => {
  const path = location.pathname.toLowerCase();
  const dict = {
    '/': '1',
    '/modello': '2',
  };
  return dict[path];
};

const handleRouting = (e, history) => {
  history.push(e.item.props.route);
};

const Container = ({ children, history, location }) => {
  return (
    <>
      <Row>
        <Col span={24}>
          <Menu
            onClick={(e) => handleRouting(e, history)}
            style={{ width: '100%' }}
            defaultSelectedKeys={[getSelectedKey(location)]}
            defaultOpenKeys={['1']}
            mode="horizontal"
          >
            <Menu.Item key="1" route="/">
              Homepage
            </Menu.Item>
            <Menu.Item key="2" route="/modello">
              Modello di Conformità
            </Menu.Item>
          </Menu>
        </Col>
      </Row>
      <Row style={{ padding: '15px' }}>
        <Col span={24}>{children}</Col>
      </Row>
    </>
  );
};

export default withRouter(Container);
