import React, { useEffect, useState } from "react";
import { Layout, Menu, Button, Badge, Drawer, List, Tooltip, message, Dropdown, Space } from 'antd';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useUser } from "../context/User-context";
import { HeartOutlined, DeleteOutlined, UserOutlined, MenuOutlined } from '@ant-design/icons';
import axiosInstance from "../api";
import { Wishlist } from "../types/Wishlist";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Col, Row } from 'react-bootstrap';

const { Header } = Layout;

const StyledHeader = styled(Header) <{ isFixed: boolean }>`
    text-align: center;
    color: #fff;
    padding: 0 48px;
    width: 100%;
    box-shadow: 2px 0px 5px 2px lightgray;
    background-color: white;
    z-index: 10; 
    position: ${(props) => (props.isFixed ? 'fixed' : 'absolute')};
    top: ${(props) => (props.isFixed ? '0' : 'auto')};
    transition: top 0.4s ease-out, opacity 0.4s ease-out, background-color 0.4s ease-out;
    opacity: ${(props) => (props.isFixed ? 1 : 1)};
`;

const Logo = styled.img`
    width: 180px;
    height: 50px;
`;

const Nav = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

const UserSection = styled.div`
    display: flex;
    align-items: center;
`;

const AuthList = styled.div`
    display: flex;
    padding: 0;
    margin: 0;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    font-size: 1rem;
`;

const StyledWishlistDescription = styled.div`
    display: flex;
    justify-content: space-between;
    height: 75px;
    flex-direction: column;
`;

const WishlistDrawer: React.FC<{ visible: boolean; onClose: () => void }> = ({ visible, onClose }) => {
    const [wishlistItems, setWishlistItems] = useState<Wishlist[]>([]);

    const fetchWishlistItems = async () => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await axiosInstance.get('/wishlist/', {
                headers: {
                    'Authorization': `Token ${token}`,
                }
            });
            setWishlistItems(response.data);
        } catch (error) {
            console.error('Error fetching wishlist items:', error);
        }
    };

    useEffect(() => {
        if (visible) {
            fetchWishlistItems();
        }
    }, [visible]);

    const handleRemoveFromWishlist = async (adId: any) => {
        try {
            const token = localStorage.getItem('authToken');
            await axiosInstance.delete(`/wishlist/remove/${adId}/`, {
                headers: {
                    'Authorization': `Token ${token}`,
                }
            });
            message.success('Item removed from wishlist');
            fetchWishlistItems();
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.message) {
                message.error(error.response.data.message);
            } else {
                console.error('Error removing item from wishlist:', error);
                message.error('Failed to remove item from wishlist. Please try again later.');
            }
        }
    };

    return (
        <Drawer
            title="Wishlist"
            placement="right"
            closable={true}
            onClose={onClose}
            open={visible}
            width={360}
        >
            <List
                dataSource={wishlistItems}
                renderItem={(item: Wishlist) => {
                    const imageUrl = item.ad.image_urls && item.ad.image_urls.length > 0 ? item.ad.image_urls[0] : 'default-image-url';
                    return (
                        <List.Item
                            actions={[
                                <Tooltip title="Remove from Wishlist">
                                    <DeleteOutlined
                                        style={{ fontSize: '20px', color: 'red' }}
                                        onClick={() => handleRemoveFromWishlist(item.ad.id)}
                                    />
                                </Tooltip>
                            ]}
                        >
                            <StyledLink className="text-dark" to={`/ad/${item.ad.id}`}>
                                <List.Item.Meta
                                    style={{ width: '220px' }}
                                    avatar={<img src={imageUrl} alt={item.ad.title} style={{ width: 80, height: 80, objectFit: 'cover' }} />}
                                    description={
                                        <StyledWishlistDescription>
                                            <div><strong style={{ fontSize: '16px' }}>{item.ad.title}</strong></div>
                                            <div>Price: ${item.ad.price}</div>
                                        </StyledWishlistDescription>
                                    }
                                />
                            </StyledLink>
                        </List.Item>
                    );
                }}
            />
        </Drawer>
    );
};

const CustomHeader: React.FC = () => {
    const { user, setUser } = useUser();
    const [isFixed, setIsFixed] = useState(false);
    const [wishlistVisible, setWishlistVisible] = useState(false);
    const [wishlistItems, setWishlistItems] = useState<Wishlist[]>([]);
    const location = useLocation();
    const navigate = useNavigate();
    const [drawerVisible, setDrawerVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 100;
            setIsFixed(isScrolled);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleLogout = () => {
        if (setUser) {
            setUser(null);
        }
        localStorage.removeItem('authToken');
        navigate("/authentication");
    };

    const showWishlistDrawer = () => {
        setWishlistVisible(true);
    };

    const onCloseWishlistDrawer = () => {
        setWishlistVisible(false);
    };

    const determineActiveMenuItem = (path: string) => {
        switch (path) {
            case '/':
                return ['home'];
            case '/rent':
                return ['rent'];
            case '/ads':
                return ['explore'];
            case '/about':
                return ['about'];
            case '/auction':
                return ['auction'];
            default:
                return [''];
        }
    };

    const activeMenuItem = determineActiveMenuItem(location.pathname);

    const items = [
        {
            label: <StyledLink to="/profile">My Profile</StyledLink>,
            key: '0',
            icon: <UserOutlined style={{ fontSize: '20px', cursor: 'pointer', marginRight: '8px' }} />
        },
        {
            label: <span style={{ fontSize: '1rem' }}> Wishlist</span>,
            key: '1',
            icon: <FavoriteBorderIcon style={{ fontSize: '20px', cursor: 'pointer', marginRight: '8px' }} />,
            onClick: showWishlistDrawer
        }

    ];

    const menu = (
        <Menu>
            <Menu.Item key="1" onClick={showWishlistDrawer} >
                <Badge count={wishlistItems.length}>
                    <FavoriteBorderIcon style={{ fontSize: '20px', cursor: 'pointer', marginRight: '2px' }} />
                    <span style={{ fontSize: '1rem' }} >Wishlist</span>
                </Badge>
            </Menu.Item>
            <Menu.Item key="2">
                <StyledLink to="/profile">
                    <UserOutlined style={{ marginRight: '8px' }} />
                    My Profile
                </StyledLink>
            </Menu.Item>
        </Menu>
    );

    return (
        <StyledHeader isFixed={isFixed}>
            <Nav>
                <h1 style={{ width: '15%' }} className="text-black text-start">Oglas</h1>
                <Menu
                    className="d-flex justify-content-center d-none d-lg-flex"
                    theme="light"
                    mode="horizontal"
                    style={{ minWidth: 0, flex: "auto" }}
                    selectedKeys={activeMenuItem}
                >
                    <Menu.Item key="home">
                        <StyledLink to="/">Home</StyledLink>
                    </Menu.Item>
                    <Menu.Item key="rent">
                        <StyledLink to="/rent">Rent</StyledLink>
                    </Menu.Item>
                    <Menu.Item key="explore">
                        <StyledLink to="/ads">Explore</StyledLink>
                    </Menu.Item>
                    <Menu.Item key="about">
                        <StyledLink to="/about">About Us</StyledLink>
                    </Menu.Item>
                    <Menu.Item key="auction">
                        <StyledLink to="/auction">Auction</StyledLink>
                    </Menu.Item>
                </Menu>
                <UserSection>
                    {user ? (
                        <>
                            <Dropdown overlay={menu} trigger={['click']}>
                                <a onClick={(e) => e.preventDefault()}>
                                    <Space>
                                        <span style={{ cursor: 'pointer' }} className="text-dark px-2">{user.username}</span>
                                    </Space>
                                </a>
                            </Dropdown>
                            <Button onClick={handleLogout} shape="round" size="large" className="d-none d-lg-inline-block">Logout</Button>
                            <Button icon={<MenuOutlined />} onClick={() => setDrawerVisible(true)} className="d-lg-none" />
                        </>
                    ) : (
                        <AuthList>
                            <StyledLink to="/authentication" style={{ textDecoration: 'none' }}>
                                <Button shape="round" size="large" className="d-none d-lg-inline-block">Login</Button>
                            </StyledLink>
                            <span className='mx-2 d-none d-lg-inline-block'></span>
                            <StyledLink to="/authentication" style={{ textDecoration: 'none', color: '#fff' }}>
                                <Button shape="round" size="large" type="primary" className="d-none d-lg-inline-block">Register</Button>
                            </StyledLink>
                            <Button icon={<MenuOutlined />} onClick={() => setDrawerVisible(true)} className="d-lg-none" />
                        </AuthList>
                    )}
                </UserSection>
            </Nav>
            <Drawer
                title="Menu"
                placement="right"
                closable={true}
                onClose={() => setDrawerVisible(false)}
                visible={drawerVisible}
            >
                <Menu mode="vertical" selectedKeys={activeMenuItem}>
                    <Menu.Item key="home">
                        <StyledLink to="/">Home</StyledLink>
                    </Menu.Item>
                    <Menu.Item key="rent">
                        <StyledLink to="/rent">Rent</StyledLink>
                    </Menu.Item>
                    <Menu.Item key="explore">
                        <StyledLink to="/ads">Explore</StyledLink>
                    </Menu.Item>
                    <Menu.Item key="about">
                        <StyledLink to="/about">About Us</StyledLink>
                    </Menu.Item>
                    <Menu.Item key="auction">
                        <StyledLink to="/auction">Auction</StyledLink>
                    </Menu.Item>
                </Menu>
                <Menu mode="vertical">
                    {user ? (
                        <>
                            <Menu.Item key="profile">
                                <StyledLink to="/profile">My Profile</StyledLink>
                            </Menu.Item>
                            <Menu.Item key="wishlist" onClick={showWishlistDrawer}>
                                <span>Wishlist</span>
                            </Menu.Item>
                            <Menu.Item key="logout" onClick={handleLogout}>
                                Logout
                            </Menu.Item>
                        </>
                    ) : (
                        <>
                            <Menu.Item key="login">
                                <StyledLink to="/authentication">Login</StyledLink>
                            </Menu.Item>
                            <Menu.Item key="register">
                                <StyledLink to="/authentication">Register</StyledLink>
                            </Menu.Item>
                        </>
                    )}
                </Menu>
            </Drawer>
            <WishlistDrawer visible={wishlistVisible} onClose={onCloseWishlistDrawer} />
        </StyledHeader>
    );
};

export default CustomHeader;
