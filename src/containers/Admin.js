import React, { useEffect, useState } from 'react';
import { Breadcrumb, Col, Menu, Row, Form, Input, Select } from 'antd';
import { UserOutlined, LaptopOutlined, VideoCameraOutlined } from '@ant-design/icons';
import ContentAddForm from '../components/ContentAddForm';

const { SubMenu } = Menu;

const Admin = (props) => {    
    const [selection, setSelection] = useState('1');    

    const handleSelection = value => {
        console.log(value.key);
        setSelection(value.key);
    }

    return (
        <div>
            <Breadcrumb style={{ padding: '16px' }}>
                <Breadcrumb.Item>
                    <a href="/">Нүүр</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    Админ
                </Breadcrumb.Item>
            </Breadcrumb> 
            <div className="main">
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={6}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={selection}
                            onSelect={handleSelection}
                            defaultOpenKeys={['movies']}
                            style={{ height: '100%' }}
                        >
                            <SubMenu key="movies" icon={<VideoCameraOutlined />} title="Кино">
                                <Menu.Item key="1">Кино нэмэх</Menu.Item>
                                <Menu.Item key="2">Кино засах/устгах</Menu.Item>                                
                            </SubMenu>
                            <SubMenu key="series" icon={<LaptopOutlined />} title="Цуврал">
                                <Menu.Item key="3">option3</Menu.Item>
                                <Menu.Item key="4">option4</Menu.Item>
                            </SubMenu>
                            <SubMenu key="artists" icon={<UserOutlined />} title="Уран бүтээлч">
                                <Menu.Item key="5">option5</Menu.Item>
                                <Menu.Item key="6">option6</Menu.Item>                                
                            </SubMenu>
                        </Menu>
                    </Col>
                    <Col xs={24} sm={24} md={18}>
                        { selection === '1' ? (
                            <div>
                                <h2>Кино нэмэх</h2>
                                <ContentAddForm />
                            </div>
                        ) : (
                            <div>
                                <h2>Кино засах</h2>
                            </div>
                        )}
                    </Col>                    
                </Row>
            </div>
        </div>
    );
};

export default Admin;