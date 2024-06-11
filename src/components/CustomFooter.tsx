import { Layout, Row, Col, Divider, Typography, Menu } from 'antd';
import { FacebookOutlined, TwitterOutlined, InstagramOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { MailOutlineOutlined } from '@mui/icons-material';
import Paragraph from 'antd/es/skeleton/Paragraph';

const { Footer } = Layout;
const { Text } = Typography;

const FooterContainer = styled(Footer)`
  background-color: #1c86cf;
  color: #fff;
`;

const FooterColumn = styled(Col)`
  padding: 0 24px;
`;

const FooterHeading = styled.h3`
  color: #fff;
`;

const FooterText = styled(Text)`
  color: #fff;
`;

const FooterRow = styled(Row)`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap; 
`;

const FooterMenu = styled(Menu)`
  background-color: transparent;
  border: none;
`;

const SocialIcons = styled.div`
  display: flex;
  align-items: center;
  justify-content:end;
`;

const FooterIcon = styled.span`
  color: #fff;
  font-size: 24px;
  margin-right: 16px;
`;

const StyledDivider = styled(Divider)`
  background-color: #fff;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`
class CustomFooter extends Component {
  render() {
    return (
      <FooterContainer>
        <FooterRow gutter={[16, 16]}> {/* Add gutter for spacing between columns */}
          <FooterColumn lg={{ span: 10 }} md={{ span: 24 }} sm={{ span: 24 }}> {/* Adjust span for different screen sizes */}
            <FooterHeading>Logo</FooterHeading>
            <FooterText>Description about the company goes here.</FooterText>
          </FooterColumn>
          <FooterColumn lg={{ span: 4 }} md={{ span: 12 }} sm={{ span: 12 }}>
            <FooterHeading>Support Us!</FooterHeading>
            <FooterMenu>
              <p className='text-white mt-3'>Lorem ipsum dolor sit amet</p>
            </FooterMenu>
          </FooterColumn>
          <FooterColumn lg={{ span: 4 }} md={{ span: 12 }} sm={{ span: 12 }}>
            <FooterHeading>Pages</FooterHeading>
            <FooterMenu>
              <Menu.Item className='text-white' key="1"><StyledLink to={'/'}>Home</StyledLink></Menu.Item>
              <Menu.Item className='text-white' key="2"><StyledLink to={'/rent'}>Rents</StyledLink></Menu.Item>
              <Menu.Item className='text-white' key="3"><StyledLink to={'/ads'}>All Ads</StyledLink></Menu.Item>
              <Menu.Item className='text-white' key="4"><StyledLink to={'/profile'}>My Profile</StyledLink></Menu.Item>
              <Menu.Item className='text-white' key="5"><StyledLink to={'/about'}>About Us</StyledLink></Menu.Item>

            </FooterMenu>
          </FooterColumn>
          <FooterColumn lg={{ span: 4 }} md={{ span: 24 }} sm={{ span: 24 }}>
            <FooterHeading>Contact Us</FooterHeading>
            <FooterMenu>
              <Menu.Item className='text-white' key="6" icon={<FacebookOutlined style={{ fontSize: '20px' }} />} >Facebook</Menu.Item>
              <Menu.Item className='text-white' key="7" icon={<MailOutlineOutlined style={{ fontSize: '20px' }} />}>oglasmk@gmail.com</Menu.Item>
              <Menu.Item className='text-white' key="8" icon={<InstagramOutlined style={{ fontSize: '20px' }} />}>Instagram</Menu.Item>
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
