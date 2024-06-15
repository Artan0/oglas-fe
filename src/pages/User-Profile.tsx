import React, { useContext, useEffect, useState } from "react";
import CustomLayout from "../layouts/layout";
import { Row, Col, Card, Avatar, Button, Typography, Modal, Form, Input } from "antd"; // Import Pagination
import { Container } from "react-bootstrap";
import styled from "styled-components";
import AdCard from "../components/AdCard";
import { useUser } from "../context/User-context";
import axiosInstance from "../api";
import { useNavigate } from "react-router-dom";
import { Ad } from "../types/Ad";
import Pagination from "@mui/material/Pagination";
import { PersonOutline, PhoneOutlined } from "@mui/icons-material";
import BadgeIcon from '@mui/icons-material/Badge';
import { EditOutlined, PlusCircleOutlined } from "@ant-design/icons";

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
    const [userAds, setUserAds] = useState<Ad[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1); // Track current page
    const [totalPages, setTotalPages] = useState<number>(1); // Track total pages
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserAds = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const response = await axiosInstance.get(`/user-ads/?page=${currentPage}`, {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                }); // Fetch ads for current page
                setUserAds(response.data.results); // Update ads
                setTotalPages(response.data.total_pages); // Update total pages
                console.log("Total Pages:", response.data.total_pages); // Log total pages
            } catch (error) {
                console.error('Error fetching user ads:', error);
            }
        };

        fetchUserAds();
    }, [currentPage]); // Fetch ads when currentPage changes

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

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page); // Update current page
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
                                <Paragraph style={{ marginTop: '1rem' }}><BadgeIcon /><b className="mx-1">First Name:</b> {user.first_name}</Paragraph>
                                <Paragraph style={{ marginTop: '1rem' }}><BadgeIcon /><b className="mx-1">Last Name:</b> {user.last_name}</Paragraph>
                                <Paragraph style={{ marginTop: '1rem' }}><PhoneOutlined /><b className="mx-1">Phone:</b> {user.phone_number}</Paragraph>

                                <Button type="primary" style={{ marginTop: '1rem' }} icon={<EditOutlined />} iconPosition="end" onClick={showModal}>Edit Profile</Button>
                            </UserInfoCard>
                        )}
                    </Col>
                    <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                        <MyAdsSection>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Title level={3}>My Ads</Title>
                                <Button size="large" type="primary" icon={<PlusCircleOutlined style={{ fontSize: '18px' }} />} iconPosition={"end"} onClick={() => navigate('/add-ad')}>Add Ad</Button>
                            </div>
                            <Row gutter={[16, 16]}>
                                {userAds.map((ad, index) => (
                                    <Col key={index} xs={24} sm={12} md={12} lg={8} xl={8}>
                                        <AdCard
                                            id={ad.id}
                                            title={ad.title}
                                            imageUrls={ad.image_urls}
                                            description={ad.description}
                                            price={ad.price}
                                            isCar={ad.category === "car"}
                                            car_details={ad.car_details}
                                        />
                                    </Col>
                                ))}
                            </Row>
                            <div className="d-flex justify-content-center mt-5" >
                                <Pagination
                                    count={totalPages}
                                    page={currentPage}
                                    onChange={handlePageChange}
                                    variant="outlined"
                                    shape="rounded"
                                    color="primary"
                                />

                            </div>
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
