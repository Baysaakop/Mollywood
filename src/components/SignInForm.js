import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Modal } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import SignUpForm from './SignUpForm';

const SignInForm = (props) => {
    
    // const [signUpVisible, setSignUpVisible] = useState(true);

    // const showSignUpModal = () => {
    //     setSignUpVisible(true);
    // }

    // const hideSignUpModal = () => {
    //     setSignUpVisible(false);
    // }

    const onFinish = values => {
        console.log('Received values of form: ', values);
    };

    return (
        <div>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Хэрэглэгчийн нэрээ оруулна уу!' }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Хэрэглэгчийн нэр" />
                </Form.Item>
                <Form.Item
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
                    <span> Бүртгэлгүй бол <a href="/signup"> энд дарж</a> бүртгүүлнэ үү</span>
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