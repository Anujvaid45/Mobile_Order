import {useState} from 'react'
import { toast } from 'react-toastify';
import axios from 'axios'
import { useNavigate,useLocation} from 'react-router-dom';
import { useAuth } from '../../context/Auth';
import '../../styles/authStyles.css'
import Layout from '../../components/Layout/Layout';
import { NavLink } from 'react-router-dom';

const Login = () => {
    const[email,setEmail] = useState("")
    const[password,setPassword] = useState("")
    const [auth,setAuth] = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            const res = await axios.post('https://mobile-backend-taxn.onrender.com/api/v1/auth/login',
            {email,password}
            );
            if(res && res.data.success){
                console.log("found")
                toast.success(res.data.message)
                setAuth({
                    ...auth,
                    user:res.data.user,
                    token:res.data.token
                })
                localStorage.setItem('auth',JSON.stringify(res.data))
                setTimeout(()=>{navigate(location.state || '/')},2000)
            }else{
                toast.error(res.data.message)
                
            }
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong')
        }
    }
  return (
    <Layout title='login'>
    {/* <div className="form-container">
        <form onSubmit={handleSubmit}>
        <h4 className="title">LOGIN</h4>

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

            <button type="button" className="btn btn-primary" onClick={()=>{navigate('/forgot-password')}} style={{marginRight:'20px'}}>forgot password</button>
            <button type="submit" className="btn btn-primary">LOGIN</button>
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
          
          <div className="text-center text-lg-start mt-4 pt-2">
            <button type="submit" className="btn btn-primary btn-lg" style={{paddingLeft: '2.5rem', paddingRight: '2.5rem'}}>Login</button>
            <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <NavLink to ="/register">Register</NavLink></p>
          </div>
        </form>
      </div>
    </div>
  </div>

</section>

</Layout>

  )
}

export default Login