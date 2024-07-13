import { useContext, createContext } from "react";

// Step 1: Create
export const Context = createContext() ; 

// Step 2: Provide
export const ContextProvider = (props) => {
    return (
        <Context.Provider value={{}}>
            {props.children}
        </Context.Provider>
    )
}

// Step 3: Use globally
export const useTheContext = () => {
    return useContext(ContextProvider) ;
}