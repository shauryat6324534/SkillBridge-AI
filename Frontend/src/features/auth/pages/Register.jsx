import React from 'react'
import "../auth.form.scss"


import {Link,useNavigate} from "react-router"
const Register = () => {


    const navigate = useNavigate()
    const handleSubmit=(e)=>{
        e.preventDefault();
        
    }
  return (
    <main >
        <div className="form-container">
            <h1>Register</h1>
            <form action="" onSubmit={handleSubmit}>
                  <div className="input-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="userna  me" id="username" placeholder="Enter your username" required />
                    
                </div>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" placeholder="Enter your email" required />
                    
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" placeholder="Enter your password" required />
                </div>
                <button className='button primary-button' type="submit">Register</button>    
            </form>

            
            <p>Already have an account?<Link to={"/login"}>Login</Link></p>



        </div>
    </main>

  )
}

export default Register