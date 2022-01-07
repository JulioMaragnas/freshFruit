import React from 'react'
import logo from '../../Assets/logoFFS.png'
import user from '../../Assets/userFFS.png'
import settings from '../../Assets/settingsFFS.png'
import './Navbar.css'

function Navbar (props) {
    return(
        <nav className="navbar">
            <div className="navbar_container navbar_container--left">
                <img className="navbar_img--logo" src={logo} alt="logoFFS"/>
            </div>
            <div className="navbar_container navbar_container--center">
                <h1 className="navbar_title"> Tienda FreshFruit </h1>
            </div>
            <div className="navbar_container navbar_container--right">                
                <img className="navbar_img--header" src={settings} alt="" />
                <img className="navbar_img--header" src={user} alt="" />
            </div>
        </nav>
    )
}

export default Navbar;