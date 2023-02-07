import { useEffect } from "react";
import styled from "styled-components";
import logo from "../assets/loadingIcon.gif";

const Pagination = (props) => {
    const { currentPage, setCurrentPage, products, params } = props;

    const limit = 12;
    let pages = products?.length / limit; // number of pages is total # of products/limit
    pages = Math.ceil(pages); // round up page total

    useEffect(() => {
        setCurrentPage(1); // everytime params change, reset current page to 1
    }, [params]);

    // if user presses forward arrow, increase by 1. if it is at last page, do not allow to increase page number
    const currentPageHandler = () => {
        if (currentPage >= pages) {
        } else {
            setCurrentPage(currentPage + 1);
        }
    };
    // if user presses back arrow, decrease by 1. if it is at first page, do not allow to decrease page number
    const backPageHandler = () => {
        if (currentPage <= 1) {
        } else {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <>
            <Wrapper>
                {!currentPage ? (
                    <Logo src={logo} alt="loading" />
                ) : (
                    <>
                        <PageOfPage className="pagination">
                            {currentPage} of {pages} pages
                        </PageOfPage>
                        <NextPageContainer>
                            <NextPage>Next Page</NextPage>
                            <button onClick={backPageHandler}>{"<"}</button>
                            <button onClick={currentPageHandler}>{">"}</button>
                        </NextPageContainer>
                    </>
                )}
            </Wrapper>
        </>
    );
};

const Logo = styled.img`
    width: 50px;
    height: 50px;
`;
const NextPageContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 200px;
    margin-right: 10px;
    button {
        border: none;
        background-color: #eff0f2;
        color: black;
    }
    @media (max-width: 500px) {
        width: auto;
        gap: 3px;
        justify-content: center;
    }
`;
const NextPage = styled.div`
    @media (max-width: 500px) {
        display: none;
    }
`;
const PageOfPage = styled.div`
    @media (max-width: 410px) {
        display: none;
    }
`;
const Wrapper = styled.div`
    margin: 100px 100px;
    align-items: center;
    width: 80%;
    display: flex;
    justify-content: space-between;
    @media (max-width: 850px) {
        margin: 50px 50px;
        width: auto;
    }
    @media (max-width: 500px) {
        justify-content: space-around;
        margin: 10px 20px 40px 20px;
    }
`;
export default Pagination;
