import React from 'react';
import Logo from '../../../images/codehighlogo.png'
import HamburgerMenubar from '../../../images/hamburger-menu-icon.jpeg'
import SideBar from './SideBar'

const NavBar = () => {
    return (
        <>
            <div className="navbar-container">
                <div className="navbar-logo">
                    <img className="logo" src={Logo} alt="logo"></img>
                </div>
                

                <div className="navbar-right">
                    <li className="login-tag">
                        Login/Logout
                    </li>
                    <li className="navbar-menubar-sidebar-container">
                        <img className="hamburger-menubar" src={HamburgerMenubar} alt="menubar"/>
                    <li><SideBar/></li>
                    </li>
                </div>                      
            </div>
        </>
    );
};

export default NavBar;