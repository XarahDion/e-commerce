import ProductCard from "./ProductCard";
import { useEffect, useState, useContext } from "react";
import { ProductContext } from "./ProductContext";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import Pagination from "./Pagination";
import logo from "../assets/loadingIcon.gif";

const ProductPage = () => {
    const {
        allProducts, //allProducts from the get-items fetch in the context
        filterProducts, //filterProducts this is a function // see use below
        all, // all is a toggle for filtering. if all products are shown this is true, otherwise, false
        filteredProducts, // these are products that have been filtered in context based on aactions (See all search results)
    } = useContext(ProductContext);
    // get params when user is on this page. // the result will either be
    // 1. "all" which is all products. 2. [cat] which is catagory name
    // and 3. which is results... which is when user clicks "see all" in the searchbar dropdown
    let params = useParams().cat;
    params = params[0].toUpperCase() + params.slice(1);
    // filterProducts function from Context is used here, jump to context to see what is happening
    filterProducts(params);

    // PAGINATION
    // current page starts at one, this is used as a prop in paginatiojn
    const [currentPage, setCurrentPage] = useState(1);
    // see Product grid, this is slicing array of products depending on value of x and y. which is manipulated below
    const [x, setX] = useState(0);
    const [y, setY] = useState(12);

    // change page function. i
    const changePages = (pageNum) => {
        if (pageNum === 1) {
            // if page is 1 , set initial slice values
            setX(0);
            setY(12);
        } else {
            // else set them accordingly
            setX(12 * (pageNum - 1) + 1);
            setY(12 * pageNum + 1);
        }
    };
    // everytime page changes, perform changePages function
    useEffect(() => {
        changePages(currentPage);
    }, [currentPage]);

    // title of product page will change depending on the params.

    let title = "Explore the latest wearables";

    if (params === "Deals") {
        title = "Explore our great deals";
    }
    if (params === "Results") {
        title = "Search results";
    }

    return (
        <Wrapper>
            <Explore>
                <h1>{title}</h1>
            </Explore>
            {!allProducts ? (
                <LogoContainer>
                    <Logo src={logo} alt="loading" />
                </LogoContainer> // loading logo depended on fetched items
            ) : (
                <Container>
                    <ProductGrid>
                        {!all // if all (context which keeps track of filter) // show either all products or just filtered products. x and y are sliced above
                            ? filteredProducts?.slice(x, y).map((item) => {
                                  return <ProductCard item={item} />;
                              })
                            : allProducts?.slice(x, y).map((item) => {
                                  return <ProductCard item={item} />;
                              })}
                    </ProductGrid>
                </Container>
            )}
            {all ? ( // pagination which takes in props, one version for all products, another for filters
                <Pagination
                    currentPage={currentPage}
                    products={allProducts}
                    setCurrentPage={setCurrentPage}
                    limit={12}
                    params={params}
                    onPageChange={(page) => setCurrentPage(page)}
                />
            ) : (
                <Pagination
                    currentPage={currentPage}
                    all={false}
                    products={filteredProducts}
                    setCurrentPage={setCurrentPage}
                    limit={12}
                    params={params}
                    onPageChange={(page) => setCurrentPage(page)}
                />
            )}
        </Wrapper>
    );
};

const LogoContainer = styled.div`
    display: flex;
    justify-content: center;
`;
const Logo = styled.img`
    width: 50px;
    height: 50px;
`;
const Container = styled.div`
    display: flex;
    justify-content: center;
`;
const Explore = styled.div`
    margin: 2rem 0px 0px 2rem;
    text-align: start;
    @media (max-width: 650px) {
        margin: 0;
        border-bottom: 1px solid #e0e0e0;
        border-top: 1px solid #e0e0e0;
        h1 {
            font-size: 20px;
        }
    }
    @media (max-width: 825px) {
        h1 {
            text-align: center;
        }
    }
`;
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;
const ProductGrid = styled.div`
    padding-top: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem;
    margin: 0 auto;
`;

export default ProductPage;
