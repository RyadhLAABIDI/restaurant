import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
import equals from 'validator/lib/equals';
import { showErrorMsg, showSuccessMsg } from '../helpers/message';
import { showLoading } from '../helpers/loading';
import { isAuthenticated } from '../helpers/auth';
import { signup } from '../api/auth';


const Signup = () => {
    let history = useHistory();

    useEffect (() => {
    
        if (isAuthenticated() && isAuthenticated().role === 1) {
           
               history.push('/admin/dashboard');

         } else if (isAuthenticated() && isAuthenticated().role === 0) {
            
                history.push('/user/dashboard');
                        }
    }, [history]); 

     const[formData, setFormData] = useState({
        username:'ryadh',
        email:'riadh.labidi@esprit.tn',
        password:'abc123',
        password2:'abc123',
        successMsg: false,
        errorMsg: false,
        loading: false,
     });
     
     const {username, email, password, password2, successMsg, errorMsg, loading} = formData;

      const handleChange = (evt) => {
        //console.log(evt);
        setFormData({
            ...formData,
            [evt.target.name]: evt.target.value,
            successMsg: '',
            errorMsg: '',
        });
      };

      const handleSubmit = (evt) => {
        evt.preventDefault();
        
        if (isEmpty(username)  || isEmpty(password) || isEmpty(password2)) {
            setFormData({
                ...formData, errorMsg: 'All field are required'
            })
        } else if (!isEmail(email)) {
            setFormData({
                ...formData, errorMsg: 'Invalid email'
            })
        }else if (!equals(password, password2)) {
            setFormData({
                ...formData, errorMsg: 'Password do not match'
            })
        } else {
            //success
            const { username, email, password } = formData;
            const data = { username, email, password }

            setFormData({...formData, loading: true});
            signup(data)
               .then((response) => {
                console.log('Axios signup success: ',response);
                setFormData({
                    username:'',
                    email:'',
                    password:'',
                    password2:'',
                    loading: false,
                    successMsg: response.data.successMessage,
                });


               })
               .catch((err) => {
                console.log('Axios signup error: ', err);
                setFormData({...formData, loading: false,
                errorMsg: err.response.data.errorMessage,
             });
               });
        }
      };

     /***************VIEWS***************** */
const showSignupForm = () => (
    
   <form className='signup-form' onSubmit={handleSubmit} noValidate>
<div className='input-group mb-auto mt-auto'>
  <div className='input-group-prepend'>
    <span className='input-group-text' id="basic-addon1">@</span>
  </div>
  <input name='username'
            type="text" 
            value={username}
            className="form-control" 
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
            onChange={handleChange}
            />
</div>

<div className="form-group mb-3">
    <label for="exampleInputEmail1"></label>
    <input name='email' 
    value={email} 
    type="email"
     className="form-control" 
     id="exampleInputEmail1"
      aria-describedby="emailHelp"
       placeholder="Enter email"
       onChange={handleChange}
       />
    <small id="emailHelp" class="form-text text-muted"></small>
  </div>   
       
       
       {/* password */}
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
       {/* password2 */}
       <div className='form-group input-group'>
        <div className='input-groupe-prepend'>
            <span className='input-groupe-text'>
                <i className='fa fa-lock'></i>
            </span>
        </div>
        <input
        name='password2'
        value={password2}
        className='form-control'
        placeholder='Confirm password'
        type='password'
        onChange={handleChange}
        />
       </div>
       {/* signup utton */}
       <div className='form-groupe text-center mt-4'>
        <button type='submit' className='btn btn-primary btn-block'>Signup</button>
       </div>
       {/* alerady have account */}
       <p className='text-center text-white'>Have an account? 
       <Link to='/Signin'>Log In</Link>
       </p>
   </form>
   

);

/**********************RENDER************* */
return (
<div className='Signup-container'>
    <div className='row px-3 vh-100'>
    <div className='col-md-5 mx-auto align-self-center'>
    {successMsg && showSuccessMsg(successMsg)}
    {errorMsg && showErrorMsg(errorMsg)}
    {loading && <div className='text-center pb-4'>{showLoading()}</div>}
        {showSignupForm()}
    
    {/*<p style={{ color: 'white' }}>{JSON.stringify(formData)}</p>*/}
    </div>
    </div>
    </div>
);
};


export default Signup;