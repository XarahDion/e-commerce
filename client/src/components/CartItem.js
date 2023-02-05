import { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import { ProductContext } from "./ProductContext";
import logo from "../assets/loadingIcon.gif";
import styled from "styled-components";

/// renders each item in cart
const CartItem = ({ item, handleAdd, handleRemove, occurences }) => {
    const [currentItem, setCurrentItem] = useState();
    const { allProducts, sales } = useContext(ProductContext);
    const { state, cart } = useContext(CartContext);

    /// returns array of items in cart from AllProducts based on item (itemId)
    useEffect(() => {
        if (allProducts && item) {
            const filteredArr = allProducts.filter((product) => {
                return product._id === item;
            });
            setCurrentItem(filteredArr[0]);
        }
    }, [item, allProducts, state.cartItems, cart]);
    //initialize sale as false
    let sale = false;
    //initialize saleDiscount as null
    let saleDiscount = null;
    let salePrice = null;
    //if our item id is in the sale array, sale will be true
    sales?.forEach((item) => {
        //make the discount available here
        saleDiscount = item.salesDiscount;
        if (item._id === currentItem?._id) {
            sale = true;
            //calculates the after discount price of the item
            salePrice = Math.floor(
                currentItem.price.split("$")[1] * (1 - saleDiscount)
            );
        }
    });

    return (
        <>
            {!currentItem ? (
                <Logo src={logo} alt="loading" />
            ) : (
                <ItemDiv>
                    {sale ? <SaleTag>SALE</SaleTag> : <></>}
                    <ProductImage src={currentItem.imageSrc} />
                    <Container>
                        <h5>{currentItem.name}</h5>
                        <Sales>
                            {sale ? (
                                <>
                                    <OldPrice>{currentItem.price}</OldPrice>
                                    <Price>${salePrice}</Price>
                                </>
                            ) : (
                                <Price>{currentItem.price}</Price>
                            )}
                        </Sales>
                        <h4>x {occurences}</h4>
                        <ButtonDiv>
                            {/* //call the handle add function */}
                            <BtnAdd onClick={(e) => handleAdd(e, currentItem)}>
                                Add to cart
                            </BtnAdd>
                            <BtnRmv
                                onClick={() => {
                                    handleRemove(currentItem);
                                }}
                            >
                                Remove from cart
                            </BtnRmv>
                        </ButtonDiv>
                    </Container>
                </ItemDiv>
            )}
        </>
    );
};

const Price = styled.p`
    font-weight: bold;
`;
const Sales = styled.div`
    display: flex;
    margin-right: -100px;
    @media screen and (max-width: 460px) {
        margin-right: 0px;
        justify-content: center;
        flex-direction: column;
    }
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
    @media screen and (max-width: 1140px) {
        top: 24px;
        left: 280px;
    }
    @media screen and (max-width: 460px) {
        left: 200px;
    }
`;
const BtnAdd = styled.button`
    &hover {
        background-color: #f0f0f0;
    }
`;
const BtnRmv = styled.button`
    color: #1a202c;
    background-color: #eff0f2;
    &:hover {
        background-color: #00cc96;
        color: white;
    }
`;
const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 24px;
    @media screen and (max-width: 460px) {
        max-width: 300px;
        text-align: center;
        padding: 1rem;
        h5 {
            font-size: 12px;
        }
    }
`;
const ProductImage = styled.img`
    width: 192px;
    height: 192px;
    border-radius: 32px;
    border: 2px solid #f6f7fb;
    padding: 8px;
`;
const ButtonDiv = styled.div`
    margin-top: 24px;
    display: flex;
    justify-content: space-around;
    width: 337px;
    @media screen and (max-width: 460px) {
        flex-direction: column;
        gap: 1rem;
        width: 200px;
    }
`;
const ItemDiv = styled.div`
    display: flex;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
    border-radius: 48px;
    padding: 34px;
    margin-bottom: 10px;
    max-width: 700px;
    position: relative;
    @media screen and (max-width: 1140px) {
        flex-direction: column;
        justify-content: center;
        align-items: center;
        max-width: 400px;
    }
    @media screen and (max-width: 460px) {
        max-width: 300px;
        padding-bottom: 14px;
    }
`;
const Logo = styled.img`
    width: 50px;
    height: 50px;
`;

export default CartItem;
