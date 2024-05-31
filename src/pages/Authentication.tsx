import React, { Component, ContextType } from 'react';
import styled from 'styled-components';
import { Layout, Input, Button, Form, message, Tabs, Col, DatePicker, Select } from 'antd';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import CustomLayout from '../layouts/layout';
import axiosInstance from '../api';
import loginImage from '../assets/images/sign-up.png';
import { User } from '../types/user';
import { UserContext, UserContextProps } from '../context/User-context';
const { Content } = Layout;
const { TabPane } = Tabs;
const { Option } = Select;

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
        display: flex;
        justify-content: center;
    }
`;

// const prefixSelector = (
//     <Form.Item name="prefix" noStyle>
//         <Select style={{ width: 70 }}>
//             <Option value="389">+389</Option>
//         </Select>
//     </Form.Item>
// );

const StyledDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px;
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
        lg: { span: 18 },
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
                        <Col span={8}>
                            <StyledTabs defaultActiveKey="login">
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
                                        onFinish={this.handleRegister}
                                    >
                                        <Form.Item
                                            label="First Name"
                                            name="first_name"
                                            rules={[{ required: true, message: 'Please input your first name!' }]}
                                        >
                                            <Input />
                                        </Form.Item>

                                        <Form.Item
                                            label="Last Name"
                                            name="last_name"
                                            rules={[{ required: true, message: 'Please input your last name!' }]}
                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            label="Username"
                                            name="username"
                                            rules={[{ required: true, message: 'Please input your username!' }]}
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
                                            name="password1"
                                            rules={[{ required: true, message: 'Please input your password!' }]}
                                        >
                                            <Input.Password />
                                        </Form.Item>
                                        <Form.Item
                                            label="Confirm Password"
                                            name="password2"
                                            rules={[{ required: true, message: 'Please confirm your password!' }]}
                                        >
                                            <Input.Password />
                                        </Form.Item>

                                        {/* <Form.Item
                                            name="phone_number"
                                            label="Phone Number"
                                            rules={[{ required: true, message: 'Please input your phone number!' }]}
                                        >
                                            <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                                        </Form.Item> */}



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

function withRouter(Component: React.ComponentType<AuthProps>) {
    return function WrappedComponent(props: any) {
        const navigate = useNavigate();
        return <Component {...props} navigate={navigate} />;
    };
}

export default withRouter(Authentication);
