import styled from "styled-components";
import SearchBar from "./SearchBar";
import { ShoppingCart } from "react-feather";

const Header = (cart) => {
    const cartActive = cart?.cart?.length > 0;
    const cartSize = cartActive && cart.cart.length;

    return (
        <HeaderContainer>
            <Div>
                <LogoContainer>
                    <Logo
                        src="https://svgshare.com/i/oCF.svg.png"
                        alt="Wearably Logo"
                        onClick={() => {
                            window.location.href = "/";
                        }}
                    />
                </LogoContainer>
                <NavContainer>
                    <NavLinks>
                        <NavLink href="/product-page/all">Products</NavLink>
                        <NavLink href="/about">About</NavLink>
                        {cartActive && (
                            <NavLink href="/cart">
                                <ShoppingCartIconContainer>
                                    <ShoppingCart style={{ color: "black" }} />
                                    <RedIcon>{cartSize}</RedIcon>
                                </ShoppingCartIconContainer>
                            </NavLink>
                        )}
                        {!cartActive && (
                            <ShoppingCartIconContainer>
                                <ShoppingCart style={{ color: "gray" }} />
                            </ShoppingCartIconContainer>
                        )}
                    </NavLinks>
                </NavContainer>
            </Div>
            <SearchBar />
        </HeaderContainer>
    );
};

const Div = styled.div`
    display: flex;
    align-items: center;
    padding: 0 1rem;
    @media screen and (max-width: 1140px) {
        padding-bottom: 0.5rem;
    }
`;
const RedIcon = styled.div`
    background-color: red;
    width: 18px;
    height: 18px;
    border-radius: 100%;
    font-size: 9px;
    color: white;
    text-align: center;
    position: absolute;
    top: 2px;
    right: 1px;
`;
const ShoppingCartIconContainer = styled.div`
    position: relative;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 2rem 0rem 1rem 0rem;
    @media screen and (max-width: 1070px) {
        padding: 1rem 4rem;
        flex-direction: column;
    }
    @media screen and (max-width: 500px) {
        padding: 1rem;
    }
`;
const LogoContainer = styled.div`
    width: 180px;
    display: flex;
    align-items: center;
    margin-left: 2rem;
    @media screen and (max-width: 590px) {
        width: 120px;
        margin: 0;
    }
`;
const Logo = styled.img`
    width: 100%;
    height: 100%;
    cursor: pointer;
`;
const NavContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-family: inter;
    margin-left: 2rem;
`;
const NavLinks = styled.ul`
    display: flex;
    justify-content: space-between;
    align-items: center;
    list-style: none;
    gap: 12px;
`;
const NavLink = styled.a`
    color: black;
    text-decoration: none;
    font-size: 1.2rem;
    font-weight: 500;
    cursor: pointer;
    @media screen and (max-width: 590px) {
        font-size: 1rem;
    }
`;

export default Header;
