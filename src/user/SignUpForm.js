import React from 'react';
import { Form, Input, Button, Divider, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, GoogleOutlined, FacebookFilled } from '@ant-design/icons';
import axios from 'axios';
import * as actions from '../redux/actions/signUpActions';
import { connect } from 'react-redux';

import { auth, createUserProfileDocument, signInWithGoogle, signInWithFacebook } from '../firebase/firebase.utils.js';

const SignUpForm = (props) => {
    
    const onFinish = async values => {                
        // props.signUpUser(values.username, values.email, values.password);
        const displayName = values.username;
        try {
            const { user } = await auth.createUserWithEmailAndPassword(
                values.email,
                values.password
            );
            await createUserProfileDocument(user, { displayName });
            props.closeModal();
        } catch (err) {
            message.error(err.message);
        }
        // axios({ 
        //     method: 'POST',
        //     url: 'http://192.168.0.103:8000/api/v1/users/register',
        //     data: { 
        //         name: values.username,
        //         email: values.email,
        //         password: values.password 
        //     }
        // })
        // .then(res => {
        //     console.log(res);
        // })
    };

    const handleSignInClick = () => {
        props.changeModal('signin');
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
        <Form
            layout="vertical"
            name="signup"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
        >
            <Form.Item
                label="Цахим хаяг"
                name="email"
                rules={[
                    { 
                        type: 'email',
                        message: 'Цахим хаяг буруу байна!' 
                    }, {
                        required: true, 
                        message: 'Цахим хаягаа оруулна уу!' 
                    }
                ]}
            >
                <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Цахим хаяг" />
            </Form.Item>
            <Form.Item
                label="Хэрэглэгчийн нэр"
                name="username"
                rules={[{ required: true, message: 'Хэрэглэгчийн нэрээ оруулна уу!' }]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Хэрэглэгчийн нэр" />
            </Form.Item>
            <Form.Item
                label="Нууц үг"
                name="password"
                rules={[{ required: true, message: 'Нууц үгээ оруулна уу!' }]}
            >
                <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Нууц үг"
                />
            </Form.Item>
            <Form.Item
                label="Нууц үг давтах"
                name="confirm"
                dependencies={['password']}
                rules={[
                    { 
                        required: true, 
                        message: 'Нууц үгээ давтан оруулна уу!' 
                    },
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                        if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                        }
                        return Promise.reject('The two passwords that you entered do not match!');
                        },
                    }),
                ]}                
            >
                <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Нууц үг давтах"
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                Бүртгүүлэх
                </Button>
                <span> Бүртгэлтэй бол <a onClick={handleSignInClick}> энд дарж</a> нэвтэрнэ үү.</span>
            </Form.Item>
            <Divider>Эсвэл</Divider>
            <Form.Item
                label="Сошиал хаяг ашиглан бүртгүүлэх:"
            >
                <Button icon={<GoogleOutlined />} className="login-form-button" onClick={handleSignInWithGoogleClick} style={{ background: '#dd4b39', color: 'white' }}>
                    Google
                </Button>
                <Button icon={<FacebookFilled />} className="login-form-button" onClick={handleSignInWithFacebookClick} style={{ background: '#3B5998', color: 'white' }}>
                    Facebook
                </Button>
                {/* <Button icon={<InstagramOutlined />} className="login-form-button" style={{ background: '#125688', color: 'white', width: '33%' }}>
                    Instagram
                </Button> */}
            </Form.Item>
        </Form>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        signUpUser: (name, email, password) => 
            dispatch(actions.signUpUser(name, email, password))
    };
};

export default connect(null, mapDispatchToProps)(SignUpForm);