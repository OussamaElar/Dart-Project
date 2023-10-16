import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import Header from './components/Website/layouts/Header';

import './App.css';

function App() {
return (
    <div className="App">
        <Header />
        <div className='container'>
            <div className='row'>
            </div>
        </div>
    </div>
);
}

export default App;
library.add(fas, far, faCoffee)
