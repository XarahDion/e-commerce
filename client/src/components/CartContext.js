import { createContext, useReducer, useState, useContext } from "react";
import { useEffect } from "react";
import { ProductContext } from "./ProductContext";
import { addToCart, deleteFromCart, clearTheCart } from "./Functions/Fetches";

export const CartContext = createContext();
const initialState = {
    isCartEmpty: true,
    cartItems: [],
};

const reducer = (state, action) => {
    switch (action.type) {
        case "add-item-to-cart": {
            return {
                ...state,
                isCartEmpty: false,
                cartItems: [...state.cartItems, action.data],
            };
        }
        case "remove-item-from-cart": {
            const cartArr = state.cartItems;
            const index = cartArr.indexOf(action.data);
            return {
                ...state,
                cartItems: [
                    ...cartArr.slice(0, index),
                    ...cartArr.slice(index + 1),
                ],
            };
        }
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
    const [rerender, setRerender] = useState(false);

    useEffect(() => {
        fetch("/api/get-cart")
            .then((res) => res.json())
            .then((data) => {
                setCart(data.data);
            });
    }, [state, rerender]);

    useEffect(() => {
        if (allProducts && cart) {
            const filtered = cart.map((item) => {
                const obj = allProducts.filter((product) => {
                    return product._id === item;
                });
                return obj[0];
            });

            const priceTag = [];
            filtered.forEach((element) => {
                priceTag.push(element.price);
            });
            const prices = priceTag.map((element) => {
                return Number(element.substring(1));
            });
            let sum = Math.round(
                prices.reduce((partialSum, a) => partialSum + a, 0)
            );
            setTotal(sum);
        }
    }, [cart, allProducts, state.cartItems]);

    const addItemToCart = (data) => {
        addToCart(data, setRerender, rerender);
        dispatch({
            type: "add-item-to-cart",
            data,
        });
    };

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
