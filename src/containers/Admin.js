import React, { useEffect, useState } from 'react';
import { Breadcrumb, Col, Menu, Row, Form, Input, Select } from 'antd';
import { UserOutlined, LaptopOutlined, VideoCameraOutlined } from '@ant-design/icons';
import ContentAddForm from '../components/ContentAddForm';
import ContentUpdateForm from '../components/ContentUpdateForm';
import ArtistAddForm from '../components/ArtistAddForm';
import ArtistUpdateForm from '../components/ArtistUpdateForm';

const { SubMenu } = Menu;
const { Option } = Select;

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
                                <Menu.Item key="3">Цуврал нэмэх</Menu.Item>
                                <Menu.Item key="4">Цуврал засах/устгах</Menu.Item>
                            </SubMenu>
                            <SubMenu key="artists" icon={<UserOutlined />} title="Уран бүтээлч">
                                <Menu.Item key="5">Уран бүтээлч нэмэх</Menu.Item>
                                <Menu.Item key="6">Уран бүтээлч засах/устгах</Menu.Item>                                
                            </SubMenu>
                        </Menu>
                    </Col>
                    <Col xs={24} sm={24} md={18}>
                        { selection === '1' ? (
                            <div>
                                <h2>Кино нэмэх</h2>
                                <ContentAddForm />
                            </div>
                        ) : selection === '2' ? (
                            <div>
                                <h2>Кино засах/устгах</h2>
                                <ContentUpdateForm />                                
                            </div>
                        ) : selection === '5' ? (
                            <div>
                                <h2>Уран бүтээлч нэмэх</h2>
                                <ArtistAddForm />
                            </div>
                        ) : selection === '6' ? (
                            <div>
                                <h2>Уран бүтээлч засах/устгах</h2>
                                <ArtistUpdateForm />
                            </div>
                        ) : (
                            <>
                            </>
                        )}
                    </Col>                    
                </Row>
            </div>
        </div>
    );
};

export default Admin;