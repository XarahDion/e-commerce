
import { useContext  } from "react"
import styled from "styled-components"
import { ProductContext } from "./ProductContext"
import { useNavigate } from "react-router-dom"

const SearchResults = ({thisId, searchInput, setSearchInput, items, setSelectedResultsIndex, selectedResultsIndex, enter, setEnter, cats, searchBarRef}) => {
  // declare navigate function to use the navigate hook
    const navigate = useNavigate();
    const {
        ids,
        allProducts,
        setSearchProducts,
        setSearch,
        seeAll,
    } = useContext(ProductContext)
    // ACTIVE WILL TOGGLE ON IF THERE IS ANY INPUT IN SEARCHBAR
    let active = false
    if (searchInput.length > 1) {
        active = true
    }
    else {
        active = false
    }
    // initialize itemNames array
    let itemNames = []
    //push each item lower case name into itemNames array
    items && items.forEach((item => {
        itemNames.push(item.name)
    }))
    // initialize Matches for search bar
    let results = []
    // logic to get results, using name array and matching to search input
    if (items && active) {
        results = itemNames.filter(itemName => itemName.toLowerCase().includes(searchInput.toLowerCase()))
    }
    // if user uses multiple words in search, it splits into array of searchinputs
    const searchInputs = searchInput.split(" ")
    
    // Map through search inputs and and find results. this will give us arrays of results for each search input
    const multipleResults = searchInputs.map((searchInput, index) => {
        return itemNames.filter(itemName => itemName.toLowerCase().includes(searchInput.toLowerCase()))
    })
    // below is logic that take multiple arrays of the results and combine into 1 array. 
    const combinedResults = multipleResults.shift().filter(x => {
        return multipleResults.every(y =>  {
            return y.indexOf(x) !== -1
        })
    })
    // limit the search results to 20. the remaining results will be triggered by a "see all" button
    const firstResults = combinedResults.slice(0, 10)

    // Before, after, and match are logic for bolding appropriate word.
    // at this time , this is only functional with THE FIRST SEARCH QUERY WORD.
    // others will not be bolded, seems like its not possible without DangerouslysetinnerHTML.
    const before = (itemName, query) => {
        let index = itemName.toLowerCase().indexOf(query.toLowerCase())
        //console.log(index)
       // console.log(itemName)
        let part = itemName.slice(0, index)
        return part
    }
    const after = (itemName, query) => {
        let index = itemName.toLowerCase().indexOf(query.toLowerCase())
        let x = itemName.slice(index)
        let part = x.slice(query.length)
        return part
    }
    const match = (itemName, query) => {
        let index = itemName.toLowerCase().indexOf(query.toLowerCase())
        let x = itemName.slice(index)
        let part = x.slice(0, query.length)
        return part
    }
    // declare selected result state.
    
    // handler for clicking an item on results to be navigated to its details site.
    // reset values 
    const handleSelect = (event, id) => {
        navigate(`/products/${id}`)
        searchBarRef.current.value = "" // clear searchbar
        setSearchInput("") //clear state for search input
    }

    const handleAllResults = (ev) => {
        ev.preventDefault();
        setSearchProducts(combinedResults)
        let results =[]
        combinedResults.forEach((result => {
            allProducts.forEach((item => {
                if (item.name === result) {
                    results.push(item)
                }
            }))
        }))
        seeAll(results)
        navigate("/product-page/results")
        searchBarRef.current.value = "" // clear searchbar
        setSearchInput("") //clear state for search input
        setSearch(true)
    }

    return (
        <Wrapper>
        {
        !active
        ? <div></div>
        : 
        <ResultsList>
            {
                // logic to select different items in results. with mouse and keyboard
                // this map works through each RESULT
                firstResults.map((result, i) => {
                    const index = itemNames.indexOf(result) // as we are working with the names array, we use the index of the result to the names array
                    const id = items[index]._id // once index found, use it to find id of the item  
                    // when result is selected it will return true if the results index(i) 
                    const isSelected =  () => {
                        if (selectedResultsIndex === i) {
                            return true
                        }
                        else {
                            return false
                        }
                    }
                    // ENTER key functionality. using the REF variable from the parent.
                    { 
                        let currentName = itemNames.indexOf(combinedResults[selectedResultsIndex]) // using current index of keyboard, get name of product
                        let enterId = ids[currentName] //get ID using CONTEXT IDS array
                        thisId.current = enterId // change REF AS YOU USE KEYBOARD
                    }
                    
                    return (
                        <>
                        <Result
                            onClick={event => handleSelect(event, id)}
                            onMouseEnter={() => setSelectedResultsIndex(i)}
                            style={{
                                background: isSelected() ? 'var(--border-color)' : 'transparent',
                            }}
                            >
                                <Before>{before(result, searchInputs[0])}</Before>
                                <Match>{match(result, searchInputs[0])}</Match>
                                <After>{after(result, searchInputs[0])}</After>
                        </Result>
                        </>
                    )
                })
            }
            <SeeAll onClick={handleAllResults}>See All Results</SeeAll>
        </ResultsList>
        }
        </Wrapper>
    )      
}

const SeeAll = styled.button`
    font-size: 14px;
    height: 30px;
    margin: 5px;
`
const Wrapper = styled.div`
    z-index: 444;
    position: absolute;
    background: white;
`
const Result = styled.li`
    height: 34px;
    width: 100%;
    border: 1px solid var(--border-color);
    padding: 0px 8px;
    &:hover {
        cursor: default;
    }
`
const Match = styled.span`
    font-weight: bold;
`
const Before = styled.span`
`
const After = styled.span`
`

const ResultsList = styled.ul`
    border: 1px solid var(--border-color);
    border-radius: 12px;
    font-size: 14px;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
`
export default SearchResults;