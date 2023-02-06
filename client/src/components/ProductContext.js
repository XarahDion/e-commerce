import { createContext, useState, useEffect } from "react";
export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [state, setState] = useState(null);
    const [allProducts, setAllProducts] = useState(null);
    const [selectedCat, setSelectedCat] = useState(null);
    const [filter, setFilter] = useState(null); // used in search results
    const [all, setAll] = useState(true); // used in search results.
    const [search, setSearch] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState(null);
    const [saleProducts, setSaleProducts] = useState(null);
    const [searchProducts, setSearchProducts] = useState(null);
    const [refresh, setRefresh] = useState(0); // refresh is created SOLELY to be a dependency for triggering every refresh
    const [deals, setDeals] = useState(null); //array shuffler for use anywhere required
    const shuffleArray = (array) => {
        return array.sort(() => 0.5 - Math.random());
    };

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/get-items/`)
            .then((res) => res.json())
            .then((res) => {
                setAllProducts(res.data);
                if (!saleProducts) {
                    setSaleProducts(shuffleArray(res.data).slice(222));
                } // sets random salesProducts from data
                setRefresh(refresh + 1); // refresh counter only when this fetch occurs
            });
    }, []);
    // ids are an array of ids, this is used in the search bar functionality.
    const ids = allProducts?.map((item) => {
        return item._id;
    });
    // array of 6 discount rates to be used in sales
    const discountOptions = [0.1, 0.2, 0.3, 0.4, 0.6, 0.5];
    // sales is an array of a random selection of items for purposes of sales.
    // map through selected sale products and create new array with objects.
    // object format {_id:, salesDiscount}

    const sales = saleProducts?.map((item) => {
        return {
            _id: item._id,
            salesDiscount:
                discountOptions[
                    Math.floor(Math.random() * discountOptions.length)
                ],
        };
    });

    // CREATE ARRAY OF ALL UNIQUE CATEGORIES
    const unique = (value, index, self) => {
        return self.indexOf(value) === index;
    };
    const allCats = allProducts?.map((item) => {
        return item.category;
    });
    // cats stand for categories, scans through database and returns unique categories
    // used in header, and any other logic required throughout the website
    const cats = allCats?.filter(unique);

    allProducts?.forEach((item) => {
        if (item.category === "Pets and Animals") {
            item.category = "Pets";
        }
    });
    // FILTER PRODUCT LOGIC
    //initialize filterProducts function which takes in the params from the productPage
    const filterProducts = (params) => {
        setFilter(params);
        // all is used in product page to conditionally render
        if (params === "All") {
            setAll(true);
        }
        // search is used in product page to conditionally render when the user hits "see all" in searchbar
        else if (params === "Results") {
            setAll(false);
            setSearch(true);
            setDeals(false);
        } else if (params === "Deals") {
            setAll(false);
            setSearch(false);
            setDeals(true);
        }
        // else is to catch when user hits a catagory.
        // this will be changed to so that there will be an error page if they do not select "all"
        // , "results" or one of the categories.
        else {
            setAll(false);
            setSearch(false);
            setDeals(false);
        }
    };
    // below is filtering logic specifically for categories
    // we have an endpoint for categories which is triggered when when filter is used
    // refresh is created SOLELY to be a dependency for triggering every refresh. without this
    // it would not filter when user refreshes, but only when they navigate to it from another page.
    useEffect(() => {
        if (cats?.includes(filter)) {
            fetch(
                `${process.env.REACT_APP_BACKEND_URL}/api/get-item/by-category/${filter}`
            )
                .then((res) => res.json())
                .then((res) => {
                    setFilteredProducts(res.data);
                    setState("");
                });
        } else if (filter === "Results") {
            //setFilteredProducts is used in search results when this happens
        } else if (filter === "Deals") {
            // deals page. only bring in products that match our sales
            let deals = allProducts?.filter((item) =>
                sales.some((sale) => sale._id === item._id)
            );
            setFilteredProducts(deals);
        }
    }, [filter, refresh]);

    // function used in search results to do the above ^
    const seeAll = (results) => {
        setFilteredProducts(results);
    };

    return (
        <ProductContext.Provider
            value={{
                allProducts,
                cats,
                sales,
                ids,
                shuffleArray,
                setSelectedCat,
                selectedCat,
                filterProducts,
                all,
                filteredProducts,
                searchProducts,
                setSearchProducts,
                setSearch,
                search,
                seeAll,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};
