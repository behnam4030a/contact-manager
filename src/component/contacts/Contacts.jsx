import { useContext } from 'react';
import { contactContext } from '../../context/contactContext';
import { Link } from 'react-router-dom'
import {Spiner , Contact} from '../index'

const Contacts = ({}) =>{
    const {filterContact,loading,confirm} = useContext(contactContext)
    return(
        <>
            <section className="container" >
                <div className="row my-3" >
                    <div className="col d-flex justify-content-center" >
                        <Link to="./add" className="btn btn-primary" >
                            <span>ساخت  مخاطب جدید</span>
                            <i className="fa fa-plus-circle" ></i>
                        </Link>
                    </div>
                </div>

                <div className='row' >
                    {
                        loading ? <Spiner/>
                        :(
                            filterContact.length > 0 ? filterContact.map(c => (
                                <Contact deleteConfirm={() =>confirm(c.id , c.fullname)} key={c.id} contact={c}/>
                            )) : (
                                <div >
                                    <p>مخاطب پیدا نشد</p>
                                    <div className="d-flex justify-content-center">
                                        <div className="w-25">
                                            <img className="img-fluid" src={require("../../assets/no-found.gif")} alt="img" />
                                        </div>
                                    </div>
                                </div>
                            )
                        )
                    }
                </div>
            </section>
            
        </>
    )
}

export default Contacts