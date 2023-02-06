import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ProductContext } from "./ProductContext";

const ProductCard = ({ item }) => {
    const navigate = useNavigate();
    // Bring in sales which is a random array of items and discounts rate from allProducts//
    // it is calculated only once in the file (when the fetch occurs)
    const { sales } = useContext(ProductContext);
    let sale = false;
    let salePrice = null;
    let salesDiscount = null;

    sales?.forEach((saleItem, index) => {
        salesDiscount = saleItem.salesDiscount;
        if (saleItem._id === item?._id) {
            sale = true;
        }
    });

    let roundedItemPrice = Math.round(item.price.slice(1));
    salePrice = roundedItemPrice * (1 - salesDiscount);
    salePrice = parseFloat(salePrice.toFixed(0));

    const handleNavigate = () => {
        navigate(`/products/${item._id}`);
    };

    let shortItemName = item.name.split(" ").slice(0, 6).join(" ");

    return (
        <Wrapper onClick={handleNavigate}>
            {sale ? <SaleTag>SALE</SaleTag> : <></>}
            <ImgDiv>
                <ProductImage src={item.imageSrc} />
            </ImgDiv>
            <Name>{shortItemName}</Name>
            <StyledButtonCategory category={item.category}>
                <StyledCategory category={item.category}>
                    {item.category}
                </StyledCategory>
                <Sales>
                    {sale ? (
                        <>
                            <OldPrice>${roundedItemPrice}</OldPrice>
                            <Price>${salePrice}</Price>
                        </>
                    ) : (
                        <Price>${roundedItemPrice}</Price>
                    )}
                </Sales>
            </StyledButtonCategory>
        </Wrapper>
    );
};

const Sales = styled.div`
    display: flex;
    margin-right: -100px;
`;
const OldPrice = styled.p`
    text-decoration: line-through;
    color: lightgrey;
    margin-right: 10px;
`;
const StyledCategory = styled.p`
    color: ${(props) =>
        props.category === "Fitness"
            ? "#00CC96"
            : props.category === "Lifestyle"
            ? "#A066FF"
            : props.category === "Medical"
            ? "#2975FF"
            : props.category === "Entertainment"
            ? "#FF7F23"
            : "grey"};
    background-color: ${(props) =>
        props.category === "Fitness"
            ? "#D7FFF4"
            : props.category === "Lifestyle"
            ? "#F4ECFF"
            : props.category === "Medical"
            ? "#E1ECFF"
            : props.category === "Entertainment"
            ? "#FFEADB"
            : "lightgrey"};
    font-weight: bolder;
    font-size: 14px;
    border-radius: 48px;
    margin: 5px 40px;
    margin-left: -110px;
    text-align: center;
    padding: 2px 10px;
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
`;
const StyledButtonCategory = styled.div`
    display: flex;
    align-items: center;
    margin-top: 10px;
`;
const Price = styled.p`
    font-weight: bold;
`;
const Name = styled.div`
    font-weight: bold;
    font-size: 14px;
    text-align: center;
    line-height: 18px;
    height: 42px;
`;
const Wrapper = styled.div`
    position: relative;
    width: 260px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px;
    padding: 12px;
    border: 1px solid var(--border-color);
    border-radius: 48px;
    &:hover {
        cursor: pointer;
        background-color: #f6f7fb;
    }
`;
const ProductImage = styled.img`
    width: auto;
    height: auto;
    border-radius: 48px;
`;
const ImgDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    width: 200px;
`;
export default ProductCard;
