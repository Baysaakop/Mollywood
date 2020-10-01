import React, { useState } from 'react';
import { Menu, Grid, Button, Form, Input, Checkbox } from 'antd';
import { SearchOutlined, BellOutlined, GlobalOutlined, MenuOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './CustomMenu.css';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import Logo from './Logo';
import Modal from 'antd/lib/modal/Modal';

const { useBreakpoint } = Grid;
const { SubMenu } = Menu;

const CustomMenu = (props) => {
    const [current, setCurrent] = useState('');
    const [collapsed, setCollapsed] = useState(true);
    const [signInVisible, setSignInVisible] = useState(false);    

    const showSignInModal = () => {
        setSignInVisible(true);
    }

    const hideSignInModal = () => {
        setSignInVisible(false);
    }
 
    const handleMenuClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    const handleMenuCollapsed = () => {
        setCollapsed(!collapsed);
    }

    const screens = useBreakpoint();                         

    return (                
        <div>
            <div className="logo">
                <Logo />              
                <Link to="/">                    
                    <div className="logoText" key="home" onClick={handleMenuClick}>MOLLYWOOD</div>
                </Link>
            </div>  
            {screens.xs ? (
                <div>
                    <Button type="primary" onClick={handleMenuCollapsed} style={{ float: 'right', margin: '16px 16px' }}>
                        <MenuOutlined />
                    </Button>
                    <Menu 
                        theme="dark" 
                        onClick={handleMenuClick} 
                        selectedKeys={[current]} 
                        // style={{ width: '100%', padding: '0px 64px 0px 0px'}}                
                        mode="inline"
                        hidden={collapsed}                        
                    >                                      
                        <Menu.Item key="movies">
                            <Link to="/movies">КИНО</Link>
                        </Menu.Item>
                        <Menu.Item key="series">
                            <Link to="/series">ЦУВРАЛ</Link>
                        </Menu.Item>
                        <Menu.Item key="artists">
                            <Link to="/artists">УРАН БҮТЭЭЛЧ</Link>
                        </Menu.Item>
                        <Menu.Item key="blogs">
                            <Link to="/blogs">БЛОГ</Link>
                        </Menu.Item>        
                        <Menu.Item key="search">                   
                            ХАЙХ 
                        </Menu.Item>  
                        <Menu.Item key="notification">          
                            МЭДЭГДЭЛ      
                        </Menu.Item>  
                        <Menu.Item key="language">          
                            ХЭЛ       
                        </Menu.Item>  
                        <Menu.Item key="signin" onClick={showSignInModal}>
                            НЭВТРЭХ
                        </Menu.Item>                                                                                                             
                    </Menu>
                </div>
            ) : (
                <div>
                    <Menu 
                        theme="dark" 
                        onClick={handleMenuClick} 
                        selectedKeys={[current]} 
                        style={{ width: '100%', padding: '0px 64px 0px 0px'}}                
                        mode="horizontal"                  
                    >                
                        <Menu.Item key="movies">
                            <Link to="/movies">КИНО</Link>
                        </Menu.Item>
                        <Menu.Item key="series">
                            <Link to="/series">ЦУВРАЛ</Link>
                        </Menu.Item>
                        <Menu.Item key="artists">
                            <Link to="/artists">УРАН БҮТЭЭЛЧ</Link>
                        </Menu.Item>
                        <Menu.Item key="blogs">
                            <Link to="/blogs">БЛОГ</Link>
                        </Menu.Item>        
                        <Menu.Item key="signin" style={{ float: 'right' }} onClick={showSignInModal}>
                            НЭВТРЭХ
                        </Menu.Item>      
                        <Menu.Item key="language" style={{ float: 'right' }}>          
                            <GlobalOutlined style={{ fontSize: '20px' }} />          
                        </Menu.Item>     
                        {/* <Menu.Item key="notification" style={{ float: 'right' }}>          
                            <BellOutlined style={{ fontSize: '20px' }} />          
                        </Menu.Item>   */}
                        <Menu.Item key="search" style={{ float: 'right' }}>          
                            <SearchOutlined style={{ fontSize: '20px' }} />          
                        </Menu.Item>               
                    </Menu>                                      
                </div>
            )}
            <Modal
                title="Нэвтрэх"              
                visible={signInVisible}       
                onCancel={hideSignInModal}
                footer={null}                       
            >
                <SignInForm />
            </Modal>  
        </div>            
    );
};

export default CustomMenu;