import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart'));
        if (storedCart) {
            setCart(storedCart);
        }
    }, []);

    const addItemToCart = (book) => {
        const existingItem = cart.find(item => item._id === book._id);

        let updatedCart;
        if (existingItem) {
            updatedCart = cart.map(item =>
                item._id === book._id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
        } else {
            updatedCart = [...cart, { ...book, quantity: 1 }];
        }

        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const handleRemoveItem = (item) => {
        let updatedCart;
        if (item.quantity > 1) {
            updatedCart = cart.map(cartItem =>
                cartItem._id === item._id
                    ? { ...cartItem, quantity: cartItem.quantity - 1 }
                    : cartItem
            );
        } else {
            updatedCart = cart.filter(cartItem => cartItem._id !== item._id);
        }
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    return (
        <CartContext.Provider value={{ cart, setCart, addItemToCart, handleRemoveItem }}>
            {children}
        </CartContext.Provider>
    );
};
