import React, { useContext, useEffect, memo} from 'react';
import SidebarBody from './SidebarBody';
import { confirm } from "react-confirm-box";
import Addchats from './Addchats';
import './sideBar.css';
import db, { auth } from '../../firebase';
import UserProfile from '../../img/profile.jpg'
import { Link} from 'react-router-dom';
import {UserContext} from '../context/AppContext';


const SideBar = () => {
    
    const {profile, setUser, rooms, setRooms} = useContext(UserContext);
    

    // get all rooms name and id from firestore after component rendered
    useEffect(()=> {

        db.collection('rooms').onSnapshot(snapshot => (
            setRooms (snapshot.docs.map ( doc =>
                ({
                    id: doc.id,
                    name: doc.data()
                })
            ))
        ),
        error => alert(error)
        )
        
    }, [])

    
    const signoutHandler = async () => {
        
    const options = {
        labels: {
            confirmable: "Yes",
            cancellable: "No"
        }
    }
    const result = await confirm("Are you sure log out?", options);

    // after user confirmed to sign out we set user to null to redirect them to signning forms
        if (result) {
            auth.signOut()
                .then(() => setUser(null))
                .catch(error => alert(error))
        }
    }
    return (
        <div className='sideBar__container'>
            <div className='sideBar__header'>

                {/* if user has profile picture in storage show them otherwise show the default we defined */}
                <img  src={profile ? profile : UserProfile} className='avatar' alt='avatar' />
                <button className='sideBar__header__logout' onClick={signoutHandler}>
                    sign out
                </button>
                    
            </div>
        
            <div className='sideBar__chats'>
                <Addchats />

                {/* for every room we have unique id we get this id by useParams */}
                {rooms.map(room => (
                    <Link key={room.id} to={`/rooms/${room.id}`}>
                        <SidebarBody room={room} rooms={rooms} />
                    </Link>
                ))}
            </div>   
        </div>
    )
}

export default memo(SideBar);
