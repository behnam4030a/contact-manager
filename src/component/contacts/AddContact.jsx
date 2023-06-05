import { Link} from "react-router-dom";
import { contactContext } from "../../context/contactContext";
import { useContext } from "react";
import { Formik,Form,Field,ErrorMessage } from "formik";
import { contactSchema } from "../../validation/contactValidation";

const AddContact = ({}) =>{
    const {createContactForm,getGroups} = useContext(contactContext);
    return(
        <section className="container" >
            <div className='row my-4' >
                <h5 className="fw-bold">اضافه کردن مخاطب جدید</h5>
            </div>
            <div className="row" >
                <div className="col-md-4" >
                    <Formik initialValues={{
                        fullname :"",
                        photo:"",
                        mobile:"",
                        email:"",
                        job:"",
                        group:""
                    }} 
                    validationSchema={contactSchema}
                    onSubmit={(values) =>{
                        createContactForm(values)
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
export default AddContact