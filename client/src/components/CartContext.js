import { createContext, useReducer, useState, useContext } from "react";
import { useEffect } from "react";
import { ProductContext } from "./ProductContext";
import { addToCart, deleteFromCart, clearTheCart } from "./Functions/Fetches";

export const CartContext = createContext();
//declare initial state for the reducer and cart context: boolean to know if the cart is empty
// and an array to contain the cart items
const initialState = {
  isCartEmpty: true,
  cartItems: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    //case to add items to the cart --
    case "add-item-to-cart": {
      return {
        ...state,
        isCartEmpty: false,
        cartItems: [...state.cartItems, action.data],
      };
    }
    //case to remove item from the cart
    case "remove-item-from-cart": {
      //defines the arr of the cart for this func
      const cartArr = state.cartItems;
      // defines the index of the first item found in this arr
      const index = cartArr.indexOf(action.data);
      return {
        ...state,
        cartItems: [...cartArr.slice(0, index), ...cartArr.slice(index + 1)],
      };
    }
    //deletes all the items in the cart, making it empty
    case "delete-cart": {
      return {
        ...state,
        isCartEmpty: true,
        cartItems: [],
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState();
  const [Total, setTotal] = useState();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { allProducts } = useContext(ProductContext);
  //this state is use to avoid the cart not being rerendered
  const [rerender, setRerender] = useState(false);

  /// fetches cart from db
  useEffect(() => {
    fetch("/api/get-cart")
      .then((res) => res.json())
      .then((data) => {
        setCart(data.data);
      });
    //the renderer state assures that the cart will rerender if the fetch takes too long
  }, [state, rerender]);

  /// returns the total based on cart items
  useEffect(() => {
    if (allProducts && cart) {
      //map through the cart array to go and get their whole obj info
      const filtered = cart.map((item) => {
        //return only the object with the same ID as item
        const obj = allProducts.filter((product) => {
          return product._id === item;
        });
        //give this object to our filtered arr
        return obj[0];
      });

      const priceTag = [];
      filtered.forEach((element) => {
        priceTag.push(element.price);
      });
      const prices = priceTag.map((element) => {
        return Number(element.substring(1));
      });
      let sum = Math.round(prices.reduce((partialSum, a) => partialSum + a, 0));
      setTotal(sum);
    }
  }, [cart, allProducts, state.cartItems]);
  // console.log("total in cart context", Total);
  //ACCEPTS AN ITEMS ID AS data.
  const addItemToCart = (data) => {
    addToCart(data, setRerender, rerender);
    dispatch({
      type: "add-item-to-cart",
      data,
    });
  };
  //ACCEPTS AN ITEM ID AS WELL AS THE ARR INDEX
  //exemple: {id: "1232", index: 2} where ths index is the position in the state.cartItems
  const removeItemFromCart = (data) => {
    deleteFromCart(data, setRerender, rerender);
    dispatch({
      type: "remove-item-from-cart",
      data,
    });
  };
  const deleteCart = (data) => {
    clearTheCart();
    dispatch({
      type: "delete-cart",
      ...data,
    });
  };

  return (
    <CartContext.Provider
      value={{
        Total,
        cart,
        state,
        actions: {
          addItemToCart,
          removeItemFromCart,
          deleteCart,
        },
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
