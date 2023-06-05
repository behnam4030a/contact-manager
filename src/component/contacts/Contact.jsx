import { Link } from "react-router-dom"

const Contact = ({contact,deleteConfirm}) =>{
    return(
                <div className="col-md-6 mb-4" >
                    <div className="d-flex justify-content-around align-items-center">
                        <div className="col-md-3">
                            <img className="img-fluid rounded" src={contact.photo} alt="img" />
                        </div>
                        <div className="col-md-8">
                            <ul className="list-group p-0 px-3" >
                                <li className="list-group-item" >
                                    <span>نام و نام خانوادگی : </span>
                                    <span className="fw-bold">{contact.fullname}</span>
                                </li>
                                <li className="list-group-item" >
                                    <span>شماره تماس : </span>
                                    <span className="fw-bold">{contact.mobile}</span>
                                </li>
                                <li className="list-group-item" >
                                    <span>ایمیل : </span>
                                    <span className="fw-bold">{contact.email}</span>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-1">
                            <Link to={`/contacts/${contact.id}`} className="btn my-1 w-100" style={{backgroundColor:"blue"}}>
                                <i className="fa fa-eye" ></i>
                            </Link>
                            <Link to={`/contacts/edit/${contact.id}`} className="btn my-1 w-100" style={{backgroundColor:"orange"}}>
                                <i className="fa fa-pencil" ></i>
                            </Link>
                            <button onClick={deleteConfirm} className="btn my-1 w-100" style={{backgroundColor:"red"}}>
                                <i className="fa fa-trash" ></i>
                            </button>
                        </div>
                    </div>
                </div>
    )
}
export default Contact