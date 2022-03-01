import React, { useContext, useEffect, useState, memo } from 'react';
import { confirm } from "react-confirm-box";
import db from '../../firebase';
import './chatBody.css';
import {UserContext} from '../context/AppContext'; 


const ChatBody = ({message, roomID}) => {

    const {userName, messages} = useContext(UserContext);
    const [myChat, setMyChat] = useState(false);


    // Check it out to know it's the user's logged in messages or not
    useEffect(() => {

        if (message.username === userName)(
            setMyChat(true)
        )

    } ,[message])

   
    // getting new msg from user take times so we should have asyns await func to handle that 
    const editMsg = async (messageID) => {

        let msgtoEdit = (messages.find(message => message.id === messageID)).msg

        // after we find the messsage to edit get the value from user to update it on firestore and set new time
        let edittedMsg = await prompt('edit message',msgtoEdit)
        if (edittedMsg){
            db.collection('rooms').doc(roomID).collection('messages').doc(messageID).update({
                msg : edittedMsg,
                timestamp : new Date() 
            })
        }
    }

    // we got a confirm box if user confirms to delete, remove it from db
    const deleteMsg = async(messageID) => {
        const options = {
            labels: {
                confirmable: "Yes",
                cancellable: "No"
            }
        }
        const result = await confirm("Are you sure to delete this message?", options);
            if (result) {
                db.collection('rooms').doc(roomID).collection('messages').doc(messageID).delete() 
            }
    }
      

    return (
        
        // if it's the user's logged in message give it style to be diffrent from other user's messages
        <div className={` chat__messages__container ${myChat ? 'my__chat' : ''} `} >       
            <div className={` ${myChat ? 'my__chat__backColor' : '' } chat__messages__dateInfo__container `} >
                <div className='chat__messages__username'>{message.username}</div>
                <p>{message.msg}</p>
                <h6 className='chats__dateInfo' >{message.timestamp}</h6>  
                {myChat ?  
                <div>
                    <button className='edit-btn' onClick={() => editMsg(message.id)}><i className="fas fa-pencil-alt"></i></button>                     
                    <button className='delete-btn' onClick={()=> deleteMsg(message.id)}><i className='fa fa-trash'></i></button> 
                </div>
                 :  ''}
        </div>
     </div>     
    )
}

export default memo(ChatBody);
