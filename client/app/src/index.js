import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.jsx';
import {AuthenticationProvider} from './contexts/AuthenticationContext.js'

const domNode = document.getElementById('root');
const root = createRoot(domNode);
root.render(
    <AuthenticationProvider>
        <App />
    </AuthenticationProvider>
    

);