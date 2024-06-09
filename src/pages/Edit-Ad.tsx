import React, { useState, useEffect } from "react";
import CustomLayout from "../layouts/layout";
import { Form, Input, Select, Button, InputNumber, Card, Col, Row, Upload, message, UploadFile, Modal } from "antd";
import { Container } from "react-bootstrap";
import { UploadOutlined } from '@ant-design/icons';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { imgDB } from "../setup/firebase";
import axiosInstance from "../api";
import AdCard from "../components/AdCard";
import { Ad } from "../types/Ad";
import { useParams } from "react-router-dom";
import Cookies from 'js-cookie';
const { Option } = Select;
const { TextArea } = Input;

const EditAd: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [form] = Form.useForm();
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [previewImageUrl, setPreviewImageUrl] = useState<string>("");
    const [cities, setCities] = useState<string[]>([]);
    const [adTypes, setAdTypes] = useState<string[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [manufacturers, setManufacturers] = useState<string[]>([]);
    const [colors, setColors] = useState<string[]>([]);
    const [car_types, setCarTypes] = useState<string[]>([]);
    const [fuels, setFuel] = useState<string[]>([]);
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
        imageUrl: "",
        color: "",
        car_type: "",
        fuel_type: "",
    });

    useEffect(() => {
        const fetchChoices = async () => {
            try {
                const response = await axiosInstance.get("/api/choices/");
                const { cities, ad_types, categories, manufacturers, car_types, colors, fuels } = response.data;
                console.log("Received Data:", response.data);

                setCities(cities.map((city: any[]) => city[0]));
                setAdTypes(ad_types.map((type: any[]) => type[0]));
                setCategories(categories.map((category: any[]) => category[0]));
                setManufacturers(manufacturers.map((manufacturer: any[]) => manufacturer[0]));
                setCarTypes(car_types.map((car_type: any[]) => car_type[0]));
                setColors(colors.map((color: any[]) => color[0]));
                setFuel(fuels.map((fuel: any[]) => fuel[0]));

                form.setFieldsValue({
                    location: cities[0][0],
                    ad_type: ad_types[0][0],
                    category: categories[0][0],
                    manufacturer: manufacturers[0][0],
                    fuel_type: fuels[0][0],
                    car_type: car_types[0][0],
                    color: colors[0][0],
                });
            } catch (error) {
                console.error("Error fetching choices:", error);
            }
        };

        fetchAdData();

        fetchChoices();
    }, [form, id]);
    const fetchAdData = async () => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await axiosInstance.get(`ad/edit/${id}/`, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });
            const adData = response.data;
            form.setFieldsValue({
                title: adData.title,
                description: adData.description,
                price: adData.price,
                ad_type: adData.ad_type,
                location: adData.location,
                address: adData.address,
                category: adData.category,
                manufacturer: adData.car_details?.manufacturer,
                imageUrl: adData.imageUrl,
                color: adData.car_details?.color,
                car_type: adData.car_details?.car_type,
                fuel_type: adData.car_details?.fuel_type,
                year: adData.car_details?.year,
                mileage: adData.car_details?.mileage
            });
            form.setFieldsValue(adData);
            setFormData(adData);
            if (adData.imageUrl) {
                setPreviewImageUrl(adData.imageUrl);
            }
        } catch (error) {
            console.error("Error fetching ad data:", error);
        }
    };

    const handleFileChange = ({ fileList }: { fileList: UploadFile[] }) => {
        const limitedFileList = fileList.slice(0, 5);
        setFileList(limitedFileList);

        if (limitedFileList.length > 0) {
            setPreviewImageUrl(limitedFileList[0].thumbUrl || URL.createObjectURL(limitedFileList[0].originFileObj as Blob));
        } else {
            setPreviewImageUrl("");
        }
    };
    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('authToken');
            await axiosInstance.delete(`/ad/delete/${id}/`, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });
            message.success("Ad deleted successfully!");
            window.location.href = "/profile";
        } catch (error) {
            console.error("Error deleting ad:", error);
            message.error("Failed to delete ad");
        }
    };

    const handleAdTypeChange = (value: string) => {
        form.setFieldsValue({ ad_type: value });
        setFormData(prevFormData => ({ ...prevFormData, ad_type: value }));
    };

    const handleLocationChange = (value: string) => {
        form.setFieldsValue({ location: value });
        setFormData(prevFormData => ({ ...prevFormData, location: value }));
    };

    const handleManufacturerChange = (value: string) => {
        form.setFieldsValue({ manufacturer: value });
        setFormData(prevFormData => ({ ...prevFormData, manufacturer: value }));
    };

    const handleColorChange = (value: string) => {
        form.setFieldsValue({ color: value });
        setFormData(prevFormData => ({ ...prevFormData, color: value }));
    };

    const handleFuelTypeChange = (value: string) => {
        form.setFieldsValue({ fuel: value });
        setFormData(prevFormData => ({ ...prevFormData, fuel_type: value }));
    };

    const handleCarTypeChange = (value: string) => {
        form.setFieldsValue({ car_type: value });
        setFormData(prevFormData => ({ ...prevFormData, car_type: value }));
    };

    const csrftoken = Cookies.get('csrftoken'); // Get the CSRF token using js-cookie

    const handleFormSubmit = async () => {
        try {
            const token = localStorage.getItem('authToken');
            const csrftoken = Cookies.get('csrftoken');

            const response = await axiosInstance.put(`/ad/edit/${id}/`, formData, {
                headers: {
                    'Authorization': `Token ${token}`,
                    'X-CSRFToken': csrftoken,
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 200) {
                message.success("Ad updated successfully!");
                window.location.href = "/profile";
            } else {
                message.error("Failed to update ad");
            }
        } catch (error) {
            console.error("Error updating ad:", error);
            message.error("Failed to update ad");
        }
    };



    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    const showDeleteModal = () => {
        setDeleteModalVisible(true);
    };

    const handleCancel = () => {
        setDeleteModalVisible(false);
    };
    return (
        <CustomLayout>
            <Container className="p-5">
                <Row className="mt-5" justify="center">
                    <Modal
                        title="Delete Ad"
                        visible={deleteModalVisible}
                        onOk={handleDelete}
                        onCancel={handleCancel}
                        okText="Delete"
                        cancelText="Cancel"
                    >
                        <p>Are you sure you want to delete this ad?</p>
                    </Modal>
                    <Col xs={24} sm={24} md={16} lg={14} xl={14}>
                        <Card className="">
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
                                    rules={[{ required: false }]}
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
                                    <>
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
                                        <Form.Item label="Year" name="year" rules={[{ required: false }]}>
                                            <Input size="large" />
                                        </Form.Item>
                                        <Form.Item label="Mileage" name="mileage" rules={[{ required: false }]}>
                                            <Input size="large" />
                                        </Form.Item>
                                        <Form.Item
                                            label="Color"
                                            name="color"
                                            rules={[{ required: true, message: 'Please enter a color!' }]}
                                        >
                                            <Select size="large" onSelect={handleColorChange}>
                                                {colors.map((color, index) => (
                                                    <Option key={index} value={color}>{color}</Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                        <Form.Item
                                            label="Car Type"
                                            name="car_type"
                                            rules={[{ required: true, message: 'Please select the car type!' }]}
                                        >
                                            <Select size="large" onSelect={handleCarTypeChange}>
                                                {car_types.map((car_type, index) => (
                                                    <Option key={index} value={car_type}>{car_type}</Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                        <Form.Item
                                            label="Fuel Type"
                                            name="fuel_type"
                                            rules={[{ required: true, message: 'Please select the fuel type!' }]}
                                        >
                                            <Select size="large" onSelect={handleFuelTypeChange}>
                                                {fuels.map((fuel, index) => (
                                                    <Option key={index} value={fuel}>{fuel}</Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    </>
                                )}
                                <Form.Item
                                    label="Images"
                                    name="images"
                                >
                                    <Upload
                                        disabled={true}
                                        listType="picture-card"
                                        fileList={fileList}
                                        onChange={handleFileChange}
                                        beforeUpload={() => false}
                                    >
                                        {fileList.length < 5 && <UploadOutlined />}
                                    </Upload>
                                </Form.Item>
                                <Form.Item>

                                    <Button className="m-1" size="large" type="primary" htmlType="submit">Submit</Button>
                                    <Button className="m-1" size="large" danger type="primary" onClick={showDeleteModal}>Delete Ad</Button>

                                </Form.Item>
                            </Form>
                        </Card>
                    </Col>

                </Row>
            </Container>
        </CustomLayout>
    );
};

export default EditAd;
