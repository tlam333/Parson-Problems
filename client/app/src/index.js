import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.jsx';
import {AuthContextProvider} from './contexts/AuthContext.js';

const domNode = document.getElementById('root');
const root = createRoot(domNode);
root.render(
    <AuthContextProvider>
        <App />
    </AuthContextProvider>
    

);