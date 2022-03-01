import React, { useState, useEffect } from 'react';
import db from '../../firebase';

export const UserContext = React.createContext()

const AppContext = ({children}) => {


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
        <UserContext.Provider value={{messages, setMessages,
            user, setUser, userName, setUserName, profile, 
            rooms, setRooms}}>

            {children}

        </UserContext.Provider>
    )
}

export default AppContext;