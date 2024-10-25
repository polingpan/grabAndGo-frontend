import './App.css'
import Home from './MainPage/Home'
import {Route, Routes} from 'react-router-dom'
import BusinessSignUp from './BusinessSignUp/BusinessSignUp'
import Login from './Login/Login'
import Dashboard from './Dashboard/Dashboard'

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create-account" element={<BusinessSignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </div>
    )
}

export default App
