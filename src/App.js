import React, {useState, useEffect} from 'react';
import {BrowserRouter ,Routes ,Route, Navigate} from "react-router-dom";
import db from './firebase';
import Chat from './components/chats/Chat';
import SideBar from './components/sidebar/SideBar';
import SignUp from './components/forms/SignUp'
import SignIn from './components/forms/SignIn';
import './App.css';

export const MsgContext = React.createContext();
const App = () => {

    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState(null);  
    const [userName, setUserName] = useState('');
    const [profile, setProfile] = useState('');
    const [rooms, setRooms] = useState([]);



    // after user changed means another user signed in get the profile picture and username from db
    useEffect(() => {
        db.collection('users').doc(user?.uid).onSnapshot(snapshot => setUserName(snapshot.data()?.username))
        db.collection('users').doc(user?.uid).onSnapshot(snapshot => setProfile(snapshot.data()?.profile))
    } ,[user])

    return (
        <BrowserRouter>

            <MsgContext.Provider value={{messages, setMessages,
                 user, setUser, userName, setUserName, profile, 
                 rooms, setRooms}}>

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

            </MsgContext.Provider>
            
        </BrowserRouter>    
    
    )
}

export default App;
