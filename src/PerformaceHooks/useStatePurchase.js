import React, { useState, useContext } from "react";

const StatePurchaseContext = React.createContext([2, ()=> (null)]);

const StatePurchaseProvider = (props)=>{
    const [purchaseStateId, setPurchaseStateId] = useState(2);
    return <StatePurchaseContext.Provider value={[purchaseStateId, setPurchaseStateId]} >
        {props.children}
    </StatePurchaseContext.Provider>
}

export {
    StatePurchaseContext,
    StatePurchaseProvider
}