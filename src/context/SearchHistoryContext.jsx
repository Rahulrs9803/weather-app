import { createContext, useState } from "react";

export const SearchHistoryContext = createContext();

export const SearchHistoryProvider = ({ children }) => {
    const [ history, setHistory ] = useState([]);

    const addSearchHistory = (city) => {
        setHistory((prevHistory) => {
            const updatedHistory = [city, ...prevHistory.filter(item => item !== city)];
            return updatedHistory.slice(0,10);
        });
    };

    return (
        <SearchHistoryContext.Provider value={{ history, addSearchHistory }}>
            {children}
        </SearchHistoryContext.Provider>
    )
}