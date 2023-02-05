import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useContext } from "react";
import styled from "styled-components";
import logo from "../assets/loadingIcon.gif";
import { ProductContext } from "./ProductContext";
import { CartContext } from "./CartContext";

const ProductDetails = () => {
    const [currentProduct, setCurrentProduct] = useState();
    const [company, setCompany] = useState();
    const {
        actions: { addItemToCart },
    } = useContext(CartContext);
    const id = useParams();
    const { allProducts, sales } = useContext(ProductContext);

    useEffect(() => {
        if (allProducts) {
            const currentItem = allProducts.filter((product) => {
                return product._id === id.productId;
            });
            setCurrentProduct(currentItem[0]);
        }
    }, [allProducts]);

    useEffect(() => {
        if (currentProduct) {
            fetch(
                `${process.env.REACT_APP_BACKEND_URL}/get-company/${currentProduct.companyId}`
            )
                .then((res) => res.json())
                .then((data) => setCompany(data.data));
        }
    }, [currentProduct]);

    let sale = false;
    let saleDiscount = null;
    let salePrice = null;

    sales?.forEach((item) => {
        saleDiscount = item.salesDiscount;
        if (item._id === currentProduct?._id) {
            sale = true;
            salePrice = Math.floor(
                currentProduct.price.split("$")[1] * (1 - saleDiscount)
            );
        }
    });

    const handleAdd = () => {
        addItemToCart(currentProduct._id);
    };

    return (
        <Wrapper>
            {!currentProduct || !company ? (
                <Logo src={logo} alt="loading" />
            ) : (
                <Container>
                    <ImgContainer>
                        {sale ? <SaleTag>SALE</SaleTag> : <div></div>}
                        <Img
                            src={currentProduct.imageSrc}
                            alt={currentProduct}
                        />
                    </ImgContainer>
                    <InfosContainer>
                        <h3>{currentProduct.name}</h3>
                        <Sales>
                            {sale ? (
                                <>
                                    <OldPrice>{currentProduct.price}</OldPrice>
                                    <Price>${salePrice}</Price>
                                </>
                            ) : (
                                <Price>{currentProduct.price}</Price>
                            )}
                        </Sales>
                        <p>{currentProduct.numInStock} in stock</p>
                        <p>Manufactured by {company.name}</p>
                        <StyledButton
                            onClick={handleAdd}
                            stock={currentProduct.numInStock}
                            disabled={
                                currentProduct.numInStock === 0 ? true : false
                            }
                        >
                            {currentProduct.numInStock > 0
                                ? "Add to cart"
                                : "Out of stock"}
                        </StyledButton>
                    </InfosContainer>
                </Container>
            )}
        </Wrapper>
    );
};

const Container = styled.div`
    display: flex;
    align-content: center;
    justify-content: center;
    margin: 3rem;
    padding: 2rem;
    @media screen and (max-width: 850px) {
        margin: 1rem;
    }
    @media screen and (max-width: 590px) {
        flex-direction: column;
    }
`;
const Price = styled.p`
    font-weight: bold;
`;
const Sales = styled.div`
    display: flex;
`;
const OldPrice = styled.p`
    text-decoration: line-through;
    color: lightgrey;
    margin-right: 10px;
`;
const SaleTag = styled.div`
    background-color: red;
    color: white;
    width: 65px;
    font-size: 15px;
    padding: 3px 5px;
    font-weight: bold;
    text-align: center;
    border-radius: 15px;
    position: absolute;
    top: 12px;
    left: 180px;
    z-index: 222;
    @media screen and (max-width: 590px) {
        left: 240px;
    }
`;
const Logo = styled.img`
    width: 50px;
    height: 50px;
`;
const ImgContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 300px;
    width: 300px;
    border-radius: 48px;
    position: relative;
    background-color: #f6f7fb;
    @media screen and (max-width: 590px) {
        margin-bottom: 1rem;
        width: auto;
        text-align: center;
    }
`;
const Img = styled.img`
    width: 200px;
    height: auto;
    border-radius: 48px;
`;
const InfosContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 300px;
    margin-left: 2rem;
    @media screen and (max-width: 750px) {
        align-items: center;
        text-align: center;
    }
    @media screen and (max-width: 590px) {
        margin: 0;
        width: auto;
        text-align: center;
        h3 {
            font-size: medium;
            max-width: 75%;
        }
    }
`;
const Wrapper = styled.div``;
const StyledButton = styled.button`
    margin-top: 1.5em;
    background-color: ${(props) => (props.stock === 0 ? "grey" : "#00CC96")};
    &:hover {
        transform: ${(props) =>
            props.stock === 0 ? "none" : "scale(1.1, 1.1)"};
    }
    &:disabled {
        pointer-events: none;
    }
`;

export default ProductDetails;
