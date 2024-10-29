import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import {rootReducers} from './reducers'
import {configureStore} from '@reduxjs/toolkit'

const root = ReactDOM.createRoot(document.getElementById('root'))
const store = configureStore({
    reducer: rootReducers
})
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)
