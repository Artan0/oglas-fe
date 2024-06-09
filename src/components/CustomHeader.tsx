import React, { useEffect, useState } from "react";
import { Layout, Menu, Button, Badge, Drawer, List, Card, Tooltip, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useUser } from "../context/User-context";
import { HeartOutlined, DeleteOutlined } from '@ant-design/icons';
import axiosInstance from "../api";
import { Wishlist } from "../types/Wishlist";

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
    opacity: ${(props) => (props.isFixed ? 0.95 : 1)};
`;

const Logo = styled.img`
    width: 180px;
    height: 50px;
`;

const Nav = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
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
`;

const MenuItem = styled(Menu.Item)`
    font-size: 18px;
`;

const StyledWishlistDescription = styled.div`
    display: flex;
    justify-content: space-between;
    height: 75px;
    flex-direction: column;
`;

const WishlistDrawer: React.FC<{ visible: boolean; onClose: () => void }> = ({ visible, onClose }) => {
    const [wishlistItems, setWishlistItems] = useState([]);

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

    const handleRemoveFromWishlist = async (adId: number) => {
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
                renderItem={(item: any) => (
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
                                avatar={<img src={item.ad.imageUrl} alt={item.ad.title} style={{ width: 80, height: 80, objectFit: 'cover' }} />}
                                description={
                                    <StyledWishlistDescription>
                                        <div><strong style={{ fontSize: '16px' }}>{item.ad.title}</strong></div>
                                        <div>Price: ${item.ad.price}</div>
                                    </StyledWishlistDescription>
                                }
                            />
                        </StyledLink>
                    </List.Item>

                )}
            />
        </Drawer>
    );
};

const CustomHeader: React.FC = () => {
    const { user, setUser } = useUser();
    const [isFixed, setIsFixed] = useState(false);
    const [wishlistVisible, setWishlistVisible] = useState(false);
    const [wishlistItems, setWishlistItems] = useState<Wishlist[]>([]);

    const navigate = useNavigate();

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

    return (
        <StyledHeader isFixed={isFixed}>
            <Nav>
                <h1 className="text-black">Oglas</h1>
                <Menu className="d-flex justify-content-center" theme="light" mode="horizontal" style={{ minWidth: 0, flex: "auto" }}>
                    <MenuItem key="home">
                        <StyledLink to="/">Home</StyledLink>
                    </MenuItem>
                    <MenuItem key="rent">
                        <StyledLink to="/rent">Rent</StyledLink>
                    </MenuItem>
                    <MenuItem key="explore">
                        <StyledLink to="/ads">Explore</StyledLink>
                    </MenuItem>
                    <MenuItem key="about">
                        <StyledLink to="/about">About Us</StyledLink>
                    </MenuItem>
                    <MenuItem key="auction">
                        <StyledLink to="/auction">Auction</StyledLink>
                    </MenuItem>
                </Menu>
                <UserSection>
                    {user ? (
                        <div>
                            <Badge count={wishlistItems.length}>
                                <HeartOutlined style={{ fontSize: '24px', cursor: 'pointer' }} onClick={showWishlistDrawer} />
                            </Badge>
                            <StyledLink to="/profile"><span className="text-dark px-2">{user.username}</span></StyledLink>
                            <Button onClick={handleLogout} shape="round" size="large">Logout</Button>
                        </div>
                    ) : (
                        <AuthList>
                            <StyledLink to="/authentication" style={{ textDecoration: 'none' }}><Button shape="round" size="large">Login</Button></StyledLink>
                            <span className='mx-2'></span>
                            <StyledLink to="/authentication" style={{ textDecoration: 'none', color: '#fff' }}><Button shape="round" size="large" type="primary">Register</Button></StyledLink>
                        </AuthList>
                    )}
                </UserSection>
            </Nav>
            <WishlistDrawer visible={wishlistVisible} onClose={onCloseWishlistDrawer} />
        </StyledHeader>
    );
};

export default CustomHeader;
