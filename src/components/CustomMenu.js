import React, { useState } from 'react';
import { Menu, Grid, Button, message } from 'antd';
import { SearchOutlined, GlobalOutlined, MenuOutlined, UserOutlined, FileOutlined, VideoCameraOutlined, LaptopOutlined, TeamOutlined, ReadOutlined, EditOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import '../css/CustomMenu.css';
import SignInForm from '../user/SignInForm';
import Logo from './Logo';
import Modal from 'antd/lib/modal/Modal';
import { auth } from '../firebase/firebase.utils';
import SignUpForm from '../user/SignUpForm';
import Avatar from 'antd/lib/avatar/avatar';

const { useBreakpoint } = Grid;
const { SubMenu } = Menu;

const CustomMenu = (props) => {
    const [current, setCurrent] = useState('');
    const [collapsed, setCollapsed] = useState(true);  
    const [modal, setModal] = useState('');
 
    const handleMenuClick = (e) => {        
        setCurrent(e.key);
    };

    const handleMenuCollapsed = () => {
        setCollapsed(!collapsed);
    }

    const hideModal = () => {
        setModal('');
    }

    const handleSignInClick = () => {
        setModal('signin');
    }

    const handleSignUpClick = () => {        
        setModal('signup');
    }

    const handleSignOutClick = () => {        
        auth.signOut()                
    };

    const changeModal = (value) => {        
        setModal(value);
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
                        <Menu.Item key="movies" icon={<VideoCameraOutlined />}>
                            <Link to="/movies">КИНО</Link>
                        </Menu.Item>
                        <Menu.Item key="series" icon={<LaptopOutlined />}>
                            <Link to="/series">ЦУВРАЛ</Link>
                        </Menu.Item>
                        <Menu.Item key="artists" icon={<TeamOutlined />}>
                            <Link to="/artists">УРАН БҮТЭЭЛЧ</Link>
                        </Menu.Item>
                        <Menu.Item key="blogs" icon={<ReadOutlined />}>
                            <Link to="/blogs">БЛОГ</Link>
                        </Menu.Item>        
                        <Menu.Item key="search" icon={<SearchOutlined />}>          
                            ХАЙЛТ          
                        </Menu.Item>          
                        { 
                        props.currentUser ? 
                            <SubMenu key="usermenu" icon={<UserOutlined />} title={props.currentUser.displayName}>
                                <Menu.Item key="profile">
                                    Хэрэглэгчийн мэдээлэл
                                </Menu.Item>
                                <Menu.Item key="admin">
                                    <Link to="/admin">Админ цонх</Link>
                                </Menu.Item> 
                                <Menu.Item key="signout" onClick={handleSignOutClick}>
                                    Системээс гарах
                                </Menu.Item>
                            </SubMenu>
                        :
                            <>
                                <Menu.Item key="signin" icon={<UserOutlined />} onClick={handleSignInClick}>
                                    НЭВТРЭХ
                                </Menu.Item>     
                                <Menu.Item key="signup" icon={<EditOutlined />} onClick={handleSignUpClick}>
                                    БҮРТГҮҮЛЭХ
                                </Menu.Item>                                                           
                            </>
                        }                                                                                                                                                                                                   
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
                        <Menu.Item key="movies" icon={<VideoCameraOutlined />}>
                            <Link to="/movies">КИНО</Link>
                        </Menu.Item>
                        <Menu.Item key="series" icon={<LaptopOutlined />}>
                            <Link to="/series">ТВ ЦУВРАЛ</Link>
                        </Menu.Item>
                        <Menu.Item key="artists" icon={<TeamOutlined />}>
                            <Link to="/artists">УРАН БҮТЭЭЛЧ</Link>
                        </Menu.Item>
                        <Menu.Item key="blogs" icon={<ReadOutlined />}>
                            <Link to="/blogs">МЭДЭЭЛЭЛ</Link>
                        </Menu.Item>        
                        { 
                        props.currentUser ? 
                            <>                                
                                <SubMenu 
                                    key="usermenu" 
                                    icon={<Avatar src={props.currentUser.photoURL} />} 
                                    style={{ float: 'right' }}                
                                    // title={props.currentUser.displayName}   
                                >                                              
                                    <Menu.Item key="profile">                                          
                                        Хэрэглэгчийн мэдээлэл
                                    </Menu.Item>
                                    <Menu.Item key="admin">
                                        <Link to="/admin">Админ цонх</Link>
                                    </Menu.Item> 
                                    <Menu.Item key="signout" onClick={handleSignOutClick}>
                                        Системээс гарах
                                    </Menu.Item>
                                </SubMenu>                                                             
                            </>
                        :
                            <>
                                <Menu.Item key="signup" icon={<EditOutlined />} style={{ float: 'right' }} onClick={handleSignUpClick}>
                                    БҮРТГҮҮЛЭХ
                                </Menu.Item>
                                <Menu.Item key="signin" icon={<UserOutlined />} style={{ float: 'right' }} onClick={handleSignInClick}>
                                    НЭВТРЭХ
                                </Menu.Item>                                
                            </>
                        }                                                                       
                        {/* <Menu.Item key="language" style={{ float: 'right' }}>          
                            <GlobalOutlined style={{ fontSize: '20px' }} />          
                        </Menu.Item>     
                        <Menu.Item key="notification" style={{ float: 'right' }}>          
                            <BellOutlined style={{ fontSize: '20px' }} />          
                        </Menu.Item> */}
                        <Menu.Item key="search" icon={<SearchOutlined />} style={{ float: 'right' }}>          
                            ХАЙЛТ          
                        </Menu.Item>               
                    </Menu>                                      
                </div>
            )}
            {
                modal === 'signin' ? (
                    <Modal
                        title="Нэвтрэх"         
                        visible={true}                                   
                        onCancel={hideModal}
                        footer={null}                       
                    >
                        <SignInForm changeModal={changeModal} />
                    </Modal>  
                ) : modal === 'signup' ? (
                    <Modal
                        title="Бүртгүүлэх"         
                        visible={true}                       
                        onCancel={hideModal}
                        footer={null}                       
                    >
                        <SignUpForm changeModal={changeModal} />
                    </Modal> 
                ) : (
                    <>
                    </>
                )
            }            
        </div>            
    );
};

export default CustomMenu;