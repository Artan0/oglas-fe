import React, { Component } from 'react';
import styled from 'styled-components';
import { Layout, Input, Button, Form, message, Tabs, Col, Checkbox, DatePicker, Select } from 'antd';
import CustomLayout from '../layouts/layout';
import axios from 'axios';
import loginImage from '../assets/images/sign-up.png'

const { Content } = Layout;
const { TabPane } = Tabs;
const { Option } = Select;

export interface AuthState {
    componentToShow: "login" | "register";
}

const StyledContent = styled(Content)`
    text-align: center;
    min-height: 120px;
    line-height: 120px;
    color: #000; 
    background-color: #f0f4f9;
`;

const StyledForm = styled(Form)`
    width: 80%; 
    margin: 0 auto;
`;

const StyledTabs = styled(Tabs)`
    border: 1px solid #98989833;
    border-radius: 8px;
    margin: 10px;
    box-shadow: 0 3px 7px rgba(0, 0, 0, 0.1);
    padding: 10px;

    .ant-tabs-nav-wrap {
        display:flex;
        justify-content: center;
    }
`;

const prefixSelector = (
    <Form.Item name="prefix" noStyle>
        <Select style={{ width: 70 }}>
            <Option value="389">+389</Option>
        </Select>
    </Form.Item>
);

const StyledDiv = styled.div`
    display: flex;
    justify-content:center;
    align-items: center;
    padding:15px
`
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
        md: { span: 8 },
        lg: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
        md: { span: 16 },
        lg: { span: 18 },
    },
};

class Authentication extends Component<{}, AuthState> {
    constructor(props: any) {
        super(props);
        this.state = {
            componentToShow: "login"
        };
    }

    login = () => {
        this.setState({ componentToShow: "login" });
    };

    register = () => {
        this.setState({ componentToShow: "register" });
    };

    onFinishLogin = (values: any) => {
        axios.post('http://localhost:8081/login', values)
            .then((response: any) => {
                console.log('Login successful:', response.data);
                message.success('Login successful');
            })
            .catch((error: any) => {
                console.error('Login failed:', error);
                message.error('Login failed. Please check your credentials.');
            });
    };

    onFinishRegister = (values: any) => {
        axios.post('http://localhost:8081/register', values)
            .then((response: any) => {
                console.log('Registration successful:', response.data);
                message.success('Registration successful');
            })
            .catch((error: any) => {
                console.error('Registration failed:', error);
                message.error('Registration failed. Please check your input.');
            });
    };

    render() {
        return (
            <CustomLayout>
                <StyledContent className="pt-3">
                    <StyledDiv className="mt-5">
                        <Col span={8}>
                            <StyledTabs defaultActiveKey="login">
                                <TabPane tab="Login" key="login">
                                    <StyledForm
                                        {...formItemLayout}
                                        name="loginForm"
                                        initialValues={{ remember: true }}
                                        onFinish={this.onFinishLogin}
                                    >
                                        <Form.Item
                                            label="Email"
                                            name="email"
                                            rules={[{ required: true, message: 'Please input your email!' }]}
                                        >
                                            <Input />
                                        </Form.Item>

                                        <Form.Item
                                            label="Password"
                                            name="password"
                                            rules={[{ required: true, message: 'Please input your password!' }]}
                                        >
                                            <Input.Password />
                                        </Form.Item>

                                        <Form.Item>
                                            <Button type="primary" htmlType="submit">
                                                Log in
                                            </Button>
                                        </Form.Item>
                                    </StyledForm>
                                </TabPane>
                                <TabPane tab="Register" key="register">
                                    <StyledForm
                                        name="registerForm"
                                        {...formItemLayout}
                                        initialValues={{ remember: true }}
                                        onFinish={this.onFinishRegister}
                                    >
                                        <Form.Item
                                            label="First Name"
                                            name="firstName"
                                            rules={[{ required: true, message: 'Please input your first name!' }]}
                                        >
                                            <Input />
                                        </Form.Item>

                                        <Form.Item
                                            label="Last Name"
                                            name="lastName"
                                            rules={[{ required: true, message: 'Please input your last name!' }]}
                                        >
                                            <Input />
                                        </Form.Item>

                                        <Form.Item
                                            label="Email"
                                            name="email"
                                            rules={[{ required: true, message: 'Please input your email!' }]}
                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            label="Password"
                                            name="password"
                                            rules={[{ required: true, message: 'Please input your password!' }]}
                                        >
                                            <Input.Password />
                                        </Form.Item>
                                        <Form.Item
                                            name="phoneNumber"
                                            label="Phone Number"
                                        >
                                            <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                                        </Form.Item>

                                        <Form.Item label="Employed" name="isEmployed" valuePropName="checked" style={{ textAlign: 'left' }}>
                                            <Checkbox>Checkbox</Checkbox>
                                        </Form.Item>

                                        <Form.Item label="Date Of Birth" name="dateOfBirth" style={{ textAlign: 'left' }}>
                                            <DatePicker />
                                        </Form.Item>




                                        <Form.Item>
                                            <Button type="primary" htmlType="submit">
                                                Register
                                            </Button>
                                        </Form.Item>
                                    </StyledForm>
                                </TabPane>
                            </StyledTabs>
                        </Col>
                        <Col span={12}>
                            <div>
                                <img src={loginImage} alt="login" style={{ width: '70%', height: 'auto' }} />
                            </div>
                        </Col>
                    </StyledDiv>
                </StyledContent>
            </CustomLayout>
        );
    }
}

export default Authentication;
