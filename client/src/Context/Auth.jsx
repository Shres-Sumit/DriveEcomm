import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const authContext = createContext()
const SearchContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null,
        token: ""
    })


    axios.defaults.headers.common["Authorization"] = auth?.token

    useEffect(() => {
        const data = localStorage.getItem('auth')
        if (data) {
            const parseData = JSON.parse(data)
            // console.log(parseData);

            setAuth({
                user: parseData.user,
                token: parseData.token
            })
        }
    }, [])

    return (
        <authContext.Provider value={[auth, setAuth]}>
            {children}
        </authContext.Provider>
    )
}

const SearchProvider = ({ children }) => {
    const [search, setSearch] = useState("");


    return (
        <SearchContext.Provider value={[search, setSearch]}>
            {children}
        </SearchContext.Provider>
    );
};

const useAuth = () => useContext(authContext)

const useSearch = () => useContext(SearchContext)



export { useAuth, AuthProvider, SearchProvider, useSearch }