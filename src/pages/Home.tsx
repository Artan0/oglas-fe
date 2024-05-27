import React, { Component } from "react";
import { Form, Select, DatePicker, Input, Button, Row, Col } from "antd";
import styled from "styled-components";
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomLayout from "../layouts/layout";
import AdCard from "../components/AdCard";
import { Container } from "react-bootstrap";
import rentCarImage from "../assets/images/rent_car.jpg"
import coloredMapImage from "../assets/images/colored_map.jpg";
import carImage from "../assets/images/car.jpg"

const { Option } = Select;

const LandingPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #ffffff;
`;

const StyledRow = styled(Row)`
  display: flex;
  justify-content: space-between;
`;

const StatsRow = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
  background: url(${carImage}) no-repeat center center;
  background-size: cover;
  margin-top: 1rem;
  margin-bottom:2rem;
  height:11rem;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url(${carImage}) no-repeat center center;
    background-size: cover;
    filter: blur(3px);
    z-index: 1;
  }
`;

const StatsColumn = styled.div`
  flex: 1;
  text-align: center;
`;

const StatsDivider = styled.div`
  width: 1px;
  height: 70px;
  background-color: #fff;
`;

const ImageContainer = styled.div`
  width: 95%;
  height: 90%;
  background: url(${coloredMapImage}) no-repeat center center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
`;

const SearchForm = styled(Form)`
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
`;

const FormItem = styled(Form.Item)`
  flex: 1 1 100%;
  @media (min-width: 576px) {
    flex: 1 1 auto;
  }
`;

const SearchButton = styled(Button)`
  width: 100%;
  @media (min-width: 576px) {
    width: auto;
  }
`;

const Slogan = styled.h1`
  font-size: 40px;
  color: #333;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
  padding:5px;
`;

const dummyAds = [
    {
        title: "Ad 1",
        image: "https://thumbor.forbes.com/thumbor/fit-in/x/https://www.forbes.com/advisor/wp-content/uploads/2021/08/download-7.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        price: "$100",
        rating: 4.5
    },
    {
        title: "Ad 2",
        image: "https://thumbor.forbes.com/thumbor/fit-in/x/https://www.forbes.com/advisor/wp-content/uploads/2021/08/download-7.jpg",
        description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        price: "$150",
        rating: 3.5
    },
    {
        title: "Ad 3",
        image: "https://thumbor.forbes.com/thumbor/fit-in/x/https://www.forbes.com/advisor/wp-content/uploads/2021/08/download-7.jpg",
        description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        price: "$200",
        rating: 2.5
    },
    {
        title: "Ad 4",
        image: "https://thumbor.forbes.com/thumbor/fit-in/x/https://www.forbes.com/advisor/wp-content/uploads/2021/08/download-7.jpg",
        description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        price: "$120",
        rating: 1.5
    }
];

class LandingPage extends Component {
    handleSearch = (values: any) => {
        console.log('Search values:', values);
    };

    render() {
        return (
            <CustomLayout>
                <LandingPageContainer>
                    <ImageContainer>
                        <Slogan>Your Slogan Goes Here</Slogan>
                        <SearchForm className="mt-4" layout="inline" onFinish={this.handleSearch}>
                            <FormItem name="category">
                                <Select size="large" placeholder="Select Category" style={{ width: 200 }}>
                                    <Option value="category1">Category 1</Option>
                                    <Option value="category2">Category 2</Option>
                                    <Option value="category3">Category 3</Option>
                                </Select>
                            </FormItem>
                            <FormItem name="location">
                                <Select size="large" placeholder="Select Location" style={{ width: 200 }}>
                                    <Option value="location1">Location 1</Option>
                                    <Option value="location2">Location 2</Option>
                                    <Option value="location3">Location 3</Option>
                                </Select>
                            </FormItem>
                            <FormItem name="date">
                                <DatePicker size="large" style={{ width: 200 }} />
                            </FormItem>
                            <FormItem name="text">
                                <Input size="large" placeholder="Search..." style={{ width: 200 }} />
                            </FormItem>
                            <FormItem>
                                <SearchButton size="large" type="primary" htmlType="submit">
                                    Find Now
                                </SearchButton>
                            </FormItem>
                        </SearchForm>
                    </ImageContainer>
                </LandingPageContainer>
                <Container>
                    <StyledRow className="my-5">
                        {dummyAds.map((ad, index) => (
                            <Col key={index} xs={24} sm={12} md={8} lg={6}>
                                <AdCard {...ad} />
                            </Col>
                        ))}
                    </StyledRow>
                    <Row className="d-flex align-items-center my-5">
                        <Col span={12}>
                            <div className="w-75">
                                <h1>Text Column Goes Here</h1>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                    sed do eiusmod tempor incididunt ut
                                    labore et dolore magna aliqua
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
                                </p>
                                <Button size="large">
                                    View Rents
                                </Button>
                            </div>
                        </Col>
                        <Col span={12}>
                            <div>
                                <img style={{ width: '100%', height: 'auto' }} src={rentCarImage} alt="rentcar" />
                            </div>
                        </Col>
                    </Row>
                </Container>
                <StatsRow>
                    <StatsColumn style={{ zIndex: 2 }}>
                        <h1 className="text-white">3+</h1>
                        <h2 className="text-white">Years in business</h2>
                    </StatsColumn>
                    <StatsDivider style={{ zIndex: 2 }} />
                    <StatsColumn style={{ zIndex: 2 }}>
                        <h1 className="text-white">3K+</h1>
                        <h2 className="text-white">Ads shared</h2>
                    </StatsColumn>
                    <StatsDivider style={{ zIndex: 2 }} />
                    <StatsColumn style={{ zIndex: 2 }}>
                        <h1 className="text-white">20K+</h1>
                        <h2 className="text-white">Users</h2>
                    </StatsColumn>
                </StatsRow>
                <Container>
                    <Row className="d-flex align-items-center my-5">
                        <Col span={12}>
                            <div>
                                <img style={{ width: '100%', height: 'auto' }} src={rentCarImage} alt="rentcar" />
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className="w-75">
                                <h1>Text Column Goes Here</h1>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                    sed do eiusmod tempor incididunt ut
                                    labore et dolore magna aliqua
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
                                </p>
                                <Button size="large">
                                    View Rents
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </CustomLayout>
        );
    }
}

export default LandingPage;
