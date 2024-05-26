import { Component } from "react";
import { Header } from 'antd/es/layout/layout';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

const StyledHeader = styled(Header)`
    text-align: center;
    color: #fff;
    height: 64px;
    padding: 0 48px;
    background-color: #0a2540;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    z-index: 10; 
`;

const Logo = styled.img`
    width: 180px;
    height: 50px;
`;

const Nav = styled.nav`
    display: flex;
    justify-content: space-between;
    flex-grow: 1;
    align-items: center;
`;

const NavList = styled.ul`
    list-style: none;
    display: flex;
    justify-content: space-evenly;
    width: 50%;
    padding: 0;
    margin: 0;
    font-weight: bold;

    @media (max-width: 768px) {
        flex-direction: column;
        width: 100%;
    }
`;

const NavItem = styled.li`
    display: inline-block;

    @media (max-width: 768px) {
        padding: 10px 0;
    }
`;

const UserSection = styled.div`
    display: flex;
    align-items: center;

    @media (max-width: 768px) {
        position: absolute;
        top: 10px;
        right: 10px;
    }
`;

const AuthList = styled.ul`
    list-style: none;
    display: flex;
    padding: 0;
    margin: 0;

    @media (max-width: 768px) {
    }
`;


class CustomHeader extends Component {

    render() {
        return (
            <>
                <StyledHeader>
                    <Nav>
                        <Logo alt="Logo" />

                        <NavList>
                            <NavItem><Link to="/" style={{ textDecoration: 'none', color: '#fff' }}>Home</Link></NavItem>
                            <NavItem><Link to="/contact" style={{ textDecoration: 'none', color: '#fff' }}>Contact Us</Link></NavItem>
                            <NavItem><Link to="/about" style={{ textDecoration: 'none', color: '#fff' }}>About Us</Link></NavItem>
                        </NavList>
                        <UserSection>
                            <AuthList>
                                <Button type="primary" ><Link to="/auth" style={{ textDecoration: 'none', color: '#fff' }}>Login</Link></Button>
                                <span className='mx-2'></span>
                                <Button type="primary" ><Link to="/auth" style={{ textDecoration: 'none', color: '#fff' }}>Register</Link></Button>
                            </AuthList>
                        </UserSection>
                    </Nav>

                </StyledHeader>
            </>
        );
    }
}

export default CustomHeader;
