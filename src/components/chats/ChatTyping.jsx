import React, { useContext, useState, memo } from 'react';
import db from '../../firebase'
import {UserContext} from '../context/AppContext';
import "firebase/compat/firestore";
import './ChatTyping.css';
import Picker from 'emoji-picker-react';

const ChatTyping = ({roomID}) => {

    const [chatText, setChatText] = useState('')
    const [openningEmoji, setOpenningEmoji] = useState(false)
    const {userName} = useContext(UserContext)
    

  const onEmojiClick = (event, emojiObject) => {
    setChatText(chatText.concat(emojiObject.emoji));
  };

  // after user submit his message typed in added it to firestore
  const submitHandler =(e) => {
    e.preventDefault();
    if (chatText){
      db.collection('rooms').doc(roomID).collection('messages').add({
        msg : chatText,
        username : userName,
        timestamp : new Date()
      })
    }
    setChatText('')
  }
  
    return (
        <div className='chatTyping__container'>

          {/* user clicks on emoji icon gets emoji picker */}
          {openningEmoji &&
          <>

          {/* emoji peacker package give it some option and style */}
             <Picker groupVisibility={{
                  animals_nature:false,
                  food_drink: false,
                  travel_places:false,
                  activities:false,
                  objects:false,
                  symbols:false,
                  flags:false,
                  recently_used:false
                }} 
                onEmojiClick={onEmojiClick} 
                pickerStyle = {{
                  width : '100%',
                  height : '260px',
                  position : 'absolute',
                  bottom : '46px',
                  left : '0',
                  border : '2px solid silver',
                  zIndex : '99'
                }}
              />
             <div className='chatTyping__closeEmoji'>
              <button onClick={() => setOpenningEmoji(false)}>
                <i className='fas fa-close'></i>
              </button>
            </div>
            </>
          }
          <div className='chatTyping__emoji'>
            <button onClick={() => setOpenningEmoji(true)}>
              <i className='far fa-grin'></i>
            </button>
          </div>

          <div className='chatTyping__inputMessage'>
         
            <form onSubmit={submitHandler}>
              <input placeholder='enter message' type='text'
              value={chatText} onChange={e => setChatText(e.target.value)}/>
      
              <button type='submit' >
                <i className='fa fa-paper-plane'></i>
              </button>
            </form>
          </div>

        </div>
    )
}

export default memo(ChatTyping);
