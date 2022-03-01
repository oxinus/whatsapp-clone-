import React, { useEffect, useState, memo } from 'react';
import {useNavigate} from "react-router-dom";
import { confirm } from "react-confirm-box";
import db from '../../firebase';
import './sidebarBody.css';

const SidebarBody = ({room, rooms}) => {

    const [lastMsg, setLastMsg] = useState('');
    const navigate = useNavigate();


    // get last message of any room 
    useEffect(() => {
        
        db.collection('rooms').doc(room.id).collection('messages').orderBy('timestamp', 'desc').onSnapshot(snapshot => (
            setLastMsg(snapshot.docs[0]?.data().msg))
        )
    }, [])

    const editRoom = async (roomID) => {

    // first we find the room name we should edit 
        let roomtoEdit = (rooms.find(room => room.id === roomID)).name.name

        // we get the new room name and update room name on firestore
        let edittedRoom = await prompt('edit message',roomtoEdit)
        if (edittedRoom){
            db.collection('rooms').doc(roomID).update({
                name : edittedRoom
            })
        }
    }


    const deleteRoom = async(roomID) => {

        const options = {
            labels: {
                confirmable: "Yes",
                cancellable: "No"
            }
        }
        const result = await confirm("Are you sure to delete this room?", options);
            if (result) {

                // we have subcollection we should first delete all docs in it
                db.collection('rooms').doc(roomID).collection('messages').onSnapshot(
                    snapshot => snapshot.forEach(doc => doc.ref.delete())
                )

                // after we deleted subcollection delete the doc that is subcollection's parent
                /* after the room deleted we want to redirect to home path we use async func because  
                it should first delete room next navigate to home if we don't use async, it may navigates when it's processing */
                const deleteRoom = async () => {
                    await db.collection('rooms').doc(roomID).delete()
                    navigate('/')
                }                
                deleteRoom()
            }
        }

    return (
        <div className='chatrooms'>
        <div className='chatrooms__content'>

            {/* use api to generate random pictures for rooms */}
            <img src={`https://i.pravatar.cc/50?img=${room.id}`} alt='avatar' className='avatar' /> 

            <div className='chatrooms__content__name'>
                <h4>{room.name.name}</h4>

                {/* if there is message show last message */}
                <h5>{lastMsg && lastMsg}</h5>
            </div>
        </div>
        <div className='chatrooms__buttons'>
            <button className='edit-room' onClick={() => editRoom(room.id)}><i className="fas fa-pencil-alt"></i></button>                     
            <button className='delete-room' onClick={()=> deleteRoom(room.id)}><i className='fa fa-trash'></i></button>
        </div>
    </div>
    )
}

export default memo(SidebarBody);
