import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';

const SignUpForm = (props) => {
    
    const onFinish = values => {
        console.log('Received values of form: ', values);
    };

    return (
        <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
        >
            <Form.Item
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
            <Form.Item
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
                <span> Бүртгэлтэй бол <a href="/signin"> энд дарж</a> нэвтэрнэ үү.</span>
            </Form.Item>
        </Form>
    );
};

export default SignUpForm;