import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const authContext = createContext()
const SearchContext = createContext();
const CarContext = createContext()

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
    const [searchResults, setSearchResults] = useState([])


    return (
        <SearchContext.Provider value={[searchResults, setSearchResults]}>
            {children}
        </SearchContext.Provider>
    );
};

const CarProviders = ({ children }) => {
    const [carsList, setCarsList] = useState([])
    const getAllCars = async () => {
        try {
            const { data } = await axios.get('/car/getAllcars')
            // console.log(data)
            setCarsList(data.productList)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllCars()
    }, [])

    return (
        <CarContext.Provider value={[carsList, setCarsList]}>
            {children}
        </CarContext.Provider>
    )
}

const useAuth = () => { return useContext(authContext) }

const useSearch = () => useContext(SearchContext)

const useCarsList = () => useContext(CarContext)



export { useAuth, AuthProvider, SearchProvider, useSearch, useCarsList, CarProviders }