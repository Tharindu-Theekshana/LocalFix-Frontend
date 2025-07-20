import { BrowserRouter as Router, Route,Routes } from 'react-router-dom'
import './App.css'
import NotFound from './pages/NotFound'
import Home from './pages/Home'
import Profiles from './components/Profiles'
import EachProfile from './components/EachProfile'
import Login from './components/login'
import CustomerDashboard from './components/CustomerDashboard'
import WorkerDashboard from './components/WorkerDashboard'
import AdminDashboard from './components/AdminDashboard'
import MyJobs from './components/MyJobs'
import WorkerReviews from './components/WorkerReviews'
import MyProfile from './components/MyProfile'
import EditProfile from './components/EditProfile'
import CreateProfile from './components/CreateProfile'


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
          <Route path='/customerDashboard' element={<CustomerDashboard/>}/>
          <Route path='/workerDashboard' element={<WorkerDashboard/>}/>
          <Route path='/adminDashboard' element={<AdminDashboard/>}/>
          <Route path='/myJobs' element={<MyJobs/>}/>
          <Route path='/workerReviews' element={<WorkerReviews/>}/>
          <Route path='/myProfile' element={<MyProfile/>}/>
          <Route path='/editProfile' element={<EditProfile/>}/>
          <Route path='/createProfile' element={<CreateProfile/>}/>
        </Routes>
    </Router>
    </>
  )
}

export default App
