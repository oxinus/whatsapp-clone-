import React from 'react';
import AppContext from './components/context/AppContext';
import Routing from './components/routing/Routing';
import './App.css';


const App = () => {

    return (       

        <AppContext>
            <Routing />
        </AppContext>
                
    )
}

export default App;