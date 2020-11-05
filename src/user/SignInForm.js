import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Modal, Divider, message } from 'antd';
import { LockOutlined, MailOutlined, GoogleOutlined, FacebookFilled } from '@ant-design/icons';
import axios from 'axios';

import { auth, signInWithFacebook, signInWithGoogle } from '../firebase/firebase.utils.js';

const SignInForm = (props) => {
    
    const onFinish = async values => {
        try {
            await auth.signInWithEmailAndPassword(values.email, values.password);
            props.closeModal();
        } catch (err) {
            message.error(err.message);
        }
        // axios({ 
        //     method: 'POST',
        //     url: 'http://192.168.0.104:8000/api/v1/users/login',
        //     data:{                 
        //         email: values.email,
        //         password: values.password 
        //     }
        // })
        // .then(res => {
        //     console.log(res);
        // })
    };

    const handleSignUpClick = () => {
        props.changeModal('signup');
    }

    const handleSignInWithGoogleClick = () => {        
        signInWithGoogle();
        props.closeModal();      
    }

    const handleSignInWithFacebookClick = () => {        
        signInWithFacebook();
        props.closeModal();      
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
                    <Button icon={<FacebookFilled />} className="login-form-button" onClick={handleSignInWithFacebookClick} style={{ background: '#3B5998', color: 'white' }}>
                        Facebook
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default SignInForm;