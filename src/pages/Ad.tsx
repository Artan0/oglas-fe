import { useEffect, useState } from "react";
import CustomLayout from "../layouts/layout";
import { Row, Col, Carousel, Typography, Button } from "antd";
import { Container } from "react-bootstrap";
import AdCard from "../components/AdCard";
import styled from "styled-components";
import withParams from "../components/HOC";
import axiosInstance from "../api";
import { useParams } from "react-router-dom";
// Use type-only import to avoid conflicts
import type { AdDetails as AdDetailsType } from "../types/Ad-detail";
import { UserOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { useUser } from "../context/User-context";

const adImages = [
    "https://via.placeholder.com/800x400",
    "https://via.placeholder.com/800x400",
    "https://via.placeholder.com/800x400"
];

const StyledCarousel = styled(Carousel)`
    margin-bottom: 1rem;
    padding-right: 1rem;
    img {
        width: 100%;
        max-height: 400px;
        object-fit: cover;
        border-radius: 8px;
    }
`;

const StyledAdInfo = styled.div`
    padding: 1rem;
    background-color: #f7f7f7;
    border-radius: 8px;
    margin-bottom: 1rem;
`;

const StyledOwnerInfo = styled.div`
    padding: 1.5rem;
    background-color: #f0f0f0;
    border-radius: 8px;
    margin-bottom: 1rem;
`;

const StyledUserInfo = styled.h6`
    margin: 0
`

const AdDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [adDetails, setAdDetails] = useState<AdDetailsType>();
    const [similarAds, setSimilarAds] = useState<AdDetailsType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { user } = useUser();
    const isOwner = user && adDetails && user.id === adDetails.owner.id;

    useEffect(() => {

        setLoading(true);
        axiosInstance.get(`/ad/${id}/`)
            .then(response => {
                setAdDetails(response.data);
            })
            .then(response => {
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching ad details:', error);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }
    const handleEditClick = () => {
        window.location.href = `/edit/${id}`;
    };

    return (
        <CustomLayout>
            <Container className="py-5">
                <Row className="mt-5">
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <StyledCarousel autoplay>
                            {adImages.map((src, index) => (
                                <div key={index}>
                                    <img src={adDetails?.imageUrl} alt={`Ad ${index + 1}`} />
                                </div>
                            ))}
                        </StyledCarousel>
                        <h3>Description</h3>
                        <p>{adDetails?.description}</p>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <StyledOwnerInfo>
                            <Row gutter={[16, 16]}>
                                <Col span={24}>
                                    <div className="d-flex align-items-center">
                                        <UserOutlined style={{ marginRight: '8px', fontSize: '20px' }} />
                                        <StyledUserInfo>{adDetails?.owner.first_name} {adDetails?.owner?.last_name}</StyledUserInfo>
                                    </div>
                                </Col>
                                <Col span={24}>
                                    <div className="d-flex align-items-center">
                                        <MailOutlined style={{ marginRight: '8px', fontSize: '20px' }} />
                                        <StyledUserInfo > {adDetails?.owner?.email}</StyledUserInfo>
                                    </div>
                                </Col>
                                <Col span={24}>
                                    <div className="d-flex align-items-center">
                                        <PhoneOutlined style={{ marginRight: '8px', fontSize: '20px' }} />
                                        <StyledUserInfo > {adDetails?.owner?.phone_number}</StyledUserInfo>
                                    </div>
                                </Col>
                            </Row>
                        </StyledOwnerInfo>
                        <StyledAdInfo>
                            <div className="d-flex justify-content-between">
                                <h4>Ad Details</h4>

                                {isOwner && (
                                    <Button type="primary" onClick={handleEditClick}>
                                        Edit Ad
                                    </Button>
                                )}
                            </div>
                            <p><strong>Title:</strong> {adDetails?.title}</p>
                            <p><strong>Ad Type:</strong> {adDetails?.ad_type}</p>
                            <p><strong>Location:</strong> {adDetails?.location}</p>
                            <p><strong>Price:</strong> {adDetails?.price}</p>
                            <p><strong>Address:</strong> {adDetails?.address}</p>
                            <p><strong>Category:</strong> {adDetails?.category}</p>
                        </StyledAdInfo>
                    </Col>
                </Row>

                <h3 className="mt-5">Similar Ads</h3>
                <Row gutter={[16, 16]}>
                    {[...Array(4)].map((_, index) => (
                        <Col key={index} xs={24} sm={12} md={12} lg={8} xl={6}>
                            <AdCard
                                title={`Ad Title ${index + 1}`}
                                imageUrl={`https://via.placeholder.com/150`}
                                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                                price={Math.floor(Math.random() * 5) + 1}
                            />
                        </Col>
                    ))}
                </Row>

            </Container>
        </CustomLayout>
    );
};

// Wrap the AdDetails component with withParams to access URL parameters
export default withParams(AdDetails);
