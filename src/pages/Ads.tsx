import { Component } from "react";
import CustomLayout from "../layouts/layout";
import { Row, Col, Input, Select, DatePicker } from "antd";
import { Container } from "react-bootstrap";
import AdCard from "../components/AdCard";
import styled from "styled-components";

const { Option } = Select;

const StyledInput = styled(Input)`
    margin-top: 1rem;
    margin-bottom: 1rem;
`;
const FormDiv = styled.div`
    width: 90%;
`
const StyledDiv = styled.div`
    display:flex;
    justify-content:space-between;
`

class Ads extends Component {
    state = {
        selectedCategory: "house",
    };

    handleCategoryChange = (value: any) => {
        this.setState({ selectedCategory: value });
    };

    render() {
        const { selectedCategory } = this.state;

        return (
            <CustomLayout>
                <Container className="py-5">
                    <Row className="mt-5">
                        <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                            <FormDiv>
                                <h3>Search by</h3>
                                <Input.Group compact>
                                    <div className="d-flex justify-content-between">
                                        <StyledInput size="large" style={{ width: '45%' }} placeholder="Price" />
                                        <Select className="mt-3" size="large" placeholder="Location" style={{ width: '45%' }}>
                                            <Option value="car">Skopje</Option>
                                            <Option value="house">Tetovo</Option>
                                        </Select>
                                    </div>
                                    <Select className="mt-3" size="large" value={selectedCategory} placeholder="Category" style={{ width: '100%' }} onChange={this.handleCategoryChange}>
                                        <Option value="car">Car</Option>
                                        <Option value="house">House</Option>
                                    </Select>
                                    {selectedCategory === "car" && (
                                        <div>
                                            <StyledDiv>
                                                <Select className="mt-3 w-100" size="large" placeholder="Manufacturer">
                                                    <Option value="mercedes">Mercedes</Option>
                                                </Select>
                                            </StyledDiv>
                                            <StyledDiv> <StyledInput style={{ width: '45%' }} size="large" placeholder="Year From" />
                                                <StyledInput style={{ width: '45%' }} size="large" placeholder="Year To" />
                                            </StyledDiv>
                                            <StyledDiv>
                                                <StyledInput style={{ width: '45%' }} size="large" placeholder="Mileage From" />
                                                <StyledInput style={{ width: '45%' }} size="large" placeholder="Mileage To" />
                                            </StyledDiv>
                                            <StyledDiv>
                                                <Select style={{ width: '45%' }} className="mt-3" size="large" placeholder="Color">
                                                    <Option value="black">Black</Option>
                                                    <Option value="white">White</Option>
                                                    <Option value="red">Red</Option>
                                                    <Option value="blue">Blue</Option>
                                                </Select>

                                                <Select style={{ width: '45%' }} className="mt-3" size="large" placeholder="Fuel Type">
                                                    <Option value="petrol">Petrol</Option>
                                                    <Option value="diesel">Diesel</Option>
                                                    <Option value="electric">Electric</Option>
                                                </Select>
                                            </StyledDiv>
                                        </div>
                                    )}
                                    <Select className="mt-3" size="large" placeholder="Ad Type">
                                        <Option value="rent">Rent</Option>
                                        <Option value="sale">For Sale</Option>
                                    </Select>
                                    <DatePicker size="large" placeholder="From Date" style={{ width: '100%', marginTop: '1rem' }} />
                                    <DatePicker size="large" placeholder="To Date" style={{ width: '100%', marginTop: '1rem' }} />
                                </Input.Group>
                            </FormDiv>
                        </Col>
                        <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                            <div className="d-flex justify-content-between">
                                <Input.Search size="large" className="w-50" placeholder="Search by title" />
                                <Select size="large" defaultValue="Newest">
                                    <Option value="newest">Newest</Option>
                                    <Option value="oldest">Oldest</Option>
                                    <Option value="priceLowToHigh">Price: Low to High</Option>
                                    <Option value="priceHighToLow">Price: High to Low</Option>
                                </Select>
                            </div>

                            <Row gutter={[16, 16]}>
                                {[...Array(8)].map((_, index) => (
                                    <Col key={index} xs={24} sm={12} md={12} lg={8} xl={8}>
                                        <AdCard
                                            title={`Ad Title ${index + 1}`}
                                            imageUrl={`https://via.placeholder.com/150`}
                                            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                                            price={Math.floor(Math.random() * 5) + 1}
                                            rating={Math.floor(Math.random() * 5) + 1}
                                        />
                                    </Col>
                                ))}
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </CustomLayout>
        );
    }
}

export default Ads;
