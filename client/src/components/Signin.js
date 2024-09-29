import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { showErrorMsg } from '../helpers/message';
import { showLoading } from '../helpers/loading';
import { setAuthentication, isAuthenticated } from '../helpers/auth';
import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
import { signin } from '../api/auth';



const Signin = () => {
    let history = useHistory();

    useEffect (() => {
    
        if (isAuthenticated() && isAuthenticated().role === 1) {
           
               history.push('/admin/dashboard');

         } else if (isAuthenticated() && isAuthenticated().role === 0) {
            
                history.push('/user/dashboard');
                        }
    }, [history]); 
    const [formData, setFormData] = useState({
        
        email:'riadh.labidi@esprit.tn',
        password:'abc123',
        errorMsg: false,
        loading: false,
        
     });
     const {
                
                email, 
                password,                                
                errorMsg, 
                loading,
                

            } = formData;



            const handleChange = (evt) => {
                
                setFormData({
                    ...formData,
                    [evt.target.name]: evt.target.value,
                    
                    errorMsg: '',
                });
              };


              const handleSubmit = (evt) => {
                evt.preventDefault();
                
                if  ( isEmpty(email) ||
                     isEmpty(password))
                
                {
                    setFormData({
                        ...formData, errorMsg: 'All field are required',
                    });
                } else if (!isEmail(email)) {
                    setFormData({
                        ...formData, errorMsg: 'Invalid email',
                    });
                } else {
                    //success
                    const { email, password } = formData;
                    const data = { email, password };
        
                    setFormData({...formData, loading: true });
                    signin(data)
                    .then((response) => {
                        setAuthentication(response.data.token, response.data.user);

                        if (isAuthenticated() && isAuthenticated().role === 1) {
                            console.log('Redirecting to admin dashboard');
                            history.push('/admin/dashboard');
                        } else {
                            console.log('Redirecting to user dashboard');                           
                            history.push('/user/dashboard');
                        } 
                    })
                    .catch(err => {
                       console.log('signin api function error: ', err);
                       setFormData({
                        ...formData,
                        loading: false,
                        errorMsg: err.response.data.errorMessage,
                       })
                    });
                    
                       
                }  
              };

            /***************VIEWS***************** */
const showSigninForm = () => (
    
    <form className='signup-form' onSubmit={handleSubmit} noValidate>
 
 
 <div className='form-group mb-3'>
     <label for="exampleInputEmail1"></label>
     <input name='email' 
     value={email} 
     type="email"
      className='form-control' 
      id="exampleInputEmail1"
       aria-describedby="emailHelp"
        placeholder="Enter email"
        onChange={handleChange}
        />
     <small id="emailHelp" class='form-text text-muted'></small>
   </div>   
        
        
         
        <div className='form-group input-group mb-3'>
         <div className='input-group-prepend'>
             <span className='input-group-text'>
                 <i className='fa fa-lock'></i>
             </span>
         </div>
         <input
          name='password'
          value={password}
          className='form-control'
          placeholder='Create password'
          type='password'
          onChange={handleChange}
          />
        </div>
        
        
        
        <div className='form-groupe text-center mt-4'>
         <button type='submit' className='btn btn-primary btn-block'>Signin</button>
        </div>
        
        <p className='text-center text-white'>Don't Have an account? 
        <Link to='/Signup'>Register here</Link>
        </p>
    </form>
    
 
 );
 return (
    <div className='Signin-container'>
        <div className='row px-3 vh-100'>
        <div className='col-md-5 mx-auto align-self-center'>
        
        {errorMsg && showErrorMsg(errorMsg)}
        {loading && <div className='text-center pb-4'>{showLoading()}</div>}
            {showSigninForm()}
        
        
        </div>
        </div>
        </div>
    );

}

export default Signin; 