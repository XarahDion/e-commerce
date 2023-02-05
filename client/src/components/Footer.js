import styled from "styled-components";
import { Facebook, Instagram, Twitter } from "react-feather";

const Footer = () => {
    return (
        <FooterContainer>
            <FooterDesc>
                <Img
                    src="https://svgshare.com/i/oCF.svg.png"
                    alt="Wearably Logo"
                    onClick={() => {
                        window.location.href = "/";
                    }}
                />{" "}
                <FooterCopyRight>
                    <p>© 2021. All rights reserved.</p>
                </FooterCopyRight>
                <FooterSocialMedia>
                    <IconWrapper href="https://www.facebook.com/">
                        <Facebook stroke="black" />
                    </IconWrapper>
                    <IconWrapper href="https://www.instagram.com/">
                        <Instagram stroke="black" />
                    </IconWrapper>
                    <IconWrapper href="https://www.twitter.com/">
                        <Twitter stroke="black" />
                    </IconWrapper>
                </FooterSocialMedia>
            </FooterDesc>
            <FooterLinkItems>
                <h2>Support</h2>
                <p>Return Policy</p>
                <p>Customer Service</p>
                <p>Financing</p>
            </FooterLinkItems>
            <FooterLinkItems>
                <h2>Legal</h2>
                <p>Terms of Service</p>
                <p>Privacy Policy</p>
                <p>Data Protection</p>
            </FooterLinkItems>
            <FooterLinkItems>
                <h2>Company</h2>
                <a href="/about">About</a>
                <a href="/product-page">Products</a>
            </FooterLinkItems>
        </FooterContainer>
    );
};

const FooterContainer = styled.div`
    padding: 1rem 4rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    border-top: 1px solid #e0e0e0;
    @media screen and (max-width: 650px) {
        padding: 2rem 1rem;
        justify-content: center;
    }
`;
const FooterSocialMedia = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100px;
    gap: 1rem;
`;
const IconWrapper = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f6f7fb;
    border-radius: 50%;
    padding: 12px;
    width: 50px;
    height: 50px;
    stroke: black;
    &:hover {
        background-color: #f9f9f9;
        transition: all 0.3s ease-in-out;
        background-color: #a4f3de;
        cursor: pointer;
    }
`;
const FooterCopyRight = styled.div`
    margin: 1rem 0rem;
`;
const FooterDesc = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 1rem;
    height: 240px;
    width: 240px;
    @media screen and (max-width: 610px) {
        height: 260px;
    }
    @media screen and (max-width: 512px) {
        height: 200px;
    }
`;
const Img = styled.img`
    width: 7rem;
    height: auto;
`;
const FooterLinkItems = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    height: 240px;
    width: 240px;
    h2 {
        font-size: 18px;
        margin-bottom: 16px;
        background-color: white;
        color: black;
        text-align: left;
    }
    p {
        font-size: 16px;
        margin-bottom: 0.5rem;
        cursor: pointer;
        color: #1a202c;
    }
    a {
        font-size: 16px;
        text-decoration: none;
        color: black;
    }
    a:hover {
        font-size: 16px;
        color: #2975ff;
        transition: 0.3s ease-out;
    }
    @media screen and (max-width: 850px) {
        gap: 0.5rem;
    }
    @media screen and (max-width: 512px) {
        gap: 0;
        height: 200px;
    }
`;

export default Footer;
