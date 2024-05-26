import { Layout, Row, Col, Divider, Typography, Menu } from 'antd';
import { FacebookOutlined, TwitterOutlined, InstagramOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { Component } from 'react';

const { Footer } = Layout;
const { Text } = Typography;

const FooterContainer = styled(Footer)`
  background-color: #001529;
  color: #fff;
  padding: 48px 0;
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

const FooterIcon = styled.span`
  color: #fff;
  font-size: 24px;
  margin-right: 16px;
`;

const FooterRow = styled(Row)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FooterMenu = styled(Menu)`
  background-color: transparent;
  border: none;
`;

const SocialIcons = () => {
    return (
        <div>
            <FooterIcon>
                <FacebookOutlined />
            </FooterIcon>
            <FooterIcon>
                <TwitterOutlined />
            </FooterIcon>
            <FooterIcon>
                <InstagramOutlined />
            </FooterIcon>
        </div>
    );
};

class CustomFooter extends Component {
    render() {
        return (
            <FooterContainer>
                <FooterRow>
                    <FooterColumn lg={{ span: 8 }} md={{ span: 24 }}>
                        <FooterHeading>Logo</FooterHeading>
                        <FooterText>Description about the company goes here.</FooterText>
                    </FooterColumn>
                    <FooterColumn lg={{ span: 4 }} md={{ span: 12 }}>
                        <FooterHeading>Useful Links</FooterHeading>
                        <FooterMenu>
                            <Menu.Item key="1">Link 1</Menu.Item>
                            <Menu.Item key="2">Link 2</Menu.Item>
                            <Menu.Item key="3">Link 3</Menu.Item>
                        </FooterMenu>
                    </FooterColumn>
                    <FooterColumn lg={{ span: 4 }} md={{ span: 12 }}>
                        <FooterHeading>Explore</FooterHeading>
                        <FooterMenu>
                            <Menu.Item key="4">Explore 1</Menu.Item>
                            <Menu.Item key="5">Explore 2</Menu.Item>
                            <Menu.Item key="6">Explore 3</Menu.Item>
                        </FooterMenu>
                    </FooterColumn>
                    <FooterColumn lg={{ span: 8 }} md={{ span: 24 }}>
                        <FooterHeading>Contact Us</FooterHeading>
                        <FooterMenu>
                            <Menu.Item key="7" icon={<FacebookOutlined />}>Facebook</Menu.Item>
                            <Menu.Item key="8" icon={<TwitterOutlined />}>Twitter</Menu.Item>
                            <Menu.Item key="9" icon={<InstagramOutlined />}>Instagram</Menu.Item>
                        </FooterMenu>
                    </FooterColumn>
                </FooterRow>
                <Divider />
                <FooterRow>
                    <FooterColumn lg={{ span: 12 }} md={{ span: 24 }}>
                        <FooterText>© 2024 Your Company. All Rights Reserved.</FooterText>
                    </FooterColumn>
                    <FooterColumn lg={{ span: 12 }} md={{ span: 24 }} style={{ textAlign: 'right' }}>
                        <SocialIcons />
                    </FooterColumn>
                </FooterRow>
            </FooterContainer>
        );
    }
};

export default CustomFooter;
