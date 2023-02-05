import { useContext, useEffect, useState } from "react";
import { ProductContext } from "./ProductContext";
import styled from "styled-components";
import ProductCard from "./ProductCard";

const Suggestion = () => {
    //import all the products from the context
    const { allProducts } = useContext(ProductContext);
    const [randomArr, setRandonArr] = useState([]);

    //On mounts: this useeffect creates an array with 8 values
    useEffect(() => {
        setRandonArr(
            Array.from(
                { length: 8 },
                () => Math.floor(Math.random() * allProducts.length) // random number between 0 and the length of the array
            )
        );
    }, []);

    return (
        <>
            <SecondaryTitles>
                <h5> Our best sellers</h5>
                <h1>Featured wearables</h1>
            </SecondaryTitles>
            <SuggestionsWrapper>
                {randomArr.map((index) => {
                    return (
                        <ProductCard
                            key={index + "randomthingsforkeys"}
                            item={allProducts[index]}
                        />
                    );
                })}
            </SuggestionsWrapper>
        </>
    );
};

const SecondaryTitles = styled.div`
    padding-top: 84px;
    display: flex;
    flex-direction: column;
    align-items: left;
    max-width: 1400px;
    margin-left: 64px;
    h5 {
        font-family: "inter", sans-serif;
        font-size: 16px;
        color: #1a202c;
        @media (max-width: 768px) {
            margin-left: 16px;
            margin-right: 16px;
        }
    }
    h1 {
        font-size: 36px;
        line-height: 48px;
        color: #1a202c;
        @media (max-width: 768px) {
            margin-left: 16px;
            margin-right: 16px;
        }
    }
    @media (max-width: 768px) {
      padding-top: 42px;
    }
`;
const SuggestionsWrapper = styled.div`
    padding-top: 42px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem;
    margin: 0 auto;
`;

export default Suggestion;
