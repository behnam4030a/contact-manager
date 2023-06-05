import { Navbar,Contacts, AddContact, EditContact, ViewContact } from "./component";
import { useState, useEffect} from "react";
import { Routes ,Route,Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import { contactContext } from "./context/contactContext";
import _ from "lodash";
import { ToastContainer,toast } from "react-toastify";

function App() {

  const [getContacts,setContacts] = useState([]);
  const [loading,setLoading] = useState(false);
  const [getGroups,setGroups] = useState([]);
  const [getContact,setContact] = useState({fullname:"",photo: "",mobile: "",email: "",job: "",group: ""});
  const [quary,setQuary] = useState ({text:""});
  const [filterContact,setFilterContact]=useState([])

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () =>{
        try{
            setLoading(true);
            const {data : contactsData} = await axios.get('http://localhost:9000/contacts');
            const {data : groupsData} = await axios.get('http://localhost:9000/groups');

            setContacts(contactsData);
            setGroups(groupsData);
            setFilterContact(contactsData);
            setLoading(false);
        }
        catch(err){
            setLoading(false);
            console.log(err.message);
        }
    }
    fetchData();
  },[])



  const setContactInfo = (event) =>{
    setContact({...getContact,[event.target.name]:event.target.value})
  }
  
  const createContactForm = async (values) =>{
    try{
        const {status,data} = await axios.post("http://localhost:9000/contacts",values);
        if(status === 201){
          toast.success("مخاطب جدید ایجاد شد")
          const allContacts = [...getContacts,data];
          setContacts(allContacts);
          setFilterContact(allContacts);
            setContact({});
            navigate("/contacts");
        }
        
    }
    catch(err){
        console.log(err.message);
    }
  }

  const removeContact = async (contactId) =>{
    try{
        setLoading(true);
        const response = await axios.delete(`http://localhost:9000/contacts/${contactId}`);
        if(response){
            const {data : contactsData} = await axios.get('http://localhost:9000/contacts');
            toast.error("مخاطب با موفقیت حذف شد");
            setContacts(contactsData);
            setLoading(false);
            setFilterContact(contactsData);
        }    
    }catch(err){
        console.log(err.message);
        setLoading(false);
    }
  }

  const confirm = (contactId,contactFullname) =>{
    confirmAlert({
        customUI : ({onClose}) =>{
            return(
                <div
            dir="rtl"
            style={{
              backgroundColor: "#ddd",
              border: `1px solid #000`,
              borderRadius: "1em",
            }}
            className="p-4"
          >
            <h1 style={{ color: "red" }}>پاک کردن مخاطب</h1>
            <p style={{ color: "yellow" }}>
              مطمئنی که میخوای مخاطب {contactFullname} رو پاک کنی ؟
            </p>
            <button
              onClick={() => {
                removeContact(contactId);
                onClose();
              }}
              className="btn mx-2"
              style={{ backgroundColor: "green" }}
            >
              مطمئن هستم
            </button>
            <button
              onClick={onClose}
              className="btn"
              style={{ backgroundColor: "red" }}
            >
              انصراف
            </button>
          </div>
            )
        }
    })
  }

  const contactSearch = (event) => {
    setQuary({...quary,text : event.target.value});
    const allContact = getContacts.filter((contact) =>{
      return(
        contact.fullname.toLowerCase().includes(event.target.value.toLowerCase())
      )
    })
    setFilterContact(allContact)
  }

  return (
    <contactContext.Provider value={{
      loading,
      setLoading,
      getContact,
      quary,
      contactSearch,
      setFilterContact,
      filterContact,
      confirm,
      setContacts,
      getGroups,
      createContactForm,
      setContactInfo,
    }}>
      <div classNameName="App">
          <ToastContainer rtl={true} />
          <Navbar />
          <Routes>
              <Route path="/" element={<Navigate to="/contacts" />} />
              <Route path="/contacts" element={<Contacts deleteConfirm={confirm} />} />
              <Route path="/contacts/add" element={<AddContact/>} />
              <Route path="/contacts/:contactId" element={<ViewContact/>} />
              <Route path="/contacts/edit/:contactId" element={<EditContact />} />
          </Routes>
      </div>
    </contactContext.Provider>


  );
}

export default App;
