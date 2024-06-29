import React, { Component } from "react";
import { Form, Select, Input, Button, Row, Col } from "antd";
import styled from "styled-components";
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomLayout from "../layouts/layout";
import AdCard from "../components/AdCard";
import { Container } from "react-bootstrap";
import axiosInstance from "../api";
import rentCarImage from "../assets/images/rent_car.png";
import coloredMapImage from "../assets/images/colored_map.jpg";
import carImage from "../assets/images/car.jpg";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import { Ad } from "../types/Ad";

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
  margin-bottom: 2rem;
  height: 11rem;

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
  color: #fff;
  z-index: 2;
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
  border-radius: 35px;
  margin-top: -45px;
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
  @media (max-width: 1024px) {
    width:90%;
    }
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
  padding: 5px;
  @media (max-width: 482px){
    font-size:26px;
  }
`;

const StyledText = styled.div`
    width:90%;
    padding:5px
    @media (max-width: 1024px) {
        width: 100%;
        padding: 5px;
    }
`
const StyledCol = styled(Col)`
    display:flex;
    justify-content:center;
    text-align:center;
`

const dummyAds = [
    {
        title: "Ad 1",
        imageUrls: ["https://thumbor.forbes.com/thumbor/fit-in/x/https://www.forbes.com/advisor/wp-content/uploads/2021/08/download-7.jpg"],
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        price: 100,
        rating: 4.5
    },
    {
        title: "Ad 2",
        imageUrls: ["https://thumbor.forbes.com/thumbor/fit-in/x/https://www.forbes.com/advisor/wp-content/uploads/2021/08/download-7.jpg"],
        description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        price: 150,
        rating: 3.5
    },
    {
        title: "Ad 3",
        imageUrls: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6tcD5h90YTk2sVcruvpVJ49YsR5H8o-Bl74I6VdrjIg&s"],
        description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        price: 200,
        rating: 2.5
    },
    {
        title: "Ad 4",
        imageUrls: ["https://thumbor.forbes.com/thumbor/fit-in/x/https://www.forbes.com/advisor/wp-content/uploads/2021/08/download-7.jpg"],
        description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        price: 120,
        rating: 1.5
    }
];


interface HomeState {
    navigate: NavigateFunction;
    categories: string[];
    cities: string[];
    selectedCategory: string;
    selectedLocation: string;
    searchTitle: string;
    featuredAds: Ad[];
}

class LandingPage extends Component<HomeState> {
    state: HomeState = {
        navigate: this.props.navigate,
        categories: [],
        cities: [],
        selectedCategory: "",
        selectedLocation: "",
        searchTitle: "",
        featuredAds: []
    };


    componentDidMount() {
        this.fetchChoices();
        this.fetchFeaturedAds();
    }

    fetchChoices = async () => {
        try {
            const response = await axiosInstance.get("/api/choices/");
            const { cities, categories } = response.data;

            this.setState({
                cities: cities.map((city: any[]) => city[0]),
                categories: categories.map((category: any[]) => category[0])
            });
        } catch (error) {
            console.error("Error fetching choices:", error);
        }
    };


    fetchFeaturedAds = async () => {
        try {
            const response = await axiosInstance.get("/ads/featured/");
            this.setState({ featuredAds: response.data });
        } catch (error) {
            console.error("Error fetching featured ads:", error);
        }
    };

    handleSearch = () => {
        const { selectedCategory, selectedLocation, searchTitle } = this.state;
        const queryParams = new URLSearchParams();

        if (selectedCategory) queryParams.append("category", selectedCategory);
        if (selectedLocation) queryParams.append("location", selectedLocation);
        if (searchTitle) queryParams.append("search", searchTitle);

        this.props.navigate(`/ads?${queryParams.toString()}`);
    };


    handleChange = (name: any, value: any) => {
        this.setState({ [name]: value });
    };


    render() {
        return (
            <CustomLayout>
                <LandingPageContainer className="pt-3">
                    <ImageContainer className="mt-5">
                        <Slogan>Your Slogan Goes Here</Slogan>
                        <SearchForm className="mt-4" layout="inline" onFinish={this.handleSearch}>
                            <FormItem style={{ margin: 0 }} name="category">
                                <Select size="large" placeholder="Select Category" style={{ width: 200 }} onChange={(value) => this.handleChange('selectedCategory', value)}>
                                    {this.state.categories.map((category, index) => (
                                        <Option key={index} value={category}>{category}</Option>
                                    ))}
                                </Select>
                            </FormItem>
                            <FormItem style={{ margin: 0 }} name="location">
                                <Select size="large" placeholder="Select Location" style={{ width: 200 }} onChange={(value) => this.handleChange('selectedLocation', value)}>
                                    {this.state.cities.map((city, index) => (
                                        <Option key={index} value={city}>{city}</Option>
                                    ))}
                                </Select>
                            </FormItem>
                            <FormItem style={{ margin: 0 }} name="text">
                                <Input size="large" placeholder="Search..." style={{ width: 200 }} onChange={(e) => this.handleChange('searchTitle', e.target.value)} />
                            </FormItem>
                            <FormItem style={{ margin: 0 }}>
                                <SearchButton size="large" type="primary" htmlType="submit" icon={<SearchOutlined />} iconPosition="end">
                                    Find Now
                                </SearchButton>
                            </FormItem>
                        </SearchForm>
                    </ImageContainer>
                </LandingPageContainer>
                <Container>
                    <StyledRow className="my-5">
                        {this.state.featuredAds.map((ad, index) => (
                            <Col className="mt-2" key={index} xs={24} sm={12} md={8} lg={6}>
                                <AdCard
                                    id={ad.id}
                                    title={ad.title}
                                    imageUrls={ad.image_urls || `https://via.placeholder.com/150`}
                                    description={ad.description}
                                    price={ad.price}
                                    isCar={ad.category === "car"}
                                    car_details={ad.car_details}
                                />
                            </Col>
                        ))}
                    </StyledRow>
                    <Row className="d-flex align-items-center my-5">
                        <StyledCol className="col-lg-6 col-md-6 col-sm-12">
                            <StyledText >
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
                            </StyledText>
                        </StyledCol>
                        <Col className="col-lg-6 col-md-6 col-sm-12">
                            <div>
                                <img style={{ width: '100%', height: 'auto' }} src={rentCarImage} alt="rentcar" />
                            </div>
                        </Col>
                    </Row>
                </Container>
                <StatsRow>
                    <StatsColumn>
                        <h1>3+</h1>
                        <h2>Years in business</h2>
                    </StatsColumn>
                    <StatsDivider />
                    <StatsColumn>
                        <h1>3K+</h1>
                        <h2>Ads shared</h2>
                    </StatsColumn>
                    <StatsDivider />
                    <StatsColumn>
                        <h1>20K+</h1>
                        <h2>Users</h2>
                    </StatsColumn>
                </StatsRow>
                <Container>
                    <Row className="d-flex align-items-center my-5">
                        <Col className="col-lg-6 col-md-6 col-sm-12">
                            <div>
                                <img style={{ width: '100%', height: 'auto' }} src={rentCarImage} alt="rentcar" />
                            </div>
                        </Col>
                        <StyledCol className="col-lg-6 col-md-6 col-sm-12">
                            <StyledText>
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
                            </StyledText>
                        </StyledCol>
                    </Row>
                </Container>
            </CustomLayout>
        );
    }
}

function withRouter(Component: React.ComponentType<HomeState>) {
    return function WrappedComponent(props: any) {
        const navigate = useNavigate();
        return <Component {...props} navigate={navigate} />;
    };
}

export default withRouter(LandingPage);
