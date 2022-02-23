import React, { useContext, useState } from 'react';
import {Link} from 'react-router-dom';
import {MsgContext} from '../../App';
import {auth} from '../../firebase'
import './signin.css';

const SignIn = () => {

    const [signinEmail, setSigninEmail] = useState('');
    const [signinPassword, setSigninPassword] = useState('');
    const {setUser} = useContext(MsgContext)

    const signinHandler = e => {
        e.preventDefault();

        // signin to db and set user to know that have a user 
        auth.signInWithEmailAndPassword(signinEmail, signinPassword)
            .then(userCredential => setUser(userCredential.user))

            .catch(error => alert(error.message))

    }

    return (
        <div className='signin__container'>
            <form onSubmit={signinHandler}>
                <p>Sign In</p>
                <input placeholder='Email' value={signinEmail} type="email" required
                    onChange={e => setSigninEmail(e.target.value)}
                />
                <input placeholder='Password' value={signinPassword} 
                    onChange={e => setSigninPassword(e.target.value)} type="password" required
                />
                <button className='sigin-button' type='submit'>sign in</button>
                <button className='signup-button'><Link to='/signup'>create account</Link></button>
            </form>
        </div>
    )
}

export default SignIn
