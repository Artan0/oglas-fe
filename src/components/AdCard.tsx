import React from "react";
import { Card, Rate } from "antd";
import styled from "styled-components";

const { Meta } = Card;

interface AdCardProps {
  title: string;
  image: string;
  description: string;
  price: string;
  rating: number;
}

const StyledCard = styled(Card)`
  width: 90%;
  height: 100%;
  margin: 10px;
  padding: 5px;
  border-radius: 0;
`;
const Price = styled.div`
  position: absolute;
  bottom: 10px;
  left: 27px;
`;

const Rating = styled.div`
  position: absolute;
  bottom: 10px;
  right: 15px;
  .ant-rate-star.ant-rate-star-full {
    margin-inline-end: 0; 
  }
  .ant-rate-star.ant-rate-star-zero{
    margin-inline-end: 0; 
  }
`;

const AdCard: React.FC<AdCardProps> = ({ title, image, description, price, rating }) => {
  return (
    <StyledCard
      hoverable
      cover={<img style={{ borderRadius: 2 }} alt="ad" src={image} />}
    >
      <Meta title={title} description={description} />

      <Price>{price}</Price>
      <Rating>
        <Rate disabled defaultValue={rating} />
      </Rating>

    </StyledCard>
  );
};



export default AdCard;
