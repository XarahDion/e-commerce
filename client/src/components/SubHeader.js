import { useContext } from "react";
import { ProductContext } from "./ProductContext";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import logo from "../assets/loadingIcon.gif";

const SubHeader = () => {
    const navigate = useNavigate();
    const { cats, setSelectedCat } = useContext(ProductContext);
    const handleCatClick = (ev) => {
        ev.preventDefault();
        setSelectedCat(ev.target.innerText);
        navigate(`/product-page/${ev.target.innerText.toLowerCase()}`);
    };

    const homeHandler = () => {
        navigate("/");
    };

    const saleHandler = () => {
        navigate("/product-page/deals");
    };

    return (
        <Wrapper>
            {cats ? (
                <>
                    <Category onClick={homeHandler}>Home</Category>{" "}
                    <Category onClick={saleHandler}>Deals</Category>
                </>
            ) : (
                <Logo src={logo} alt="loading" />
            )}
            {cats ? (
                cats.map((cat, index) => {
                    return (
                        <Category key={index} onClick={handleCatClick}>
                            {cat}
                        </Category>
                    );
                })
            ) : (
                <div></div>
            )}
        </Wrapper>
    );
};

const Logo = styled.img`
    width: 40px;
    height: 40px;
    margin-left: -300px;
`;

const Wrapper = styled.div`
    display: flex;
    justify-content: space-around;
    border-bottom: 1px solid #e0e0e0;
    border-top: 1px solid #e0e0e0;
    width: 100%;
    padding: 5px;
    margin-bottom: 1rem;
    @media (max-width: 650px) {
        flex-wrap: wrap
    }
`;
const Category = styled.button`
    font-family: "inter", sans-serif;
    background-color: transparent;
    color: black;
    text-transform: uppercase;
    width: 200px;
    font-size: 16px;
    font-weight: 600;
    &:hover {
        background-color: #00cc96;
        color: white;
    }
    @media (max-width: 900px) {
        font-size: 12px;
        padding: 4px 8px;
        width: 160px;
    }
    @media (max-width: 650px) {
        font-size: 10px;
        width: 120px;
        height: 24px;
    }
`;
export default SubHeader;
