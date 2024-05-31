import React, { useState, useEffect } from "react";
import CustomLayout from "../layouts/layout";
import { Form, Input, Select, Button, InputNumber, Card, Col, Row, Upload, message, UploadFile } from "antd";
import { Container } from "react-bootstrap";
import styled from "styled-components";
import AdCard from "../components/AdCard";
import { UploadOutlined } from '@ant-design/icons';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app, imgDB } from "../setup/firebase";
import axios from "axios";
import axiosInstance from "../api";
import { Ad } from "../types/Ad";

const { Option } = Select;
const { TextArea } = Input;

const AddAd: React.FC = () => {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [cities, setCities] = useState<string[]>([]);
    const [adTypes, setAdTypes] = useState<string[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [manufacturers, setManufacturers] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>();
    const [formData, setFormData] = useState<Ad>({
        title: "",
        description: "",
        price: 0,
        ad_type: "",
        location: "",
        address: "",
        category: "",
        manufacturer: "",
        imageUrl: ""
    });

    useEffect(() => {
        const fetchChoices = async () => {
            try {
                const response = await axiosInstance.get("/api/choices/");
                const { cities, ad_types, categories, manufacturers } = response.data;
                console.log("Received Data:", response.data);

                setCities(cities.map((city: any[]) => city[0]));
                setAdTypes(ad_types.map((type: any[]) => type[0]));
                setCategories(categories.map((category: any[]) => category[0]));
                setManufacturers(manufacturers.map((manufacturer: any[]) => manufacturer[0]));

                form.setFieldsValue({
                    location: cities[0][0],
                    ad_type: ad_types[0][0],
                    category: categories[0][0],
                    manufacturer: manufacturers[0][0],
                });
            } catch (error) {
                console.error("Error fetching choices:", error);
            }
        };

        fetchChoices();
    }, [form]);

    const handleFileChange = ({ fileList }: { fileList: UploadFile[] }) => {
        const limitedFileList = fileList.slice(0, 5);
        setFileList(limitedFileList);
    };

    const handleAdTypeChange = (value: string) => {
        form.setFieldsValue({ ad_type: value });
        setFormData({ ...formData, ad_type: value });
    };

    const handleLocationChange = (value: string) => {
        form.setFieldsValue({ location: value });
        setFormData({ ...formData, location: value });
    };

    const handleManufacturerChange = (value: string) => {
        form.setFieldsValue({ manufacturer: value });
        setFormData({ ...formData, manufacturer: value });
    };

    const handleFormSubmit = async () => {
        try {
            const uploadedImages = await Promise.all(
                fileList.map(async (file) => {
                    const storageRef = ref(imgDB, `oglas/${file.name}`);
                    await uploadBytes(storageRef, file.originFileObj as Blob);
                    return getDownloadURL(storageRef);
                })
            );

            const formDataWithImages = {
                ...formData,
                imageUrl: uploadedImages[0],
            };
            const token = localStorage.getItem('authToken');
            await axiosInstance.post("/ad/add/", formDataWithImages, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });

            console.log("Form Data:", formDataWithImages);

            message.success("Ad submitted successfully!");
        } catch (error) {
            console.error("Error submitting ad:", error);
            message.error("Failed to submit ad");
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <CustomLayout>
            <Container className="p-5">
                <Row className="mt-5" gutter={[16, 16]} justify="center">
                    <Col xs={24} sm={24} md={16} lg={14} xl={14}>
                        <Card className="w-75">
                            <Form style={{ maxWidth: '600px' }}
                                form={form}
                                layout="vertical"
                                name="add_ad"
                                onFinish={handleFormSubmit}
                                onFinishFailed={onFinishFailed}
                                onValuesChange={(changedValues, allValues) => setFormData(allValues as Ad)}
                            >
                                <Form.Item
                                    label="Title"
                                    name="title"
                                    rules={[{ required: true, message: 'Please input the title!' }]}
                                >
                                    <Input size="large" />
                                </Form.Item>
                                <Form.Item
                                    label="Description"
                                    name="description"
                                    rules={[{ required: true, message: 'Please input the description!' }]}
                                >
                                    <TextArea rows={4} />
                                </Form.Item>
                                <Form.Item
                                    label="Price"
                                    name="price"
                                    rules={[{ required: true, message: 'Please input the price!' }]}
                                >
                                    <InputNumber size="large" min={0} max={1000000} />
                                </Form.Item>
                                <Form.Item
                                    label="Ad Type"
                                    name="ad_type"
                                    rules={[{ required: true, message: 'Please select the ad type!' }]}
                                >
                                    <Select onSelect={handleAdTypeChange} size="large">
                                        {adTypes.map((type, index) => (
                                            <Option key={index} value={type}>{type}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label="Location"
                                    name="location"
                                    rules={[{ required: true, message: 'Please select the location!' }]}
                                >
                                    <Select onSelect={handleLocationChange} size="large">
                                        {cities.map((city, index) => (
                                            <Option key={index} value={city}>{city}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label="Address"
                                    name="address"
                                    rules={[{ required: true, message: 'Please input the address!' }]}
                                >
                                    <Input size="large" />
                                </Form.Item>
                                <Form.Item
                                    label="Category"
                                    name="category"
                                    rules={[{ required: true, message: 'Please select the category!' }]}
                                >
                                    <Select size="large" value={selectedCategory} onSelect={value => setSelectedCategory(value)}>
                                        {categories.map((category, index) => (
                                            <Option key={index} value={category}>{category}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                {selectedCategory === "car" && (
                                    <Form.Item
                                        label="Manufacturer"
                                        name="manufacturer"
                                        rules={[{ required: true, message: 'Please select the manufacturer!' }]}
                                    >
                                        <Select size="large" onSelect={handleManufacturerChange}>
                                            {manufacturers.map((manufacturer, index) => (
                                                <Option key={index} value={manufacturer}>{manufacturer}</Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                )}
                                <Form.Item
                                    label="Images"
                                    name="images"
                                    rules={[{ required: true, message: 'Please upload at least one image!' }]}
                                >
                                    <Upload
                                        listType="picture-card"
                                        fileList={fileList}
                                        onChange={handleFileChange}
                                        beforeUpload={() => false}
                                    >
                                        {fileList.length < 5 && <UploadOutlined />}
                                    </Upload>
                                </Form.Item>
                                <Form.Item>
                                    <Button size="large" type="primary" htmlType="submit">Submit</Button>
                                </Form.Item>
                            </Form>
                        </Card>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={10} xl={10}>
                        <div>
                            <AdCard {...formData} imageUrl={fileList.length > 0 && fileList[0].url ? fileList[0].url : ""} />
                        </div>
                    </Col>
                </Row>
            </Container>
        </CustomLayout>
    );
};

export default AddAd;

