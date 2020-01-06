
console.log("app is running now");
import React from 'react';
import ReactDOM from 'react-dom'; 
import MusicCatalogue from './components/MusicCatalogue';

import './styles/style.scss';

ReactDOM.render(
    <div><MusicCatalogue /></div>, document.getElementById("app"));
