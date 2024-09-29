import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { isAuthenticated, logout } from '../helpers/auth';


const Header = ({ history }) => {
    const handleLogout = (evt) => {
         logout(() => {
             history.push('/signin');
         });

    };
const showNavigation = () => (
            <nav className='navbar navbar-expand-lg bg-light'>
            <div className='container-fluid'>
                <Link to='/' className='navbar-brand'>Logo</Link>
                <button className='navbar-toggler' type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id="navbarTogglerDemo02">
                <ul className='navbar-nav ml-auto mt-2 mt-lg-0'>
                    {!isAuthenticated() && (
                    <Fragment>
                <li className='nav-item'>
                    <Link to='/' className='nav-link' aria-current="page"> 
                    <i className="fas fa-home"></i> Home
                    </Link>
                    </li>
                    <li className='nav-item'>
                    <Link to='/Signup' className='nav-link' aria-current="page"> 
                    <i className='fas fa-edit'></i> Signup</Link>
                    </li>
                    <li className='nav-item'>
                    <Link to='/Signin' className='nav-link'>
                        <i className='fas fa-sign-in-alt'></i> Signin</Link> 
                         
                    </li>
                    </Fragment>
                    )}


                    {isAuthenticated() && isAuthenticated().role === 0 && (
                    <Fragment>
                <li className='nav-item'>
                    <Link to='/user/dashboard' className='nav-link'>
                        <i className='fas fa-home'></i> Dashboard</Link>
                    </li>
                    
                    </Fragment>
                    )}

                    {isAuthenticated() && isAuthenticated().role === 1 && (
                    <Fragment>
                <li className='nav-item'>
                    <Link to='/admin/dashboard' className='nav-link'>
                    <i className='fas fa-home'></i> Dashboard</Link>
                    </li>
                    
                    </Fragment>
                    )}
                    {isAuthenticated() && (
                    <Fragment>
                <li className='nav-item'>
                    <button  className='btn btn-link text-decoration-none pl-0' onClick={handleLogout}>
                    <i className='fas fa-sign-out-alt'></i>{' '} Logout</button>
                    </li>
                    
                    </Fragment>
                    )}
                    
                </ul>
                
                </div>
               </div>
            </nav>
);

return (
<header id='header'>{showNavigation()}</header>
)

};

export default withRouter(Header);