import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import {rootReducers} from './reducers'
import {applyMiddleware, createStore} from 'redux'
import thunk from 'redux-thunk'

const root = ReactDOM.createRoot(document.getElementById('root'))
const reduxStore = createStore(rootReducers, applyMiddleware(thunk))
root.render(
    <Provider store={reduxStore}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)
