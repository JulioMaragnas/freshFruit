import React, { useState, useContext } from "react";

const StatePurchaseContext = React.createContext([1, ()=> (null)]);

const StatePurchaseProvider = (props)=>{
    const [purchaseStateId, setPurchaseStateId] = useState(1);
    return <StatePurchaseContext.Provider value={[purchaseStateId, setPurchaseStateId]} >
        {props.children}
    </StatePurchaseContext.Provider>
}

export {
    StatePurchaseContext,
    StatePurchaseProvider
}