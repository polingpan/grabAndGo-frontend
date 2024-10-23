import './App.css'
import Home from './MainPage/Home'
import {Route, Routes} from 'react-router-dom'
import BusinessSignUp from './BusinessSignUp/BusinessSignUp'
import Login from './Login/Login'

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create-account" element={<BusinessSignUp />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </div>
    )
}

export default App
