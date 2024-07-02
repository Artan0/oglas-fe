import React, { Component } from "react";
import { Row, Col, Card } from 'antd';
import { Container } from 'react-bootstrap';
import CustomLayout from "../layouts/layout";
import Typical from 'react-typical';
import streetImage from '../assets/images/street.png';
import teamWorkImage from '../assets/images/teamwork.png';
import peopleImage from '../assets/images/poeple.png';
import brainstormImage from '../assets/images/brainstorm.png';

const { Meta } = Card;

class AboutUs extends Component {
    render() {
        return (
            <CustomLayout>
                <Container className="py-5">
                    <Row className="my-5 text-center d-flex justify-content-center">
                        <Col className="mt-5" span={18}>
                            <h1>Lorem ipsum</h1>
                            <h5> <Typical
                                steps={[
                                    "Excellent user experience.",
                                    2000,
                                    "Innovation, integrity, and teamwork at our core.",
                                    2000,
                                    "Committed to building a better future.",
                                    2000,
                                    "Your satisfaction is our mission."
                                ]}
                                loop={1}
                                wrapper="span"
                            /></h5>
                        </Col>
                    </Row>
                    <Row className="d-flex align-items-center" gutter={[16, 16]}>
                        <Col xs={24} md={12}>
                            <h2>About Us</h2>
                            <p>
                                Our team has consistently provided top-notch services to our clients.
                                Our team is dedicated to innovation and excellence, ensuring that we meet and exceed our customers'
                                expectations. We believe in building strong relationships with our clients and partners, fostering
                                a collaborative and supportive environment.
                            </p>
                        </Col>
                        <Col className="d-flex justify-content-center" xs={24} md={12}>
                            <img
                                src={peopleImage}
                                alt="About Us"
                                style={{ width: '75%', height: 'auto' }}
                            />
                        </Col>
                    </Row>

                    <Row gutter={[16, 16]} style={{ marginTop: '40px' }}>
                        <Col xs={24} sm={12} md={8}>
                            <Card
                                hoverable
                                style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}
                                cover={<img alt="example" src={streetImage} style={{ height: '250px', width: '100%', objectFit: 'contain' }} />}
                            >
                                <Meta title="Our Journey" description="From humble beginnings to industry leaders, our journey has been marked by growth and success." />
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Card
                                hoverable
                                style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}
                                cover={<img alt="example" src={brainstormImage} style={{ height: '250px', width: '100%', objectFit: 'contain' }} />}
                            >
                                <Meta title="Our Vision" description="To be the most trusted and innovative service provider, delivering unparalleled value to our clients." />
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Card
                                hoverable
                                style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}
                                cover={<img alt="example" src={teamWorkImage} style={{ height: '250px', width: '100%', objectFit: 'contain' }} />}
                            >
                                <Meta title="Our Team" description="A diverse group of professionals committed to achieving excellence and making a difference." />
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </CustomLayout>
        );
    }
}

export default AboutUs;
