import React, {useState} from 'react';
import './auth.css';
import APIURL from '../../helpers/enviroment';

const Auth = (props) => {
    console.log(props);
    const [username, setUsername]= useState('');
    const [email, setEmail]= useState('');
    const [password, setPassword]= useState('');
    const [login, setLogin]= useState(true);
    const title = () =>{
        return !login ? 'Signup' : 'Login'
    }
    const loginToggle = (e) =>{
        e.preventDefault();
        setLogin(!login)
        setEmail('');
        setPassword('');
        setUsername('');
    }
            const signupFields = () => !login ?
            (
            <div>
            <label className='authlabel' htmlFor="email">Email:</label>
            <br/>
            <input className="authinput" type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>

            </div>
        ) : null;
        const handleSubmit = (e) => {
            e.preventDefault();

            let reqBody = login ?

            {
                user: {
                    username: username,
                    password: password,
                }
        }:
        {
            user: {
                username: username,
                email: email,
                password: password
            }
        }
        // console.log(login);

        let url = login ?
        `${APIURL}/user/login`:
        `${APIURL}/user/register`;
        fetch(url,{
            method: 'POST',
            body: JSON.stringify(reqBody),
            headers: new Headers({
                'Content-Type':'application/json'
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let token = data.sessionToken;
            // localStorage.setItem('SessionToken', token);
            props.updateLocalStorage(token);
        })

        .catch((err) => console.log(err))
    }
    
    return(
        <div>
        <container className="authform">
        <form>
            <h1>{title()}</h1>
            {signupFields()}
            <label className='authlabel' htmlFor="username">User Name</label>
            <br/>
            <input className="authinput" type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            <br/>
            <label className='authlabel' htmlFor="password">Password</label>
            <br/>
            <input className="authinput" type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <br/>
            <button className='authbutton' type="button" onClick={loginToggle}>Login / Signup Toggle</button>

            <button className="authbutton" type="submit" onClick={handleSubmit}>Submit</button>
            <br/>
        </form>
        </container>
        </div>
    )}
export default Auth;
