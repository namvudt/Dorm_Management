import React from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined, HomeOutlined } from '@ant-design/icons';
import AccountManagement from '../components/AccountManagement';

const { Header, Sider, Content } = Layout;

const SuperAdminDashboard = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ padding: 0, background: '#fff' }}>
        <div style={{ padding: '0 24px', fontSize: '20px', fontWeight: 'bold' }}>
          Hệ thống quản lý ký túc xá
        </div>
      </Header>
      <Layout>
        <Sider width={200} style={{ background: '#fff' }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['accounts']}
            style={{ height: '100%', borderRight: 0 }}
          >
            <Menu.Item key="accounts" icon={<UserOutlined />}>
              Quản lý tài khoản
            </Menu.Item>
            <Menu.Item key="rooms" icon={<HomeOutlined />}>
              Quản lý phòng
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: '#fff',
            }}
          >
            <AccountManagement />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default SuperAdminDashboard; 