import React, { useEffect, useState } from 'react';
import netflix from './images/netflix.jpg'
import profile from './images/profile.png'
import "./Nav.css"


function Nav() {

    const [show, handleShow] = useState(false);
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                handleShow(true);
            } else handleShow(false)
        });
        //   return ()=>{
        //     window.removeEventListener("scroll");
        //   }
    },[])
    return (
        <div className={`nav ${show && "nav_black"}`}>
            <img
                className='nav_logo'
                src={netflix}
                alt="Netflix Logo"
            />
            <img
                className='nav_avatar'
                src={profile}
                alt="Netflix Logo"
            />
        </div>
    )
}

export default Nav