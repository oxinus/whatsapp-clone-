import React, { useContext, useEffect, useState } from 'react';
import { useFilePicker } from 'use-file-picker';
import db, {auth, storage} from '../../firebase';
import {MsgContext} from '../../App';
import './signup.css';
import UserProfile from '../../img/profile.jpg';
import { Link } from 'react-router-dom';


const SignUP = () => {

    const [signupEmail, setSignupEmail] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const [username, setUsername] = useState('');
    const [imgLoading, setImgLoading] = useState(false)
    const [imgUrl, setImgUrl] = useState('');
    const {setUser} = useContext(MsgContext);

    // initial state and definitions for use file picker package
    const [openFileSelector, filesContent] = useFilePicker({
        accept: ['.jpg','.jpeg','.png'],
      });

    const signupHandler = e => {

        // we should know we have no file in processing 
        if (filesContent.loading === false){
            e.preventDefault();

            // create user in firebase with email and password 
            auth.createUserWithEmailAndPassword(signupEmail, signupPassword)
                .then (userCredential => {

                    // set user to define got a user 
                    setUser(userCredential.user)

                    // put username and profile picture to database to have access to it for next times
                    db.collection('users').doc(userCredential.user.uid).set({
                        username : username,
                        profile : imgUrl
                    })
                })
                .catch(err => alert(err))
        }
    }

    // every time we set a picture for profile runs this code
    useEffect(() => {

        // if file state is loading set a loading 
        if (filesContent.loading){
            setImgLoading(true)

            // we put our picture on firebase storage
            storage.ref('profile/').child(filesContent.plainFiles[0].name)
            .put(filesContent.plainFiles[0])
            .then(() => {

                // after we put our picture on storage we get its url and put it in 
                // firestore to have it for next times that user sign in

                storage.ref("profile").child(filesContent.plainFiles[0].name)
                .getDownloadURL()
                    .then(url =>setImgUrl(url)) 
                    
                    // set img loading for duration time from selecting file to upload it's url on firestore
                    .then(() => setImgLoading(false))
            })  }

    },[filesContent.plainFiles[0]?.name])

    return (
        <div className='signinform__container'>

            <div className='signinform__userprofile__container'>

                {/* if user got a picture select this otherwise select the default we have defined */}
            <img alt='user-profile' src={imgUrl ? imgUrl : UserProfile }/>
                <button onClick={() => openFileSelector()}>
                    <i className={`${imgLoading ? 'fas fa-spinner fa-pulse' : 'fas fa-camera'} `}></i> 
                </button> 
            </div>
            <form className='signinform__form' onSubmit={signupHandler}>
                <p>Sign Up</p>
                <input placeholder='Username' type="text" value={username} onChange={e => setUsername(e.target.value)} required/>
                <input placeholder='Email' value={signupEmail} onChange={e => setSignupEmail(e.target.value)} type="email" required/>
                <input placeholder='Password' value={signupPassword} onChange={e => setSignupPassword(e.target.value)} type="password" required/>
                <button className= 'signup-btn' type='submit' >sign up</button>
                <button className='signin-btn'>alredy have an account <Link to='/signin'>sign-in</Link></button> 
            </form>
        </div>
    )
}

export default SignUP;
