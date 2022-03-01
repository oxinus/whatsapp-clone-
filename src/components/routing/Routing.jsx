import React, {useContext} from 'react';
import {Routes ,Route, Navigate} from "react-router-dom";
import {UserContext} from '../context/AppContext';
import Chat from '../chats/Chat';
import SideBar from '../sidebar/SideBar';
import SignUp from '../forms/SignUp'
import SignIn from '../forms/SignIn';


const Routing = () => {
    
    const {user} = useContext(UserContext)

    return (

        <>

            {/* if user is signed in or up show the sidbar and chat */}

            {user  ? 
            <div className='app'>
                <div className='app__container'>
                        <Routes>
                            <Route path='/' element={ 
                            <div className='sideBar'>
                                <SideBar />
                            </div>} />

                            {/* we define two rediect path, when user sign in or sign up path belongs to 
                             sign in and sign up so we should define a redirect path */}
                            <Route path='/signup' element={<Navigate replace to='/' />} />
                            <Route path='/signin' element={<Navigate replace to='/' />} />

                            <Route path='rooms/:roomID' element={ 
                            <>
                                <div className='sideBar'>
                                <SideBar />
                                </div>
                                <div className='chat'>
                                    <Chat />
                                </div>
                            </>} />
                        </Routes>
                </div>
            </div> :

            // if user is signed out show the forms for registeration and login
            <Routes>
                    <Route path='/signin' element={<SignIn />} />
                    <Route path='/signup' element={<SignUp />} />

                    {/* when user sign out its path is belong to rooms and it's unknown
                    so we should define a redirect path for them */}
                    <Route path='*' element={<Navigate replace to='/signup' />}/>
            </Routes>
            }

        </>
    )
}

export default Routing;