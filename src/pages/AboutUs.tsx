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
                                    "Lorem ipsum dolor sit amet.",
                                    2000,
                                    " Vestibulum et mauris vel ante finibus maximus nec ut leo",
                                    2000,
                                    " scelerisque libero, a tincidunt leo gravida non. Proin fermentum felis at nisl",
                                    2000,
                                    " auctor, in elementum libero convallis."
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
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac leo nunc.
                                Vestibulum et mauris vel ante finibus maximus nec ut leo. Integer consectetur
                                scelerisque libero, a tincidunt leo gravida non. Proin fermentum felis at nisl
                                auctor, in elementum libero convallis.
                            </p>
                        </Col>
                        <Col xs={24} md={12}>
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
                                <Meta title="Card Title 1" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Card
                                hoverable
                                style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}
                                cover={<img alt="example" src={brainstormImage} style={{ height: '250px', width: '100%', objectFit: 'contain' }} />}
                            >
                                <Meta title="Card Title 2" description="Curabitur ac leo nunc. Vestibulum et mauris vel ante finibus maximus." />
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} md={8}>
                            <Card
                                hoverable
                                style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}
                                cover={<img alt="example" src={teamWorkImage} style={{ height: '250px', width: '100%', objectFit: 'contain' }} />}
                            >
                                <Meta title="Card Title 3" description="Proin fermentum felis at nisl auctor, in elementum libero convallis." />
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </CustomLayout>
        );
    }
}

export default AboutUs;
