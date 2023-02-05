import { useState, useRef, useContext } from "react";
import styled from "styled-components";
import SearchResults from "./SearchResults";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "./ProductContext";

const SearchBar = () => {
    const navigate = useNavigate();
    const searchBarRef = useRef(null);
    const [selectedResultsIndex, setSelectedResultsIndex] = useState(0); // This state is to be used later for the selection of the search bar results with the keyboard
    const [searchInput, setSearchInput] = useState(""); //search input
    const { cats, allProducts } = useContext(ProductContext);

    //HANDLECHANGE FUNCTION TO UPDATE SEARCH INPUT WHILE USER TYPES INTO SEARCHBAR
    const handleChange = (ev) => {
        ev.preventDefault();
        setSearchInput(ev.target.value);
    };
    if (selectedResultsIndex > 20) {
        setSelectedResultsIndex(20);
    }
    if (selectedResultsIndex < 0) {
        setSelectedResultsIndex(0);
    }

    //event listener for enter push
    const handleEnter = (id) => {
        navigate(`/products/${id.current}`);
        return;
    };

    //This Id will be used to carry the current ID while using the keyboard so that "Enter" can navigate using this
    // variable from the child
    const thisId = useRef(0);

    return (
        <Wrapper>
            <BarWrapper>
                <FiSearch size={20} />
                <Bar
                    type="text"
                    placeholder={"Search by product or brand"}
                    onChange={handleChange}
                    ref={searchBarRef}
                    onKeyDown={(ev) => {
                        //keyboard functionality
                        switch (ev.key) {
                            case "Enter": {
                                searchBarRef.current.value = ""; // clear searchbar
                                setSearchInput("");
                                handleEnter(thisId); // handler that will use current ID
                                return;
                            }
                            case "ArrowUp": {
                                setSelectedResultsIndex(
                                    selectedResultsIndex - 1
                                );
                                return;
                            }
                            case "ArrowDown": {
                                setSelectedResultsIndex(
                                    selectedResultsIndex + 1
                                );
                                return;
                            }
                            case "Escape": {
                                searchBarRef.current.value = ""; // clear searchbar
                                setSearchInput("");
                                break;
                            }
                            default: {
                            }
                        }
                    }}
                />
            </BarWrapper>
            <SearchResults
                cats={cats}
                thisId={thisId}
                setSearchInput={setSearchInput}
                searchBarRef={searchBarRef}
                searchInput={searchInput}
                selectedResultsIndex={selectedResultsIndex}
                setSelectedResultsIndex={setSelectedResultsIndex}
                items={allProducts}
            />
        </Wrapper>
    );
};

const Wrapper = styled.div`
    margin-left: 2rem;
    @media screen and (max-width: 590px) {
        margin: 0;
    }
`;
const Bar = styled.input`
    width: 500px;
    border: none;
    border-radius: 20px;
    height: 40px;
    font-size: 20px;
    margin-left: 10px;
    &:focus {
        outline: none;
    }
    @media screen and (max-width: 590px) {
        width: 400px;
        font-size: 14px;
    }
    @media screen and (max-width: 500px) {
        width: 300px;
        font-size: 14px;
    }
`;
const BarWrapper = styled.div`
    border: 2px solid lightgrey;
    width: fit-content;
    background: white;
    border-radius: 20px;
    padding-left: 12px;
    display: flex;
    align-items: center;
`;
export default SearchBar;
