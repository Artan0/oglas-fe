import React, { Component, ContextType } from 'react';
import styled from 'styled-components';
import { Layout, Input, Button, Form, message, Tabs, Col, Row } from 'antd';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import CustomLayout from '../layouts/layout';
import axiosInstance from '../api';
import loginImage from '../assets/images/sign-up.png';
import { User } from '../types/user';
import { UserContext, UserContextProps } from '../context/User-context';
import 'bootstrap/dist/css/bootstrap.min.css';

const { Content } = Layout;
const { TabPane } = Tabs;

interface AuthProps {
    navigate: NavigateFunction;
}

interface AuthState {
    componentToShow: "login" | "register";
    user: User | null;
}

const StyledContent = styled(Content)`
    text-align: center;
    min-height: 120px;
    line-height: 120px;
    color: #000; 
    background-color: #f0f4f9;
    padding: 2rem 0;
`;

const StyledForm = styled(Form)`
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
`;

const StyledTabs = styled(Tabs)`
    border: 1px solid #98989833;
    border-radius: 8px;
    margin: 10px;
    box-shadow: 0 3px 7px rgba(0, 0, 0, 0.1);
    padding: 10px;
`;

const StyledDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px;
    flex-wrap: wrap;
`;


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
        lg: { span: 19 },
    },
};

class Authentication extends Component<AuthProps, AuthState> {

    static contextType = UserContext;
    context!: ContextType<typeof UserContext>;

    handleLogin = async (values: any) => {
        try {
            const response = await axiosInstance.post('/auth/login/', values);
            const token = response.data.key;
            localStorage.setItem('authToken', token);
            message.success('Login successful!');

            const userInfoResponse = await axiosInstance.get('/user-info/', {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });

            const { setUser } = this.context as UserContextProps;
            setUser(userInfoResponse.data);

            this.props.navigate('/');
        } catch (error) {
            message.error('Login failed. Please check your credentials.');
        }
    };

    handleRegister = async (values: any) => {
        try {
            await axiosInstance.post('/auth/registration/custom/', values);
            message.success('Registration successful! Please check your email to confirm your account.');
        } catch (error) {
            message.error('Registration failed. Please check your inputs.');
        }
    };

    render() {
        return (
            <CustomLayout>
                <StyledContent className="pt-3">
                    <StyledDiv className="mt-5">
                        <Col xs={24} md={12}>
                            <div className="text-center">
                                <img src={loginImage} alt="login" style={{ width: '100%', maxWidth: '500px', height: 'auto' }} />
                            </div>
                        </Col>
                        <Col xs={24} md={12}>
                            <StyledTabs centered defaultActiveKey="login">
                                <TabPane tab="Login" key="login">
                                    <StyledForm
                                        {...formItemLayout}
                                        name="loginForm"
                                        initialValues={{ remember: true }}
                                        onFinish={this.handleLogin}
                                    >
                                        <Form.Item
                                            label="Email"
                                            name="email"
                                            rules={[{ required: true, message: 'Please input your email!' }]}
                                        >
                                            <Input size='large' placeholder='Enter Your Email' />
                                        </Form.Item>

                                        <Form.Item
                                            label="Password"
                                            name="password"
                                            rules={[{ required: true, message: 'Please input your password!' }]}
                                        >
                                            <Input.Password size='large' placeholder='Enter Your Password' />
                                        </Form.Item>

                                        <Form.Item>
                                            <Button size='large' type="primary" htmlType="submit">
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
                                        onFinish={this.handleRegister}
                                    >
                                        <Form.Item
                                            label="First Name"
                                            name="first_name"
                                            rules={[{ required: true, message: 'Please input your first name!' }]}
                                        >
                                            <Input size='large' placeholder='Enter Your First Name' />
                                        </Form.Item>

                                        <Form.Item
                                            label="Last Name"
                                            name="last_name"
                                            rules={[{ required: true, message: 'Please input your last name!' }]}
                                        >
                                            <Input size='large' placeholder='Enter Your Last Name' />
                                        </Form.Item>
                                        <Form.Item
                                            label="Username"
                                            name="username"
                                            rules={[{ required: true, message: 'Please input your username!' }]}
                                        >
                                            <Input size='large' placeholder='Enter Your Username' />
                                        </Form.Item>

                                        <Form.Item
                                            label="Email"
                                            name="email"
                                            rules={[{ required: true, message: 'Please input your email!' }]}
                                        >
                                            <Input size='large' placeholder='Enter Your Email' />
                                        </Form.Item>

                                        <Form.Item
                                            label="Password"
                                            name="password1"
                                            rules={[{ required: true, message: 'Please input your password!' }]}
                                        >
                                            <Input.Password size='large' placeholder='Enter Your Password' />
                                        </Form.Item>
                                        <Form.Item
                                            label="Confirm"
                                            name="password2"
                                            rules={[{ required: true, message: 'Please confirm your password!' }]}
                                        >
                                            <Input.Password size='large' placeholder='Confirm Your Password' />
                                        </Form.Item>
                                        <Form.Item>
                                            <Button size='large' type="primary" htmlType="submit">
                                                Register
                                            </Button>
                                        </Form.Item>
                                    </StyledForm>
                                </TabPane>
                            </StyledTabs>
                        </Col>

                    </StyledDiv>
                </StyledContent>
            </CustomLayout>
        );
    }
}

function withRouter(Component: React.ComponentType<AuthProps>) {
    return function WrappedComponent(props: any) {
        const navigate = useNavigate();
        return <Component {...props} navigate={navigate} />;
    };
}

export default withRouter(Authentication);
