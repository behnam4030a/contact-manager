import { createContext } from "react";

export const contactContext = createContext({
    getContacts : [],
    setContacts : () => {},
    loading : false,
    setLoading : () => {},
    getGroups : [],
    setGroups : () => {},
    getContact : {},
    setContact : () => {},
    quary : {},
    setQuary : () => {} ,
    filterContact : [],
    setFilterContact : () => {},
    setContactInfo : () => {},
    createContactForm : () => {},
    removeContact : () => {},
    confirm : () => {},
    contactSearch : () => {}
})