import { useEffect, useState } from "react";
import CustomLayout from "../layouts/layout";
import { Row, Col, Carousel, Typography, Button } from "antd";
import { Container } from "react-bootstrap";
import AdCard from "../components/AdCard";
import styled from "styled-components";
import withParams from "../components/HOC";
import axiosInstance from "../api";
import { useParams } from "react-router-dom";
import type { AdDetails as AdDetailsType } from "../types/Ad-detail";
import { useUser } from "../context/User-context";
import { PersonOutline, MailOutline, PhoneOutlined, LocationOnOutlined, AttachMoneyOutlined, HomeOutlined, CategoryOutlined } from "@mui/icons-material";

const StyledCarousel = styled(Carousel)`
    margin-bottom: 1rem;
    padding-right: 1rem;

    .slick-slide {
        text-align: center;
        overflow: hidden;

        img {
            width: 100%;
            height: 400px;
            object-fit: cover;
            border-radius: 8px;
        }
    }

    .slick-dots {
        bottom: -30px;

        li {
            width: 12px;
            height: 12px;

            button {
                width: 12px;
                height: 12px;
                background-color: rgba(0, 0, 0, 0.25);
                border-radius: 50%;
            }

            &.slick-active button {
                background-color: rgba(0, 0, 0, 0.75);
            }
        }
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
    margin: 0;
`;

const AdDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [adDetails, setAdDetails] = useState<AdDetailsType>();
    const [similarAds, setSimilarAds] = useState<AdDetailsType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { user } = useUser();
    const isOwner = user && adDetails && user.id === adDetails.owner.id;

    useEffect(() => {
        const fetchAdDetails = async () => {
            setLoading(true);
            try {
                const response = await axiosInstance.get(`/ad/${id}/`);
                setAdDetails(response.data);
                fetchSimilarAds(response.data.id);
            } catch (error) {
                console.error('Error fetching ad details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAdDetails();
    }, [id]);

    const fetchSimilarAds = async (adId: string) => {
        try {
            const response = await axiosInstance.get(`/ads/similar/${adId}/`);
            setSimilarAds(response.data);
        } catch (error) {
            console.error('Error fetching similar ads:', error);
        }
    };

    if (loading || !adDetails) {
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
                            {adDetails.image_urls.map((imageUrl, index) => (
                                <div key={index}>
                                    <img src={imageUrl} alt={`Ad ${index + 1}`} />
                                </div>
                            ))}
                        </StyledCarousel>
                        <h3>Description</h3>
                        <p>{adDetails.description}</p>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <StyledOwnerInfo>
                            <Row gutter={[16, 16]}>
                                <Col span={24}>
                                    <div className="d-flex align-items-center">
                                        <PersonOutline style={{ marginRight: '8px', fontSize: '20px' }} />
                                        <StyledUserInfo>{adDetails.owner.first_name} {adDetails.owner?.last_name}</StyledUserInfo>
                                    </div>
                                </Col>
                                <Col span={24}>
                                    <div className="d-flex align-items-center">
                                        <MailOutline style={{ marginRight: '8px', fontSize: '20px' }} />
                                        <StyledUserInfo>{adDetails.owner?.email}</StyledUserInfo>
                                    </div>
                                </Col>
                                <Col span={24}>
                                    <div className="d-flex align-items-center">
                                        <PhoneOutlined style={{ marginRight: '8px', fontSize: '20px' }} />
                                        <StyledUserInfo>{adDetails.owner?.phone_number || 'no phone number'}</StyledUserInfo>
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
                            <p><strong>Title:</strong> {adDetails.title}</p>
                            <p><strong>Ad Type:</strong> {adDetails.ad_type}</p>
                            <p><strong><LocationOnOutlined /> Location:</strong> {adDetails.location}</p>
                            <p><strong><AttachMoneyOutlined /> Price:</strong> {adDetails.price}</p>
                            <p><strong><HomeOutlined /> Address:</strong> {adDetails.address}</p>
                            <p><strong><CategoryOutlined /> Category:</strong> {adDetails.category}</p>
                        </StyledAdInfo>
                    </Col>
                </Row>

                <h3 className="mt-5">Similar Ads</h3>
                <Row gutter={[16, 16]}>
                    {similarAds.map((ad, index) => (
                        <Col key={index} xs={24} sm={12} md={12} lg={8} xl={6}>
                            <AdCard
                                id={ad.id}
                                title={ad.title}
                                imageUrls={ad.image_urls}
                                description={ad.description}
                                price={ad.price}
                            />
                        </Col>
                    ))}
                </Row>
            </Container>
        </CustomLayout>
    );
};

export default withParams(AdDetails);
