import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Signup from './components/Signup/signup';
import Login from './components/Login/Login';
import Profile from './components/Profile/profile';
import Security from './components/Security/SecQuestions';


function App() {
  

  return (
    <Router>
    <div className="App">
      <Routes> 
        <Route path="/" element={<Signup />} /> 
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path = '/SecQuestions' element = {<Security></Security>} />
      </Routes>
    </div>
  </Router>
  )
}

export default App
