import React, { useState, useEffect } from "react";
import axiosInstance from "../api";
import CustomLayout from "../layouts/layout";
import { Row, Col, Input, Select, DatePicker, Button, Spin } from "antd";
import { Container } from "react-bootstrap";
import AdCard from "../components/AdCard";
import styled from "styled-components";
import moment from "moment";
import { Ad } from "../types/Ad";
import { Pagination } from "@mui/material";
import { FunnelPlotOutlined, LoadingOutlined, SearchOutlined } from "@ant-design/icons";
import debounce from "lodash.debounce";
import { useNavigate, useLocation } from "react-router-dom";
const { Option } = Select;

const StyledInput = styled(Input)`
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const FormDiv = styled.div`
  width: 90%;
  margin-top:1rem;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledSearchBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items:center;
  @media (max-width: 768px) {
    margin-top: 1rem;
    width: 100%;
  }
`;

const AdsSection = styled(Row)`
  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
  }
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
    search: string;
    sort: string;
    category: string;
    page: number;
    totalPages: number;
}

const Ads: React.FC = () => {
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
        adType: "sale",
        car_type: "",
        fromDate: null,
        toDate: null,
        search: "",
        sort: "newest",
        category: "",
        page: 1,
        totalPages: 1,
    });
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [shouldFetchAds, setShouldFetchAds] = useState<boolean>(true);
    const [cities, setCities] = useState<string[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [manufacturers, setManufacturers] = useState<string[]>([]);
    const [fuels, setFuels] = useState<string[]>([]);
    const [car_types, setCarTypes] = useState<string[]>([]);
    const [colors, setColors] = useState<string[]>([]);
    const [adTypes, setAdTypes] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const dateFormat = "YYYY-MM-DD";
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchChoices = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get("/api/choices/");
                const {
                    cities,
                    categories,
                    manufacturers,
                    fuels,
                    car_types,
                    colors,
                    ad_types,
                } = response.data;

                setCities(cities.map((city: any[]) => city[0]));
                setCategories(categories.map((category: any[]) => category[0]));
                setManufacturers(
                    manufacturers.map((manufacturer: any[]) => manufacturer[0])
                );
                setFuels(fuels.map((fuel: any[]) => fuel[0]));
                setCarTypes(car_types.map((car_type: any[]) => car_type[0]));
                setColors(colors.map((color: any[]) => color[0]));
                setAdTypes(ad_types.map((type: any[]) => type[0]));
            } catch (error) {
                console.error("Error fetching choices:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchChoices();
    }, []);

    useEffect(() => {
        if (shouldFetchAds) {
            fetchAds();
            setShouldFetchAds(false);
        }
    }, [shouldFetchAds]);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const cat = params.get("category") || "";

        setSelectedCategory(cat)

        setFilters((prevFilters) => ({
            ...prevFilters,
            category: params.get("category") || "",
            location: params.get("location") || "",
            adType: params.get("adType") || "sale",
            fromDate: params.get("fromDate") || null,
            toDate: params.get("toDate") || null,
            manufacturer: params.get("manufacturer") || "",
            car_type: params.get("car_type") || "",
            fuelType: params.get("fuelType") || "",
            color: params.get("color") || "",
            yearFrom: parseInt(params.get("yearFrom") || "") || undefined,
            yearTo: parseInt(params.get("yearTo") || "") || undefined,
            priceFrom: parseInt(params.get("priceFrom") || "") || undefined,
            priceTo: parseInt(params.get("priceTo") || "") || undefined,
            mileageFrom: parseInt(params.get("mileageFrom") || "") || undefined,
            mileageTo: parseInt(params.get("mileageTo") || "") || undefined,
            search: params.get("search") || "",
            sort: params.get("sort") || "newest",
            page: parseInt(params.get("page") || "1") || 1,
        }));
    }, [location.search]);
    const fetchAds = async () => {
        try {
            setLoading(true);

            const params: any = {
                page: filters.page,
                adType: filters.adType,
                sort: filters.sort,
            };

            if (filters.category) params.category = filters.category;
            if (filters.location) params.location = filters.location;
            if (filters.fromDate) params.fromDate = filters.fromDate;
            if (filters.toDate) params.toDate = filters.toDate;
            if (filters.manufacturer) params.manufacturer = filters.manufacturer;
            if (filters.car_type) params.car_type = filters.car_type;
            if (filters.fuelType) params.fuelType = filters.fuelType;
            if (filters.color) params.color = filters.color;
            if (filters.yearFrom) params.yearFrom = filters.yearFrom;
            if (filters.yearTo) params.yearTo = filters.yearTo;
            if (filters.priceFrom) params.priceFrom = filters.priceFrom;
            if (filters.priceTo) params.priceTo = filters.priceTo;
            if (filters.mileageFrom) params.mileageFrom = filters.mileageFrom;
            if (filters.mileageTo) params.mileageTo = filters.mileageTo;
            if (filters.search) params.search = filters.search;

            const urlParams = new URLSearchParams(location.search);
            const categoryParam = urlParams.get("category");
            const locationParam = urlParams.get("location");
            const searchParam = urlParams.get("search");

            if (categoryParam) params.category = categoryParam;
            if (locationParam) params.location = locationParam;
            if (searchParam) params.search = searchParam;

            const response = await axiosInstance.get("ads/", {
                params,
            });
            setAds(response.data.results);
            setFilters((prevFilters) => ({
                ...prevFilters,
                totalPages: response.data.total_pages,
            }));
        } catch (error) {
            console.error("Error fetching ads:", error);
        } finally {
            setLoading(false);
        }
    };


    // const handleFilterChange = (key: keyof Filters, value: any) => {
    //     let updatedValue = value;

    //     if (key === 'priceFrom' || key === 'priceTo' || key === 'mileageFrom' || key === 'mileageTo') {
    //         updatedValue = parseFloat(value);
    //         if (isNaN(updatedValue)) updatedValue = undefined;
    //     }

    //     setFilters((prevFilters) => ({
    //         ...prevFilters,
    //         [key]: updatedValue,
    //     }));

    //     const params = new URLSearchParams(location.search);
    //     if (updatedValue || updatedValue === 0) {
    //         params.set(key, updatedValue.toString());
    //     } else {
    //         params.delete(key);
    //     }

    //     navigate({
    //         pathname: '/ads',
    //         search: `?${params.toString()}`,
    //     });
    // };


    const handleFilterChange = (key: keyof Filters, value: any) => {
        let updatedValue = value;

        if (key === 'priceFrom' || key === 'priceTo' || key === 'mileageFrom' || key === 'mileageTo') {
            updatedValue = parseFloat(value);
            if (isNaN(updatedValue)) updatedValue = undefined;
        }

        setFilters((prevFilters) => ({
            ...prevFilters,
            [key]: updatedValue,
        }));

        const params = new URLSearchParams(location.search);
        if (updatedValue !== undefined && updatedValue !== null && updatedValue !== "") {
            params.set(key, updatedValue.toString());
        } else {
            params.delete(key);
        }

        navigate({
            pathname: location.pathname,
            search: `?${params.toString()}`,
        }, { replace: true });
    };


    const handleFormSearch = () => {
        setShouldFetchAds(true);
    };

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        handleFilterChange("page", page);
        setShouldFetchAds(true);
    };

    const handleSearch = debounce((value: string) => {
        handleFilterChange("search", value);
        setShouldFetchAds(true);
    }, 550);

    const handleSortChange = (value: string) => {
        handleFilterChange("sort", value);
        setShouldFetchAds(true);
    };


    const handleCategoryChange = (value: string) => {
        setSelectedCategory(value);

        if (value !== "car") {
            handleFilterChange("car_type", "");
            handleFilterChange("fuelType", "");
            handleFilterChange("color", "");
            handleFilterChange("mileageFrom", undefined);
            handleFilterChange("mileageTo", undefined);
            handleFilterChange("yearFrom", undefined);
            handleFilterChange("yearTo", undefined);
            handleFilterChange("manufacturer", "");
        }
    };

    return (
        <CustomLayout>
            <Container className="py-5">
                <Row className="mt-5">
                    <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                        <FormDiv>
                            <StyledDiv>
                                <Input
                                    placeholder="Price From"
                                    type="number"
                                    value={filters.priceFrom}
                                    onChange={(e) =>
                                        handleFilterChange("priceFrom", parseInt(e.target.value))
                                    }
                                    size="large" style={{ width: '45%' }} />
                                <Input
                                    placeholder="Price To"
                                    type="number"
                                    value={filters.priceTo}
                                    onChange={(e) =>
                                        handleFilterChange("priceTo", parseInt(e.target.value))
                                    }
                                    size="large" style={{ width: '45%' }} />
                            </StyledDiv>

                            <Select className="mt-3 w-100" size="large" placeholder="Location" value={filters.location || undefined} onChange={(value) => handleFilterChange('location', value)}>

                                {cities.map((city, index) => (
                                    <Option key={index} value={city}>{city}</Option>
                                ))}
                            </Select>
                            <Select
                                placeholder="Select Category"
                                value={selectedCategory || undefined}
                                onChange={(value) => { handleCategoryChange(value); handleFilterChange('category', value); }}
                                size="large"
                                className="mt-3 w-100"
                            >
                                {categories.map((category) => (
                                    <Option key={category} value={category}>
                                        {category}
                                    </Option>
                                ))}
                            </Select>
                            {selectedCategory === "car" && (
                                <div>
                                    <Select
                                        placeholder="Manufacturer"
                                        value={filters.manufacturer || undefined}
                                        onChange={(value) =>
                                            handleFilterChange("manufacturer", value)
                                        }
                                        style={{ width: '100%' }} className="mt-3"
                                        size="large"                                   >
                                        {manufacturers.map((manufacturer) => (
                                            <Option key={manufacturer} value={manufacturer}>
                                                {manufacturer}
                                            </Option>
                                        ))}
                                    </Select>
                                    <StyledDiv>
                                        <Select
                                            placeholder="Car Type"
                                            value={filters.car_type || undefined}
                                            onChange={(value) => handleFilterChange("car_type", value)}
                                            style={{ width: '33%' }} className="mt-3"
                                            size="large"                                    >
                                            {car_types.map((car_type) => (
                                                <Option key={car_type} value={car_type}>
                                                    {car_type}
                                                </Option>
                                            ))}
                                        </Select>
                                        <Select
                                            placeholder="Fuel" value={filters.fuelType || undefined} onChange={(value) => handleFilterChange("fuelType", value)}
                                            style={{ width: '33%' }} className="mt-3"
                                            size="large">
                                            {fuels.map((fuel) => (
                                                <Option key={fuel} value={fuel}>
                                                    {fuel}
                                                </Option>
                                            ))}
                                        </Select>
                                        <Select
                                            placeholder="Color"
                                            value={filters.color || undefined}
                                            onChange={(value) => handleFilterChange("color", value)}
                                            style={{ width: '33%' }} className="mt-3"
                                            size="large"                                    >
                                            {colors.map((color) => (
                                                <Option key={color} value={color}>
                                                    {color}
                                                </Option>
                                            ))}
                                        </Select>
                                    </StyledDiv>
                                    <StyledDiv>
                                        <Input
                                            placeholder="Mileage From"
                                            type="number"
                                            className="mt-3"
                                            value={filters.mileageFrom}
                                            onChange={(e) =>
                                                handleFilterChange("mileageFrom", parseInt(e.target.value))
                                            }
                                            size="large" style={{ width: '45%' }} />
                                        <Input
                                            placeholder="Mileage To"
                                            type="number"
                                            className="mt-3"
                                            value={filters.mileageTo}
                                            onChange={(e) =>
                                                handleFilterChange("mileageTo", parseInt(e.target.value))
                                            }
                                            size="large" style={{ width: '45%' }} />
                                    </StyledDiv>
                                    <StyledDiv>
                                        <Input
                                            placeholder="Year From"
                                            type="number"
                                            className="mt-3"
                                            value={filters.yearFrom}
                                            onChange={(e) =>
                                                handleFilterChange("yearFrom", parseInt(e.target.value))
                                            }
                                            size="large" style={{ width: '45%' }} />
                                        <Input

                                            placeholder="Year To"
                                            type="number"
                                            className="mt-3"
                                            value={filters.yearTo}
                                            onChange={(e) =>
                                                handleFilterChange("yearTo", parseInt(e.target.value))
                                            }
                                            size="large" style={{ width: '45%' }} />
                                    </StyledDiv>
                                </div>
                            )}
                            <DatePicker
                                className="mt-3 w-100"
                                size="large"
                                placeholder="From Date"
                                format={dateFormat}
                                value={
                                    filters.fromDate
                                        ? moment(filters.fromDate, dateFormat)
                                        : null
                                }
                                onChange={(date, dateString) =>
                                    handleFilterChange("fromDate", dateString)
                                }
                                style={{ width: "100%" }}
                            />
                            <DatePicker
                                className="mt-3 w-100"
                                size="large"
                                placeholder="To Date"
                                format={dateFormat}
                                value={
                                    filters.toDate ? moment(filters.toDate, dateFormat) : null
                                }
                                onChange={(date, dateString) =>
                                    handleFilterChange("toDate", dateString)
                                }
                                style={{ width: "100%", marginBottom: "1rem" }}
                            />
                            <Button
                                type="primary"
                                size="large"
                                onClick={handleFormSearch}
                                style={{ width: "100%" }}
                            >
                                Search
                            </Button>
                        </FormDiv>
                    </Col>
                    <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                        <StyledSearchBar>
                            <StyledInput
                                placeholder="Search by title"
                                onChange={(e) => handleSearch(e.target.value)}
                                size="large" className="w-50"
                                suffix={<SearchOutlined />}
                            />
                            <Select

                                placeholder="Sort By"
                                value={filters.sort}
                                onChange={handleSortChange}
                                style={{ width: '9rem' }} size="large" suffixIcon={<FunnelPlotOutlined style={{ fontSize: '18px', color: "black", cursor: 'default' }} />}
                            >
                                <Option value="newest">Newest</Option>
                                <Option value="oldest">Oldest</Option>
                                <Option value="priceLowToHigh">Price: Low to High</Option>
                                <Option value="priceHighToLow">Price: High to Low</Option>
                            </Select>
                        </StyledSearchBar>
                        {loading ? (
                            <div className="text-center">
                                <Spin className="mt-5" indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
                            </div>
                        ) : (
                            <AdsSection gutter={[16, 16]}>
                                {ads.length > 0 ? (
                                    ads.map((ad, index) => (
                                        <Col key={index} xs={24} sm={12} md={12} lg={8} xl={8}>
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
                                    ))
                                ) : (
                                    <></>
                                )}
                            </AdsSection>
                        )}

                        <div className="d-flex justify-content-center mt-5">
                            <Pagination
                                count={filters.totalPages}
                                page={filters.page}
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
