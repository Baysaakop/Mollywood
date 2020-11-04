import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Modal, Divider, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, GoogleOutlined, FacebookOutlined, FacebookFilled, InstagramFilled, InstagramOutlined } from '@ant-design/icons';
import SignUpForm from './SignUpForm';
import axios from 'axios';

import { signInWithGoogle } from '../firebase/firebase.utils.js';

const SignInForm = (props) => {
    
    // const [signUpVisible, setSignUpVisible] = useState(true);

    // const showSignUpModal = () => {
    //     setSignUpVisible(true);
    // }

    // const hideSignUpModal = () => {
    //     setSignUpVisible(false);
    // }

    const onFinish = values => {
        axios({ 
            method: 'POST',
            url: 'http://192.168.0.104:8000/api/v1/users/login',
            data:{                 
                email: values.email,
                password: values.password 
            }
        })
        .then(res => {
            console.log(res);
        })
    };

    const handleSignUpClick = () => {
        props.changeModal('signup');
    }

    const handleSignInWithGoogleClick = () => {        
        signInWithGoogle()       
    }

    return (
        <div>
            <Form
                layout="vertical"
                name="signin"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                >
                <Form.Item
                    label="Имэйл хаяг:"
                    name="email"
                    rules={[{ required: true,  type: 'email', message: 'Имэйлээ оруулна уу!' }]}
                >
                    <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Имэйл хаяг" />
                </Form.Item>
                <Form.Item
                    label="Нууц үг:"
                    name="password"
                    rules={[{ required: true, message: 'Нууц үгээ оруулна уу!' }]}
                >
                    <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Нууц үг"
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Сануулах</Checkbox>
                    </Form.Item>
                    <a className="login-form-forgot" href="/forgotpassword">
                    Нууц үг мартсан
                    </a>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Нэвтрэх
                    </Button>
                    <span> Бүртгэлгүй бол <a onClick={handleSignUpClick}> энд дарж</a> бүртгүүлнэ үү</span>
                </Form.Item>
                <Divider>Эсвэл</Divider>
                <Form.Item
                    label="Сошиал хаяг ашиглан нэвтрэх:"
                >
                    <Button icon={<GoogleOutlined />} className="login-form-button" onClick={handleSignInWithGoogleClick} style={{ background: '#dd4b39', color: 'white' }}>
                        Google
                    </Button>
                    <Button icon={<FacebookFilled />} className="login-form-button" style={{ background: '#3B5998', color: 'white' }}>
                        Facebook
                    </Button>
                    {/* <Button icon={<InstagramOutlined />} className="login-form-button" style={{ background: '#125688', color: 'white', width: '33%' }}>
                        Instagram
                    </Button> */}
                </Form.Item>
            </Form>
            {/* <Modal
                title="Бүртгүүлэх"              
                visible={signUpVisible}       
                onCancel={hideSignUpModal}
                footer={null}                       
            >
                <SignUpForm />
            </Modal> */}
        </div>
    );
};

export default SignInForm;