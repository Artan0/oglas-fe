import { Layout, Row, Col, Divider, Typography, Menu } from 'antd';
import { FacebookOutlined, TwitterOutlined, InstagramOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { MailOutlineOutlined } from '@mui/icons-material';

const { Footer } = Layout;
const { Text } = Typography;

const FooterContainer = styled(Footer)`
  background-color: #1c86cf;
  color: #fff;
  padding: 24px 50px;
  @media (max-width: 768px) {
    padding: 24px 20px;
  }
`;

const FooterColumn = styled(Col)`
  padding: 0 24px;
  @media (max-width: 768px) {
    padding: 0 12px;
  }
`;

const FooterHeading = styled.h3`
  color: #fff;
  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const FooterText = styled(Text)`
  color: #fff;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const FooterRow = styled(Row)`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap; 
   @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    flex-direction:column;
  }
`;

const FooterMenu = styled(Menu)`
  background-color: transparent;
  border: none;
`;

const SocialIcons = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const FooterIcon = styled.span`
  color: #fff;
  font-size: 24px;
  margin-right: 16px;
  @media (max-width: 768px) {
    margin-right: 12px;
  }
`;

const StyledDivider = styled(Divider)`
  background-color: #fff;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  &:hover {
    color: #1890ff;
  }
`;

class CustomFooter extends Component {
  render() {
    return (
      <FooterContainer>
        <FooterRow gutter={[16, 16]}>
          <FooterColumn lg={{ span: 10 }} md={{ span: 24 }} sm={{ span: 24 }}>
            <FooterHeading>Logo</FooterHeading>
            <FooterText>Connecting buyers and sellers through our trusted marketplace platform.</FooterText>
          </FooterColumn>
          <FooterColumn lg={{ span: 4 }} md={{ span: 12 }} sm={{ span: 12 }}>
            <FooterHeading>Support Us!</FooterHeading>
            <FooterMenu style={{ backgroundColor: 'transparent' }}>
              <FooterMenu style={{ backgroundColor: 'transparent' }}>
                <FooterText >
                  Join us in creating community for buying and selling
                </FooterText>
              </FooterMenu>
            </FooterMenu>
          </FooterColumn>
          <FooterColumn lg={{ span: 4 }} md={{ span: 12 }} sm={{ span: 12 }}>
            <FooterHeading>Pages</FooterHeading>
            <FooterMenu>
              <Menu.Item key="1"><StyledLink className="text-white" to={'/'}>Home</StyledLink></Menu.Item>
              <Menu.Item key="2"><StyledLink className="text-white" to={'/rent'}>Rents</StyledLink></Menu.Item>
              <Menu.Item key="3"><StyledLink className="text-white" to={'/ads'}>All Ads</StyledLink></Menu.Item>
              <Menu.Item key="4"><StyledLink className="text-white" to={'/profile'}>My Profile</StyledLink></Menu.Item>
              <Menu.Item key="5"><StyledLink className="text-white" to={'/about'}>About Us</StyledLink></Menu.Item>
            </FooterMenu>
          </FooterColumn>
          <FooterColumn lg={{ span: 4 }} md={{ span: 24 }} sm={{ span: 24 }}>
            <FooterHeading>Contact Us</FooterHeading>
            <FooterMenu>
              <Menu.Item key="6" className="text-white" icon={<FacebookOutlined style={{ fontSize: '20px' }} />}>Facebook</Menu.Item>
              <Menu.Item key="7" className="text-white" icon={<MailOutlineOutlined style={{ fontSize: '20px' }} />}>oglasmk@gmail.com</Menu.Item>
              <Menu.Item key="8" className="text-white" icon={<InstagramOutlined style={{ fontSize: '20px' }} />}>Instagram</Menu.Item>
            </FooterMenu>
          </FooterColumn>
        </FooterRow>
        <StyledDivider />
        <FooterRow gutter={[16, 16]} justify="space-between" align="middle">
          <FooterColumn lg={{ span: 12 }} md={{ span: 24 }} sm={{ span: 24 }}>
            <FooterText>© 2024 Your Company. All Rights Reserved.</FooterText>
          </FooterColumn>
          <FooterColumn lg={{ span: 8 }} md={{ span: 24 }} sm={{ span: 24 }} style={{ textAlign: 'right' }}>
            <SocialIcons>
              <FooterIcon>
                <FacebookOutlined />
              </FooterIcon>
              <FooterIcon>
                <TwitterOutlined />
              </FooterIcon>
              <FooterIcon>
                <InstagramOutlined />
              </FooterIcon>
            </SocialIcons>
          </FooterColumn>
        </FooterRow>
      </FooterContainer>
    );
  }
}

export default CustomFooter;
