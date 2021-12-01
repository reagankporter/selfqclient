import React from 'react';
import { Nav, } from 'reactstrap';
import Logout from "../Logout/Logout";



const Header = props => {
    return(
        <header> 
            <h1 className="TitleTwo">SelfQ.</h1>
            <Nav className='ml-auto' navbar>
                    <Logout clearLocalStorage={props.clearLocalStorage}/>
            </Nav>
        </header>
    )
}

export default Header;