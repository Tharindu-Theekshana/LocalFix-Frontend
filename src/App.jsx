import { BrowserRouter as Router, Route,Routes } from 'react-router-dom'
import './App.css'
import NotFound from './pages/NotFound'
import Home from './pages/Home'
import Profiles from './components/Profiles'
import EachProfile from './components/EachProfile'

function App() {
  

  return (
    <>
    <Router>
        <Routes>
          <Route index element={<Home/>}/>
          <Route path='*' element={<NotFound/>}/>
          <Route path='/profiles' element={<Profiles/>}/>
          <Route path='/eachProfile' element={<EachProfile/>}/>
        </Routes>
    </Router>
    </>
  )
}

export default App
