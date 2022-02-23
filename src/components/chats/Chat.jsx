import React, { useContext, useEffect, useState } from 'react';
import ChatBody from './ChatBody';
import {useParams} from 'react-router-dom';
import db from '../../firebase';
import ChatTyping from './ChatTyping';
import './Chat.css';
import {MsgContext} from '../../App' 

const Chat = () => {
    const {messages, setMessages} = useContext(MsgContext)
    const {roomID} = useParams()
    const [roomName, setRoomName] = useState('');
    const [lastSent, setLastSent] = useState();


      
    useEffect( () => {

        // get room name when link to the chatroom
        db.collection('rooms').doc(roomID).onSnapshot(snapshot => (
            setRoomName(snapshot.data()?.name)
        ))


        db.collection('rooms').doc(roomID).collection('messages').orderBy('timestamp').onSnapshot(snapshot => (
            setMessages(snapshot.docs.map( row => ({
                msg : row.data().msg,
                username : row.data().username,
                timestamp : row.data().timestamp.toDate().toLocaleString(),
                id:row.id
            })))
        ))


        // get the last message timestamp 
        db.collection('rooms').doc(roomID).collection('messages').orderBy('timestamp', 'desc').onSnapshot(snapshot => (
            setLastSent(snapshot.docs[0]?.data().timestamp)
        ))

    }, [roomID] )

    return (
        <div className='chat__container'>
            <div className='chat__header'>
                <img src={`https://i.pravatar.cc/50?img=${roomID}`} alt='avatar' className='avatar' />   
                <div className='chatHeader__content'>
                    <h4>{roomName}</h4>

                    {/* show timestamp to local for diffrent locations timestamp */}
                    {lastSent && <h5>last message sent at &nbsp;{lastSent?.toDate().toLocaleString()}</h5>}
                </div>
            </div>
            <div className='chat__messages'>
                    {messages.map(message => (
                        <ChatBody key={message.id} message={message} roomID={roomID} />  
                    ))}
            </div>
            <ChatTyping roomID={roomID} />
        </div>
    )
}

export default Chat;
