import {SearchContact} from './index'
import { useLocation } from 'react-router-dom';

const Navbar = () =>{
    const location = useLocation();
    return(
        
        <header classNameName="App-header">
            <nav className="navbar navbar-expand-lg navbar-dark shadow-lg bg-black">
                <div className="container-fluid ">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse d-flex justify-content-around" id="navbarSupportedContent">
                        <span className="navbar-item text-white" href="#">وب اپلیکیشن مدیریت مخاطبین</span>
                        {
                            location.pathname === "/contacts" ? (
                                <SearchContact />

                            ) : null
                        }
                    </div>
                </div>
            </nav>
        </header>

    )
}
export default Navbar