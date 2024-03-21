import { createContext, useContext, useState } from "react";

const initialValues = {
    activeKeyTab : 1
}

export const Context = createContext(initialValues)

export const DefaultContext = ({children}) => {
    const [activeKeyTab, setActiveKeyTab] = useState(initialValues.activeKeyTab)
    const [campignName, setCampignName] = useState('')
    const [adSetName, setAdSetName] = useState('')
    const [search, setSearch] = useState('')

    const value = {
        activeKeyTab,
        setActiveKeyTab,
        campignName,
        setCampignName,
        adSetName,
        setAdSetName,
        search,
        setSearch
    }

    return <Context.Provider value={value}>{children}</Context.Provider>
}