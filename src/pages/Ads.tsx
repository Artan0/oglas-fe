import React, { useState, useEffect } from "react";
import axiosInstance from "../api";
import CustomLayout from "../layouts/layout";
import { Row, Col, Input, Select, DatePicker } from "antd";
import { Container } from "react-bootstrap";
import AdCard from "../components/AdCard";
import styled from "styled-components";
import moment, { Moment } from "moment";
import { Ad } from "../types/Ad";
import { Pagination } from "@mui/material";

const { Option } = Select;

const StyledInput = styled(Input)`
    margin-top: 1rem;
    margin-bottom: 1rem;
`;

const FormDiv = styled.div`
    width: 90%;
`;

const StyledDiv = styled.div`
    display: flex;
    justify-content: space-between;
`;

interface Filters {
    car_type: string;
    priceFrom: number | undefined;
    priceTo: number | undefined;
    location: string;
    manufacturer: string;
    yearFrom: number | undefined;
    yearTo: number | undefined;
    mileageFrom: number | undefined;
    mileageTo: number | undefined;
    color: string;
    fuelType: string;
    adType: string;
    fromDate: string | null;
    toDate: string | null;
}

const Ads: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [ads, setAds] = useState<Ad[]>([]);
    const [filters, setFilters] = useState<Filters>({
        priceFrom: undefined,
        priceTo: undefined,
        location: "",
        manufacturer: "",
        yearFrom: undefined,
        yearTo: undefined,
        mileageFrom: undefined,
        mileageTo: undefined,
        color: "",
        fuelType: "",
        adType: "",
        car_type: "",
        fromDate: null,
        toDate: null,
    });

    const [page, setPage] = useState<number>(1);
    const [cities, setCities] = useState<string[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [manufacturers, setManufacturers] = useState<string[]>([]);
    const [fuels, setFuels] = useState<string[]>([]);
    const [car_types, setCarTypes] = useState<string[]>([]);
    const [colors, setColors] = useState<string[]>([]);
    const [adTypes, setAdTypes] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const dateFormat = 'YYYY-MM-DD';

    useEffect(() => {
        const fetchChoices = async () => {
            try {
                const response = await axiosInstance.get("/api/choices/");
                const { cities, categories, manufacturers, fuels, car_types, colors, ad_types } = response.data;

                setCities(cities.map((city: any[]) => city[0]));
                setCategories(categories.map((category: any[]) => category[0]));
                setManufacturers(manufacturers.map((manufacturer: any[]) => manufacturer[0]));
                setFuels(fuels.map((fuel: any[]) => fuel[0]));
                setCarTypes(car_types.map((car_type: any[]) => car_type[0]));
                setColors(colors.map((color: any[]) => color[0]));
                setAdTypes(ad_types.map((type: any[]) => type[0]));

            } catch (error) {
                console.error("Error fetching choices:", error);
            }
        };

        fetchChoices();
    }, []);


    const fetchAds = () => {
        const params = new URLSearchParams();

        Object.keys(filters).forEach(key => {
            const value = (filters as any)[key];
            if (value !== null && value !== undefined && value !== '') {
                params.append(key, value.toString());
            }
        });
        params.append('page', currentPage.toString());

        axiosInstance.get(`/ads?${params.toString()}`)
            .then(response => {
                setAds(response.data.results);
                setTotalPages(response.data.total_pages);
                const queryString = params.toString();
                const newUrl = `${window.location.pathname}?${queryString}`;
                window.history.pushState(null, '', newUrl);
            })
            .catch(error => {
                console.error("There was an error fetching the ads!", error);
                setAds([]);
            });
    };


    useEffect(() => {
        fetchAds();
        console.log(dateFormat);

    }, [filters, currentPage]);


    const handleFilterChange = (name: string, value: any) => {
        if (name === 'priceFrom' || name === 'priceTo' || name === 'mileageFrom' || name === 'mileageTo') {
            value = parseFloat(value);
            if (isNaN(value)) value = 0;
        }

        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value
        }));
        setPage(1);
    };

    const handleDateChange = (name: string, date: Moment | null, dateString: string | string[]) => {
        if (Array.isArray(dateString)) {
            const concatenatedDateString = dateString.join(', ');
            setFilters(prevFilters => ({
                ...prevFilters,
                [name]: concatenatedDateString
            }));
        } else {
            setFilters(prevFilters => ({
                ...prevFilters,
                [name]: dateString
            }));
        }
    };


    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };

    return (
        <CustomLayout>
            <Container className="py-5">
                <Row className="mt-5">
                    <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                        <FormDiv>
                            <h3>Search by</h3>
                            <Input.Group compact>
                                <div className="d-flex justify-content-between">
                                    <StyledInput size="large" style={{ width: '45%' }} placeholder="Price From" value={filters.priceFrom} onChange={(e) => handleFilterChange('priceFrom', e.target.value)} />
                                    <StyledInput size="large" style={{ width: '45%' }} placeholder="Price To" value={filters.priceTo} onChange={(e) => handleFilterChange('priceTo', e.target.value)} />

                                </div>
                                <Select className="mt-3 w-100" size="large" placeholder="Location" value={filters.location || undefined} onChange={(value) => handleFilterChange('location', value)}>
                                    <Option value="">All </Option>

                                    {cities.map((city, index) => (
                                        <Option key={index} value={city}>{city}</Option>
                                    ))}
                                </Select>

                                <Select
                                    size="large"
                                    className="mt-3"
                                    value={selectedCategory || undefined}
                                    onChange={(value) => { setSelectedCategory(value); handleFilterChange('category', value); }}
                                    style={{ width: '100%' }}
                                    placeholder="Please select an option"
                                >
                                    <Option value="">All </Option>

                                    {categories.map((category, index) => (
                                        <Option key={index} value={category}>{category}</Option>
                                    ))}
                                </Select>

                                <Select
                                    size="large"
                                    value={filters.adType || undefined}
                                    onChange={(value) => { handleFilterChange('adType', value); }}
                                    style={{ marginTop: '1rem', width: '100%' }}
                                    placeholder="Please select an option"
                                >
                                    <Option value="">All</Option>

                                    {adTypes.map((type, index) => (
                                        <Option key={index} value={type}>{type}</Option>
                                    ))}
                                </Select>


                                {selectedCategory === "car" && (
                                    <div>
                                        <StyledDiv>
                                            <Select className="mt-3 w-100" size="large" placeholder="Manufacturer" value={filters.manufacturer || undefined} onChange={(value) => handleFilterChange('manufacturer', value)}>
                                                <Option value="">All </Option>

                                                {manufacturers.map((manufacturer, index) => (
                                                    <Option key={index} value={manufacturer}>{manufacturer}</Option>
                                                ))}
                                            </Select>
                                        </StyledDiv>
                                        <StyledDiv>
                                            <Select className="mt-3" placeholder="Car"
                                                size="large" value={filters.car_type || undefined} onChange={(value) => { handleFilterChange('car_type', value); }}>
                                                <Option value="">All </Option>

                                                {car_types.map((car_type, index) => (
                                                    <Option key={index} value={car_type}>{car_type}</Option>
                                                ))}
                                            </Select>
                                            <Select className="mt-3" placeholder="Fuel"
                                                size="large" value={filters.fuelType || undefined} onChange={(value) => { handleFilterChange('fuelType', value); }}>
                                                <Option value="">All </Option>

                                                {fuels.map((fuel, index) => (
                                                    <Option key={index} value={fuel}>{fuel}</Option>
                                                ))}
                                            </Select>

                                            <Select className="mt-3" placeholder="Color" size="large" value={filters.color || undefined} onChange={(value) => handleFilterChange('color', value)}>
                                                <Option value="">All </Option>
                                                {colors.map((color, index) => (
                                                    <Option key={index} value={color}>{color}</Option>
                                                ))}
                                            </Select>

                                        </StyledDiv>
                                        <div className="d-flex justify-content-between">
                                            <StyledInput size="large" style={{ width: '45%' }} placeholder="Mileage From" value={filters.mileageFrom} onChange={(e) => handleFilterChange('mileageFrom', e.target.value)} />
                                            <StyledInput size="large" style={{ width: '45%' }} placeholder="Mileage To" value={filters.mileageTo} onChange={(e) => handleFilterChange('mileageTo', e.target.value)} />

                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <StyledInput size="large" style={{ width: '45%' }} placeholder="Year From" value={filters.yearFrom} onChange={(e) => handleFilterChange('yearFrom', e.target.value)} />
                                            <StyledInput size="large" style={{ width: '45%' }} placeholder="Year To" value={filters.yearTo} onChange={(e) => handleFilterChange('yearTo', e.target.value)} />

                                        </div>
                                    </div>
                                )}
                                <DatePicker
                                    className="mt-3 w-100"
                                    size="large"
                                    placeholder="From Date"
                                    value={filters.fromDate ? moment(filters.fromDate, dateFormat) : null}
                                    onChange={(date, dateString) => handleDateChange('fromDate', date, dateString)}
                                    format={dateFormat}
                                />


                                <DatePicker
                                    className="mt-3 w-100"
                                    size="large"
                                    placeholder="To Date"
                                    value={filters.toDate ? moment(filters.toDate, dateFormat) : null}
                                    onChange={(date, dateString) => handleDateChange('toDate', date, dateString)}
                                    format={dateFormat}
                                />


                            </Input.Group>
                        </FormDiv>
                    </Col>
                    <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                        <div className="d-flex justify-content-between">
                            <Input.Search size="large" className="w-50" placeholder="Search by title" />
                            <Select size="large" defaultValue="newest">
                                <Option value="newest">Newest</Option>
                                <Option value="oldest">Oldest</Option>
                                <Option value="priceLowToHigh">Price: Low to High</Option>
                                <Option value="priceHighToLow">Price: High to Low</Option>
                            </Select>
                        </div>

                        <Row gutter={[16, 16]}>
                            {ads && ads.length > 0 ? (
                                ads.map((ad, index) => (
                                    <Col key={index} xs={24} sm={12} md={12} lg={8} xl={8}>
                                        <AdCard
                                            title={ad.title}
                                            imageUrl={ad.imageUrl || `https://via.placeholder.com/150`}
                                            description={ad.description}
                                            price={ad.price}
                                            rating={ad.rating}
                                        />
                                    </Col>
                                ))) : (
                                <p>No ads found.</p>
                            )}
                        </Row>
                        <div className="d-flex justify-content-center mt-5" >
                            <Pagination
                                count={totalPages}
                                page={currentPage}
                                onChange={handlePageChange}
                                variant="outlined"
                                shape="rounded"
                                color="primary"
                            />

                        </div>
                    </Col>
                </Row>
            </Container>
        </CustomLayout>
    );
};

export default Ads;
