import { Layout, Row, Col, Divider, Typography, Menu } from 'antd';
import { FacebookOutlined, TwitterOutlined, InstagramOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { Component } from 'react';

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
            <FooterHeading>Useful Links</FooterHeading>
            <FooterMenu>
              <Menu.Item className='text-white' key="1">Link 1</Menu.Item>
              <Menu.Item className='text-white' key="2">Link 2</Menu.Item>
              <Menu.Item className='text-white' key="3">Link 3</Menu.Item>
            </FooterMenu>
          </FooterColumn>
          <FooterColumn lg={{ span: 4 }} md={{ span: 12 }} sm={{ span: 12 }}>
            <FooterHeading>Explore</FooterHeading>
            <FooterMenu>
              <Menu.Item className='text-white' key="4">Explore 1</Menu.Item>
              <Menu.Item className='text-white' key="5">Explore 2</Menu.Item>
              <Menu.Item className='text-white' key="6">Explore 3</Menu.Item>
            </FooterMenu>
          </FooterColumn>
          <FooterColumn lg={{ span: 4 }} md={{ span: 24 }} sm={{ span: 24 }}>
            <FooterHeading>Contact Us</FooterHeading>
            <FooterMenu>
              <Menu.Item className='text-white' key="7" icon={<FacebookOutlined />}>Facebook</Menu.Item>
              <Menu.Item className='text-white' key="8" icon={<TwitterOutlined />}>Twitter</Menu.Item>
              <Menu.Item className='text-white' key="9" icon={<InstagramOutlined />}>Instagram</Menu.Item>
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
