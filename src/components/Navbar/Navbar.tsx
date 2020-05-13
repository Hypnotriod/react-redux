import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { Sidenav } from 'materialize-css';
import UserIcon from './UserIcon';
import './Navbar.css';

const Navbar: React.FunctionComponent = () => {
    const slideOut = useRef<HTMLUListElement>(null);

    useEffect(() => {
        Sidenav.init(slideOut.current!, {});
    });

    return (
        <>
            <nav className='blue darken-1'>
                <a href='/' data-target='slide-out' className='sidenav-trigger show-on-med-and-down'>
                    <i className='material-icons'>menu</i></a>
                <div className='nav-wrapper'>
                    <ul id='nav-mobile' className='left hide-on-med-and-down'>
                        <li><NavLink to='/'>Home</NavLink></li>
                    </ul>
                    <UserIcon />
                </div>
            </nav>
            <ul id='slide-out' className='sidenav sidenav-close' ref={slideOut}>
                <li><NavLink to='/'>Home</NavLink></li>
            </ul>
        </>
    );
};

export default Navbar;
