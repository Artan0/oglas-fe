import React, { Component, useEffect, useState } from "react";
import { Layout, Menu, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useUser } from "../context/User-context";
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

interface CustomHeaderProps {
}

const CustomHeader: React.FC<CustomHeaderProps> = () => {
    const { user, setUser } = useUser();
    const [isFixed, setIsFixed] = useState(false);
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
        navigate("/authentication")
    };

    return (
        <StyledHeader isFixed={isFixed}>
            <Nav>
                {/* <Logo src="/logo.png" alt="Logo" /> */}
                <h1 className="text-black">Oglas</h1>
                <Menu className="d-flex justify-content-center" theme="light" mode="horizontal" style={{ minWidth: 0, flex: "auto" }}>
                    <MenuItem key="home">
                        <StyledLink to="/">Home </StyledLink>
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
                        <>
                            <StyledLink to="/profile"> <span className="text-dark px-2"> {user.username}</span></StyledLink>
                            <Button onClick={handleLogout} shape="round" size="large" >Logout</Button>
                        </>
                    ) : (
                        <AuthList>
                            <StyledLink to="/authentication" style={{ textDecoration: 'none' }}><Button shape="round" size="large" >Login</Button></StyledLink>
                            <span className='mx-2'></span>
                            <StyledLink to="/authentication" style={{ textDecoration: 'none', color: '#fff' }}><Button shape="round" size="large" type="primary">Register</Button></StyledLink>
                        </AuthList>
                    )}
                </UserSection>
            </Nav>
        </StyledHeader>
    );
};

export default CustomHeader;
