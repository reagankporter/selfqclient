import React from "react";
import "./Logout.css"
import logout from '../../Assets/logout.svg';
const Logout = props => {
    return (
        <div> 
            <img id='logout' alt= 'power button' src={logout} onClick={props.clearLocalStorage}/>
        </div>          
    )
    }
    
    export default Logout;