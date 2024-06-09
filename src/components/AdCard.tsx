import React from "react";
import { Card, Tooltip, message } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { HeartOutlined } from '@ant-design/icons';
import axiosInstance from "../api";

const { Meta } = Card;

interface AdCardProps {
  id?: number;
  title: string;
  imageUrl: string;
  description: string;
  price: number;
}

const StyledCard = styled(Card)`
  width: 90%;
  height: 100%;
  margin: 10px;
  padding: 5px;
  border-radius: 0;
  position: relative;
  cursor: pointer;
`;

const Price = styled.div`
  position: absolute;
  bottom: 7px;
  left: 27px;
  color: #ff000c;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;
const StyledTool = styled(Tooltip)`
  position: absolute;
  bottom: 7px;
  right:27px;
`
const AdCard: React.FC<AdCardProps> = ({ id, title, imageUrl, description, price }) => {
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

  return (
    <StyledCard
      hoverable
      cover={<img style={{ borderRadius: 2 }} alt="ad" src={imageUrl} />}
    >
      <StyledLink to={`/ad/${id}`}>
        <Meta title={title} description={description} />
        <Price>${price}</Price>

      </StyledLink>
      <StyledTool title="Add to Wishlist">
        <HeartOutlined
          style={{ fontSize: 20, color: 'red' }}
          onClick={handleAddToWishlist}
        />
      </StyledTool>
    </StyledCard>
  );
};

export default AdCard;
