import axios from "axios";
import { useEffect, useState,useContext} from "react";
import { useParams,Link,useNavigate } from "react-router-dom";
import Spiner from "../Spiner";
import { contactContext } from "../../context/contactContext";
import { Formik,Form,Field,ErrorMessage } from "formik";
import { contactSchema } from "../../validation/contactValidation";

const EditContact = () =>{

    const {setFilterContact,setContacts,filterContact,getGroups,setLoading,loading} = useContext(contactContext)
    const{contactId} = useParams();
    const navigate = useNavigate();

    const [contact,setContact] = useState([]);

    useEffect(() =>{
        const fetchData = async () => {
            try{
                setLoading(true);
                const {data:contactData} = await axios.get(`http://localhost:9000/contacts/${contactId}`);

                setLoading(false);
                setContact(contactData);
            }
            catch(err){
                setLoading(false);
                console.log(err.massage);
            }

        }
        fetchData();
    },[])



      const submitForm = async (values) =>{
        try{
            setLoading(true);
            const{data ,status} = await axios.put(`http://localhost:9000/contacts/${contactId}`,values);
            
            if(status ===200){
                setLoading(false);
                const allcontacts = [...filterContact];
                const contactIndex = allcontacts.findIndex(
                    (c) => c.id == contactId
                );
                allcontacts[contactIndex] = {...data};
                
                setFilterContact(allcontacts);
                setContacts(allcontacts);
                navigate('/contacts');
            }
        }catch(err){
            setLoading(false);
            console.log(err.message);
        }
      }

    return(
        <>
                    {
            loading ? <Spiner/> :
            (
                <section className="container" >
                <div className='row my-4' >
                    <h5 className="fw-bold">اضافه کردن مخاطب جدید</h5>
                </div>
                <div className="row" >
                    <div className="col-md-4" >
                  <Formik initialValues={{
                      fullname: contact.fullname,
                      photo: contact.photo,
                      mobile: contact.mobile,
                      email: contact.email,
                      job: contact.job,
                      group: contact.group,
                    }}
                    validationSchema={contactSchema}
                    onSubmit={(values) => {
                        submitForm(values);
                    }}
                    >
                        <Form>
                            <div className="mb-2" >
                                <Field  name="fullname" type="text" className="form-control" placeholder="نام و نام خانوادگی" />
                                <ErrorMessage name="fullname" render={(msg) => (<div className="text-danger">{msg}</div>) } ></ErrorMessage>
                            </div>
                            <div className="mb-2" >
                                <Field  name="photo" type="text" className="form-control" placeholder="آدرس عکس" />
                                <ErrorMessage name="photo" render={(msg) => (<div className="text-danger">{msg}</div>) } ></ErrorMessage>
                            </div>
                            <div className="mb-2" >
                                <Field  name="mobile" type="text" className="form-control" placeholder="موبایل" />
                                <ErrorMessage name="mobile" render={(msg) => (<div className="text-danger">{msg}</div>) } ></ErrorMessage>
                            </div>
                            <div className="mb-2" >
                                <Field  name="email" type="text" className="form-control" placeholder="ایمیل" />
                                <ErrorMessage name="email" render={(msg) => (<div className="text-danger">{msg}</div>) } ></ErrorMessage>
                            </div>
                            <div className="mb-2" >
                                <Field  name="job" type="text" className="form-control" placeholder="شغل" />
                                <ErrorMessage name="job" render={(msg) => (<div className="text-danger">{msg}</div>) } ></ErrorMessage>
                            </div>
                            <div className="mb-2" >
                                <Field as="select"  className="form-select"  name="group">
                                    <option value="">انتخاب گروه</option>
                                    {
                                        getGroups.length > 0 && getGroups.map((group) =>(
                                            <option key={group.id} value={group.name}>{group.name}</option>
                                        ))
                                    }
                                </Field>
                                <ErrorMessage name="group" render={(msg) => (<div className="text-danger">{msg}</div>) } ></ErrorMessage>
                            </div>
                            <div className="d-flex justify-content-around">
                                <button className="btn btn-success" type="submit" >ثبت</button>
                                <Link className="btn btn-danger" to="/contacts" >انصراف</Link>
                            </div>
                        </Form>
                    </Formik>
                    </div>
                </div>
                </section>
            )
        }
        </>

    )
}
export default EditContact