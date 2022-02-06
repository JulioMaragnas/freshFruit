import React, { useState, useEffect } from "react";
import { getTemporalToken } from '../requestUser';

const CartContext = React.createContext([{}, ()=> ({})]);

const CartProvider = (props)=>{
    useEffect( ()=>{
        async function init(){
          const userlogged = JSON.parse(sessionStorage.getItem('userlogged'));
          if (!userlogged) {
            const res = await getTemporalToken();
          }
        }
        init()
      },[])
    const [cart, setCart] = useState({ products: [], total:0, logged: false, role: 'ADMIN' });
    return <CartContext.Provider value={[cart, setCart]} >
        {props.children}
    </CartContext.Provider>
}

export {
    CartContext,
    CartProvider
}