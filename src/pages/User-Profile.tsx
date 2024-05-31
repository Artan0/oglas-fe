import React, { useContext, useState } from "react";
import CustomLayout from "../layouts/layout";
import { Row, Col, Card, Avatar, Button, Typography, Modal, Form, Input } from "antd";
import { Container } from "react-bootstrap";
import styled from "styled-components";
import AdCard from "../components/AdCard";
import { useUser } from "../context/User-context";
import axiosInstance from "../api";

const { Title, Paragraph } = Typography;

const UserInfoCard = styled(Card)`
    margin-bottom: 2rem;
    margin-right: 1rem;
`;

const MyAdsSection = styled.div`
`;

const UserProfile: React.FC = () => {
    const { user, setUser } = useUser();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    const ads = [...Array(4)].map((_, index) => ({
        title: `Ad Title ${index + 1}`,
        image: "https://via.placeholder.com/150",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        price: `$${(Math.random() * 10000).toFixed(2)}`,
        rating: Math.floor(Math.random() * 5) + 1,
    }));

    const showModal = () => {
        if (user) {
            form.setFieldsValue(user);
        }
        setIsModalVisible(true);
    };

    const handleOk = () => {
        form.validateFields()
            .then(values => {
                const token = localStorage.getItem('authToken');
                if (token) {
                    axiosInstance.put('/edit-profile/', values, {
                        headers: {
                            'Authorization': `Token ${token}`
                        }
                    })
                        .then(response => {
                            setUser(response.data);
                            setIsModalVisible(false);
                        })
                        .catch(error => {
                            console.error('Error updating profile:', error);
                        });
                } else {
                    console.error('No auth token found');
                }
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    };


    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <CustomLayout>
            <Container className="py-5">
                <Row className="mt-5">
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        {user && (
                            <UserInfoCard>
                                <Card.Meta
                                    avatar={<Avatar size={64} src={"https://via.placeholder.com/150"} />}
                                    title={user.username}
                                    description={user.email}
                                />
                                <Paragraph style={{ marginTop: '1rem' }}><b>First Name:</b> {user.first_name}</Paragraph>
                                <Paragraph style={{ marginTop: '1rem' }}><b>Last Name:</b> {user.last_name}</Paragraph>
                                <Paragraph style={{ marginTop: '1rem' }}><b>Phone:</b> {user.phone_number}</Paragraph>

                                <Button type="primary" style={{ marginTop: '1rem' }} onClick={showModal}>Edit Profile</Button>
                            </UserInfoCard>
                        )}
                    </Col>
                    <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                        <MyAdsSection>
                            <Title level={3}>My Ads</Title>
                            <Row gutter={[16, 16]}>
                                {ads.map((ad, index) => (
                                    <Col key={index} xs={24} sm={12} md={12} lg={8} xl={8}>
                                        <AdCard
                                            title={ad.title}
                                            image={ad.image}
                                            description={ad.description}
                                            price={ad.price}
                                            rating={ad.rating}
                                        />
                                    </Col>
                                ))}
                            </Row>
                        </MyAdsSection>
                    </Col>
                </Row>
            </Container>
            <Modal
                title="Edit Profile"
                open={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form
                    form={form}
                    layout="vertical"
                    name="edit_profile"
                    initialValues={user || {}}
                >
                    <Form.Item
                        name="username"
                        label="Username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="First Name"
                        name="first_name"
                        rules={[{ required: true, message: 'Please input your first name!' }]}
                    >
                        <Input value={user?.first_name} />
                    </Form.Item>

                    <Form.Item
                        label="Last Name"
                        name="last_name"
                        rules={[{ required: true, message: 'Please input your last name!' }]}
                    >
                        <Input value={user?.last_name} />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input value={user?.email} disabled />
                    </Form.Item>
                    <Form.Item
                        name="phone_number"
                        label="Phone"
                        rules={[{ required: true, message: 'Please input your phone number!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </CustomLayout>
    );
};

export default UserProfile;
