import { createContext, useReducer, useState, useEffect, useMemo} from "react";
export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [state, setState] = useState(null)
    const [allProducts, setAllProducts] = useState(null) // initialize all products state for fetching from database
    const [selectedCat, setSelectedCat] = useState(null) // initialize selectedCatagory for when user selects
    const [filter, setFilter] = useState(null) // used in search results 
    const [all, setAll] = useState(true) // used in search results.
    const [search, setSearch] = useState(false) // used in search results
    const [filteredProducts, setFilteredProducts] = useState(null) // used in filtering all products based on user action
    const [saleProducts, setSaleProducts] = useState(null) // used for deal pages
    const [searchProducts, setSearchProducts] = useState(null) // used for search results
    const [refresh, setRefresh]= useState(0) // refresh is created SOLELY to be a dependency for triggering every refresh
    const [deals, setDeals]=useState(null)
      //array shuffler for use anywhere required
  const shuffleArray = (array) => {
    return array.sort(() => 0.5 - Math.random())
  }
 // FETCH ITEMS
 
    useEffect(() => {
        fetch(`/api/get-items/`)
        .then(res => res.json())
        .then(res => {
        setAllProducts(res.data); // set all products to data
        if (!saleProducts) { // if we dont already have sale products, set them here
        setSaleProducts(shuffleArray(res.data).slice(222))} // sets random salesProducts from data // ideally, sales data would be stored in MONGO
        setRefresh(refresh+1) // refresh counter only when this fetch occurs
      });
  }, []);
  // ids are an array of ids, this is used in the search bar functionality.
  const ids = allProducts?.map((item) => {
    return item._id
  })
  // array of 6 discount rates to be used in sales
  const discountOptions = [0.10, 0.20, 0.30, 0.40, 0.6, 0.5]
  //sales is an array of a random selection of items for purposes of sales.
  // map through selected sale products and create new array with objects.
  // object format {_id:, salesDiscount}

  const sales = saleProducts?.map((item) => {
    return {_id:item._id, salesDiscount: discountOptions[Math.floor(Math.random() * discountOptions.length)]}
  })

  //console.log(saleIds)
      // CREATE ARRAY OF ALL UNIQUE CATEGORIES 
  const unique = (value, index, self) => {
    return self.indexOf(value) === index;
  };
  const allCats = allProducts?.map((item) => {
    return item.category;
  });
  //cats stand for categories, scans through database and returns unique categories
  // used in header, and any other logic required throughout the website
  const cats = allCats?.filter(unique);

  allProducts?.forEach((item => {
    if (item.category === "Pets and Animals") {
      item.category = "Pets"
    }
  }))
 
  /////////////////////////////////////////////////
  // FILTER PRODUCT LOGIC
  //initialize filterProducts function which takes in the params from the productPage
  const filterProducts = (params) => {
    // set filter to this params 
    setFilter(params)
    // if params is all, toggle all. all is used in product page to conditionally render
    // the product page

    if (params === "All") {
        setAll(true)
    }
    // if params is results, set all to false and set search to true. search is used in product page
    // to conditionally render when the user hits "see all" in searchbar
    else if (params === "Results") {
      setAll(false)
      setSearch(true)
      setDeals(false)
      //console.log(search)
    } 

    else if (params === "Deals"){
      setAll(false)
      setSearch(false)
      setDeals(true)
    }
    // else is to catch when user hits a catagory.
    // this will be changed to so that there will be an error page if they do not select "all"
    // , "results" or one of the categories.
    else {
        setAll(false)
        setSearch(false)
        setDeals(false)
    }
  }
  // below is filtering logic specifically for categories
  // we have an endpoint for categories which is triggered when when filter is used
  // refresh is created SOLELY to be a dependency for triggering every refresh. without this 
  // it would not filter when user refreshes, but only when they navigate to it from another page.
  useEffect(() => {
    if (cats?.includes(filter)) {
    fetch(`/api/get-item/by-category/${filter}`)
    .then(res => res.json())
    .then(res =>  {
        setFilteredProducts(res.data)
        setState("")
    })
    }
    else if (filter === "Results") {
      //setFilteredProducts is used in search results when this happens
      
    }

    else if (filter === "Deals") {
      // deals page. only bring in products that match our sales
      let deals = allProducts?.filter(item => sales.some(sale => sale._id === item._id))
      setFilteredProducts(deals)
    }
    }, [filter, refresh ])

    // function used in search results to do the above ^
  const seeAll = ((results => {
   setFilteredProducts(results)
  }))

    return (
        <ProductContext.Provider
            value={{
                allProducts, //array of allProducts
                cats, // array of all unique categories
                sales, //array of ids of sale items randomly generated
                ids, // array of ids of all products
                shuffleArray, //  returns a shuffled version of your array // usage --> shuffleArray(array)
                setSelectedCat, //used in subheader to track category clicked
                selectedCat, // ^^
                filterProducts, // filterProducts function explained above 
                all, // used to in filtering process
                filteredProducts, // used to in filtering process
                searchProducts, // used to in filtering process
                setSearchProducts, // used to in filtering process
                setSearch, // used to in filtering process
                search, // used to in filtering process
                seeAll, // function to be used in search results, to filter items
                
            }}
        >
            {children}
        </ProductContext.Provider>
    )
}
