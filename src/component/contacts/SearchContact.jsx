import { useContext } from "react";
import { contactContext } from "../../context/contactContext";


const SearchContact = () =>{

const {quary,contactSearch} = useContext(contactContext);
    return(
        <form class="d-flex" role="search">
            <input class="form-control me-2" value={quary.text} onChange={contactSearch} type="search" placeholder="Search" aria-label="Search"/>
            <button class="btn btn-outline-success " type="submit">جستجو</button>
        </form>
    )
}
export default SearchContact