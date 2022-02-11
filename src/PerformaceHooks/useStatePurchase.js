import React, { useState, useContext } from "react";

const StatePurchaseContext = React.createContext([14, ()=> (null)]);

const StatePurchaseProvider = (props)=>{
    const [purchaseStateId, setPurchaseStateId] = useState(14);
    return <StatePurchaseContext.Provider value={[purchaseStateId, setPurchaseStateId]} >
        {props.children}
    </StatePurchaseContext.Provider>
}

export {
    StatePurchaseContext,
    StatePurchaseProvider
}