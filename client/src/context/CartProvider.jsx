import { createContext, useState, useEffect } from "react";
import { useToast } from '@chakra-ui/react'

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const toast = useToast()
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
        toast({
            title: 'Book Added',
            description: "Your Book has been Added Successfully",
            status: 'success',
            duration: 2000,
            isClosable: false,
          })
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
        toast({
            title: 'Book Deleted',
            description: "Your Book has been Deleted Successfully",
            status: 'warning',
            duration: 2000,
            isClosable: false,
          })
    };

    const calculateTotalPrice = () => {
        return cart.reduce((total, item) => {
            return total + item.price * item.quantity;
        }, 0);
    };

    return (
        <CartContext.Provider value={{ cart, setCart, addItemToCart, handleRemoveItem, calculateTotalPrice }}>
            {children}
        </CartContext.Provider>
    );
};
