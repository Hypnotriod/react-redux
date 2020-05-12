import React, { useEffect, useRef } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { Sidenav } from 'materialize-css';

const Header: React.FunctionComponent = () => {
    const slideOut = useRef<HTMLUListElement>(null);

    useEffect(() => {
        Sidenav.init(slideOut.current!, {});
    });

    return (
        <>
            <nav>
                <a href='/' data-target='slide-out' className='sidenav-trigger show-on-med-and-down'>
                    <i className='material-icons'>menu</i></a>
                <div className='nav-wrapper'>
                    <ul id='nav-mobile' className='right hide-on-med-and-down'>
                        <li><Link to='/'>Home</Link></li>
                    </ul>
                </div>

            </nav>
            <ul id='slide-out' className='sidenav' ref={slideOut}>
                <li><a href='#item1'>Item 1</a></li>
                <li><a href='#item2'>Item 2</a></li>
                <li><a href='#item3'>Item 3</a></li>
            </ul>
        </>
    );
};

export default Header;
