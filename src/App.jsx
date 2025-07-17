import { BrowserRouter as Router, Route,Routes } from 'react-router-dom'
import './App.css'
import NotFound from './pages/NotFound'
import Home from './pages/Home'
import Profiles from './components/Profiles'
import EachProfile from './components/EachProfile'
import Login from './components/login'


function App() {
  

  return (
    <>
    <Router>
        <Routes>
          <Route index element={<Home/>}/>
          <Route path='*' element={<NotFound/>}/>
          <Route path='/profiles' element={<Profiles/>}/>
          <Route path='/eachProfile' element={<EachProfile/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
    </Router>
    </>
  )
}

export default App
