import React from 'react';
import './CustomLayout.css';
import { Layout } from 'antd';
import CustomMenu from '../components/CustomMenu';
import { Link } from 'react-router-dom';

const { Header, Content, Footer } = Layout;

const CustomLayout = (props) => {

    return (
        <Layout>
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%', height: '64px', padding: '0px' }}>              
                <CustomMenu />
            </Header>
            <Content className="site-layout">
                {/* <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb> */}
                <div className="site-layout-background" style={{ margin: '16px 0', padding: 24, minHeight: 380 }}>
                    {props.children}
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Mollywood ©2020 Created by On Plus Development</Footer>
        </Layout>
    );
};

export default CustomLayout;