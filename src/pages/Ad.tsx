import { Component } from "react";
import CustomLayout from "../layouts/layout";
import { Row, Col, Carousel, Card } from "antd";
import { Container } from "react-bootstrap";
import AdCard from "../components/AdCard";
import styled from "styled-components";
import withParams from "../components/HOC";
const { Meta } = Card;

const adImages = [
    "https://via.placeholder.com/800x400",
    "https://via.placeholder.com/800x400",
    "https://via.placeholder.com/800x400"
];

const adDetails = {
    mileage: "50,000 miles",
    fuel: "Petrol",
    adType: "For Sale",
    location: "Skopje",
    color: "Red",
    gearBox: "Automatic",
    manufacturer: "Mercedes",
    model: "C-Class"
};

const ownerDetails = {
    name: "John Doe",
    phone: "+1234567890",
    email: "johndoe@example.com",
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
};

const adDescription = "This is a great car with excellent features and performance. Well maintained and in excellent condition.";

const StyledCarousel = styled(Carousel)`
    margin-bottom: 1rem;
    padding-right:1rem;
`;

const StyledAdInfo = styled.div`
    padding: 1rem;
    background-color: #f7f7f7;
    border-radius: 8px;
    margin-bottom: 1rem;
`;

const StyledOwnerInfo = styled.div`
    padding: 1rem;
    background-color: #f0f0f0;
    border-radius: 8px;
    margin-bottom: 1rem;
`;

class Ad extends Component<any> {
    render() {
        const { params } = this.props;
        const adId = params.id;
        console.log(`Ad ID: ${adId}`);

        return (
            <CustomLayout>
                <Container className="py-5">
                    <Row className="mt-5">
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <StyledCarousel autoplay>
                                {adImages.map((src, index) => (
                                    <div key={index}>
                                        <img src={src} alt={`Ad ${index + 1}`} style={{ width: "100%", borderRadius: '8px' }} />
                                    </div>
                                ))}
                            </StyledCarousel>
                            <h3>Description</h3>
                            <p>{adDescription}</p>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <StyledOwnerInfo>
                                <h4>Owner Information</h4>
                                <p><strong>Name:</strong> {ownerDetails.name}</p>
                                <p><strong>Phone:</strong> {ownerDetails.phone}</p>
                                <p><strong>Email:</strong> {ownerDetails.email}</p>
                                <p><strong>Message:</strong> {ownerDetails.message}</p>
                            </StyledOwnerInfo>
                            <StyledAdInfo>
                                <h4>Ad Details</h4>
                                <p><strong>Mileage:</strong> {adDetails.mileage}</p>
                                <p><strong>Fuel:</strong> {adDetails.fuel}</p>
                                <p><strong>Ad Type:</strong> {adDetails.adType}</p>
                                <p><strong>Location:</strong> {adDetails.location}</p>
                                <p><strong>Color:</strong> {adDetails.color}</p>
                                <p><strong>Gear Box:</strong> {adDetails.gearBox}</p>
                                <p><strong>Manufacturer:</strong> {adDetails.manufacturer}</p>
                                <p><strong>Model:</strong> {adDetails.model}</p>
                            </StyledAdInfo>
                        </Col>
                    </Row>
                    <h3 className="mt-5">Similar Ads</h3>
                    <Row gutter={[16, 16]}>
                        {[...Array(4)].map((_, index) => (
                            <Col key={index} xs={24} sm={12} md={12} lg={8} xl={6}>
                                <AdCard
                                    title={`Ad Title ${index + 1}`}
                                    image={`https://via.placeholder.com/150`}
                                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                                    price={`$${(Math.random() * 10000).toFixed(2)}`}
                                    rating={Math.floor(Math.random() * 5) + 1}
                                />
                            </Col>
                        ))}
                    </Row>
                </Container>
            </CustomLayout>
        );
    }
}

// Wrap the Ad component with withParams to access URL parameters
export default withParams(Ad);
