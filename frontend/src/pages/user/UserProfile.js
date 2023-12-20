import React, { useState } from 'react'
import UserMenu from '../../components/Layout/UserMenu'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import { useAuth } from '../../context/Auth'
import { toast } from 'react-toastify';
import { useEffect } from 'react'
const UserProfile = () => {

      //context
  const [auth, setAuth] = useAuth();

    const[name,setName] = useState("")
    const[email,setEmail] = useState("")
    const[password,setPassword] = useState("")
    const[phone,setPhone] = useState("")
    const[address,setAddress] = useState("")

    useEffect(() => {
        const { email, name, phone, address } = auth?.user;
        setName(name);
        setPhone(phone);
        setEmail(email);
        setAddress(address);
      }, [auth?.user]);

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            const { data } = await axios.put("https://e-commerce-backend-pl30.onrender.com/api/v1/auth/profile", {
                name,
                email,
                password,
                phone,
                address,
              });
              if (data?.error) {
                toast.error(data?.error);
              } else {
                setAuth({ ...auth, user: data?.updatedUser });
                let ls = localStorage.getItem("auth");
                ls = JSON.parse(ls);
                ls.user = data.updatedUser;
                localStorage.setItem("auth", JSON.stringify(ls));
                toast.success("Profile Updated Successfully");
              }
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong')
        }
    }

  return (
    <Layout title={'User-Profile'}>
        <div className="container-fluid m-3 p-3">
            <div className="row">
                <div className="col-md-3">
                    <UserMenu/>
                </div>
                <div className="col-md-8">
                <div className="form-container">
                <form onSubmit={handleSubmit}>
                <h4 className="title">USER PROFILE</h4>
               
                <div className="mb-3">
                        <input type="text" 
                        placeholder='Enter Your Name'
                        className="form-control"
                        onChange={(e)=>setName(e.target.value)}
                        value = {name}
                        />
                    </div>
                    <div className="mb-3">
                        <input type="email"
                         className="form-control" 
                         onChange={(e)=>setEmail(e.target.value)}
                         placeholder='Enter Your Email'
                         value = {email}
                         disabled
                         />
                    </div>
                    <div className="mb-3">
                        <input type="password"
                         className="form-control"
                         placeholder='Enter Your Password'
                         onChange={(e)=>setPassword(e.target.value)}
                         value = {password}
                         />
                    </div>
                    <div className="mb-3">
                        <input type="text"
                         className="form-control" 
                         placeholder='Enter Your Phone No.'
                         onChange={(e)=>setPhone(e.target.value)}
                         value = {phone}
                          />
                    </div>
                    <div className="mb-3">
                        <input type="text"
                         className="form-control"
                         placeholder='Enter Your Address'
                         onChange={(e)=>setAddress(e.target.value)}
                         value = {address}
                         />
                    </div>
                    
                    <button type="submit" className="btn btn-primary">UPDATE</button>
                </form>
            </div>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default UserProfile