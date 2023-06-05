import axios from "axios";
import { useEffect, useState } from "react";
import { useParams,Link } from "react-router-dom";
import Spiner from "../Spiner";

const ViewContact = () =>{

    const{contactId} = useParams();
    const [contact,setContact] = useState([]);
    const [group,setGroup] = useState([]);
    const [loading,setLoading]=useState(false);

    useEffect(() =>{
        const fetchData = async () => {
            try{
                setLoading(true);
                const {data:contactData} = await axios.get(`http://localhost:9000/contacts/${contactId}`);
                const {data:groupData} = await axios.get(`http://localhost:9000/groups/${contactId}`);

                setLoading(false);
                setContact(contactData);
                setGroup(groupData);

            }
            catch(err){
                setLoading(false);
                console.log(err.massage);
            }

        }
        fetchData();
    },[])


    return(
        <>
            {
                loading ? <Spiner/> 
                : (
                    <section>
                        <div className="container p-2" style={{ borderRadius: "1em", backgroundColor:"ddd" }}>
                        <div className="row align-items-center">
                            <div className="col-md-3">
                            <img
                                src={contact.photo}
                                alt=""
                                className="img-fluid rounded"
                                style={{ border: `1px solid #ddd` }}
                            />
                            </div>
                            <div className="col-md-9">
                            <ul className="list-group">
                                <li className="list-group-item list-group-item-dark">
                                نام و نام خانوادگی :{" "}
                                <span className="fw-bold">{contact.fullname}</span>
                                </li>
                                <li className="list-group-item list-group-item-dark">
                                شماره موبایل :{" "}
                                <span className="fw-bold">{contact.mobile}</span>
                                </li>
                                <li className="list-group-item list-group-item-dark">
                                ایمیل : <span className="fw-bold">{contact.email}</span>
                                </li>
                                <li className="list-group-item list-group-item-dark">
                                شغل : <span className="fw-bold">{contact.job}</span>
                                </li>
                                <li className="list-group-item list-group-item-dark">
                                گروه : <span className="fw-bold">{group.name}</span>
                                </li>
                            </ul>
                            </div>
                        </div>
                        <div className="row my-2">
                            <div className="d-grid gap-2 col-6 mx-auto">
                            <Link
                                to={"/contacts"}
                                className="btn"
                                style={{ backgroundColor: "#ddd" }}
                            >
                                برگشت به صفحه اصلی
                            </Link>
                            </div>
                        </div>
                        </div>
                    </section>
                )
            }
        </>
    )
}
export default ViewContact