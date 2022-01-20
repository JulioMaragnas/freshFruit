import React, { useState, useContext } from "react";

const CartContext = React.createContext([{}, ()=> ({})]);

const CartProvider = (props)=>{
    const [cart, setCart] = useState({ products: [], total:0 });
    return <CartContext.Provider value={[cart, setCart]} >
        {props.children}
    </CartContext.Provider>
}

export {
    CartContext,
    CartProvider
}