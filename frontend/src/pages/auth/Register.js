import React ,{useState} from 'react'
import { toast } from 'react-toastify';
import axios from 'axios'
import { useNavigate} from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import { NavLink } from 'react-router-dom';
import '../../styles/authStyles.css';

const Register = () => {

    const[name,setName] = useState("")
    const[email,setEmail] = useState("")
    const[password,setPassword] = useState("")
    const[phone,setPhone] = useState("")
    const[address,setAddress] = useState("")
    const[role,setRole] = useState("")
    const navigate = useNavigate()


    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/v1/auth/register',
            {name,email,password,phone,address,role}
            );
            if(res.data.success){
                toast.success(res.data.message)
                setTimeout(()=>{navigate('/login')},2000)
            }else{
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong')
        }

        

    }

    const handleChange = event => {
        //console.log(event.target.value);
        setRole(event.target.value);
      };

    return (
        <Layout title={'register'}>
            {/* <div className="form-container">
                <form onSubmit={handleSubmit}>
                <h4 className="title">REGISTER FORM</h4>
                <div className="mb-3">
                        <input
                        
                        type="radio"
                        id="0"
                        className='radio'
                        name="0"
                        value="0"
                        checked={role === '0'}
                        onChange={handleChange} 
                        />
                        <label htmlFor="0" style={{paddingRight:'150px'}} className='label'>User</label>

                        <input
                        type="radio"
                        className='radio'
                        id="1"
                        name="1"
                        value="1"
                        onChange={handleChange} 
                        checked={role === '1'}
                        />
                        <label htmlFor="1" className='label'>Admin</label>
                    </div>
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
                    <div>
                        <input type="text"
                         className="form-control"
                         placeholder='Enter Your Address'
                         onChange={(e)=>setAddress(e.target.value)}
                         value = {address}
                         />
                    </div>
                    <button type="submit" className="btn btn-primary">REGISTER</button>
                </form>
            </div> */}

            
<section className="vh-100">
  <div className="container-fluid h-custom">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-md-9 col-lg-6 col-xl-5">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="Sample image" />
      </div>
      <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
                        <input
                        
                        type="radio"
                        id="0"
                        className='radio'
                        name="0"
                        value="0"
                        checked={role === '0'}
                        onChange={handleChange} 
                        />
                        <label htmlFor="0" style={{paddingRight:'150px'}} className='label'>User</label>

                        <input
                        type="radio"
                        className='radio'
                        id="1"
                        name="1"
                        value="1"
                        onChange={handleChange} 
                        checked={role === '1'}
                        />
                        <label htmlFor="1" className='label'>Admin</label>
                    </div>

            <div className="form-outline mb-4">
            <input type="text" id="form3Example3" className="form-control form-control-lg" onChange={(e)=>setName(e.target.value)}
                        value = {name} placeholder="Enter your Name" />
            <label className="form-label" htmlFor="form3Example3">Name</label>
          </div>

          {/* Email input */}
          <div className="form-outline mb-4">
            <input type="email" id="form3Example3" className="form-control form-control-lg"  onChange={(e)=>setEmail(e.target.value)}
                 value = {email} placeholder="Enter a valid email address" />
            <label className="form-label" htmlFor="form3Example3">Email address</label>
          </div>
          {/* Password input */}
          <div className="form-outline mb-3">
            <input type="password" id="form3Example4" className="form-control form-control-lg" placeholder="Enter password" onChange={(e)=>setPassword(e.target.value)}
                 value = {password} />
            <label className="form-label" htmlFor="form3Example4">Password</label>
          </div>
          <div className="form-outline mb-3">
            <input type="text" id="form3Example4" className="form-control form-control-lg" placeholder="Enter Phone Number" onChange={(e)=>setPhone(e.target.value)}
                         value = {phone} />
            <label className="form-label" htmlFor="form3Example4">Phone Number</label>
          </div>
          <div className="form-outline mb-3">
            <input type="text" id="form3Example4" className="form-control form-control-lg" placeholder="Enter Address" onChange={(e)=>setAddress(e.target.value)}
                         value = {address} />
            <label className="form-label" htmlFor="form3Example4">Address</label>
          </div>
          <div className="text-center text-lg-start mt-4 pt-2">
            <button type="submit" className="btn btn-primary btn-lg" style={{paddingLeft: '2.5rem', paddingRight: '2.5rem'}}>Sign Up</button>
            <p className="small fw-bold mt-2 pt-1 mb-0">Already have an account? <NavLink to ="/login">Login</NavLink></p>
          </div>
        </form>
      </div>
    </div>
  </div>

</section>
        </Layout>

    )
}

export default Register