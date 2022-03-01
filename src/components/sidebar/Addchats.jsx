import React, {memo} from 'react';
import './Addchat.css';
import db from '../../firebase';

const Addchats = () => {
    const addNewChat =() => {

        // get the value user types in and put it on db
        const chatName = prompt('please enter name')
        if (chatName){
            db.collection('rooms').add({
                name : chatName
            })
        }
    }
    return (
        <div className='addchat__container'>
            <h3 onClick={addNewChat}>add new chat</h3>
        </div>
    )
}

export default memo(Addchats);
