import React from "react";
import { Card, Tooltip, message } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { HeartOutlined } from '@ant-design/icons';
import axiosInstance from "../api";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';

const { Meta } = Card;

interface AdCardProps {
  id?: number;
  title: string;
  imageUrls: string[];
  description: string;
  price: number;
  isCar?: boolean;
  car_details?: {
    manufacturer: string;
    car_type: string;
    color: string;
    fuel_type: string;
    mileage: number;
    year: number;
  };
}

const StyledCard = styled(Card)`
  width: 95%;
  height: 100%;
  margin: 10px;
  padding: 5px;
  border-radius: 0;
  position: relative;
  cursor: pointer;
`;

const Price = styled.div`
  position: absolute;
  bottom: 10px;
  left: 27px;
  color: #ff000c;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const StyledTool = styled(Tooltip)`
  position: absolute;
  bottom: 12px;
  right: 27px;
`;

const AdCard: React.FC<AdCardProps> = ({ id, title, imageUrls, description, price, isCar, car_details }) => {
  const handleAddToWishlist = async () => {
    try {
      const token = localStorage.getItem('authToken');
      await axiosInstance.post('/wishlist/add/', { ad_id: id }, {
        headers: {
          'Authorization': `Token ${token}`,
        }
      });

      message.success('Item added to wishlist');
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        message.error(error.response.data.message);
      } else {
        console.error('Error adding item to wishlist:', error);
        message.error('Failed to add item to wishlist. Please try again later.');
      }
    }
  };

  const stripHtmlTags = (html: string) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };

  const truncateDescription = (text: string, length: number) => {
    const plainText = stripHtmlTags(text);
    if (plainText.length <= length) return plainText;
    return plainText.substring(0, length) + "...";
  };

  return (
    <StyledCard
      hoverable
      cover={<img style={{ borderRadius: 2 }} alt="ad" src={imageUrls[0]} />}
    >
      <StyledLink to={`/ad/${id}`}>
        <Meta title={title} description={truncateDescription(description, 61)} />
        <Price>${price}</Price>
      </StyledLink>
      <StyledTool title="Add to Wishlist">
        <HeartOutlined
          style={{ fontSize: 20, color: 'red' }}
          onClick={handleAddToWishlist}
        />
      </StyledTool>
      {isCar && car_details && (
        <div className="d-flex justify-content-between align-items-center mt-3">
          <p className="d-flex justify-content-between align-items-center"><DirectionsCarIcon /> {car_details.car_type}</p>
          <p className="d-flex justify-content-between align-items-center"><LocalGasStationIcon /> {car_details.fuel_type}</p>
          {/* Add more car details here */}
        </div>
      )}
    </StyledCard>
  );
};

export default AdCard;
