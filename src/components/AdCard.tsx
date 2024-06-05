import React from "react";
import { Card, Rate } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";

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
  cursor:default;
`;

const Price = styled.div`
  position: absolute;
  bottom: 7px;
  left: 27px;
  color: #ff000c;
`;

const Rating = styled.div`
  position: absolute;
  bottom: 7px;
  right: 15px;
  .ant-rate-star.ant-rate-star-full {
    margin-inline-end: 0; 
  }
  .ant-rate-star.ant-rate-star-zero {
    margin-inline-end: 0; 
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`

const AdCard: React.FC<AdCardProps> = ({ id, title, imageUrl, description, price }) => {
  return (
    <StyledCard
      hoverable
      cover={<img style={{ borderRadius: 2 }} alt="ad" src={imageUrl} />}
    >
      <StyledLink to={`/ad/${id}`}>

        <Meta title={title} description={description} />
        <Price>${price}</Price>
        {/* <Rating>
          <Rate disabled defaultValue={rating} />
        </Rating> */}
      </StyledLink>

    </StyledCard>
  );
};

export default AdCard;
