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
import Contact from './pages/Contact';
import MyProfile from './components/MyProfile'
import EditProfile from './components/EditProfile'
import CreateProfile from './components/CreateProfile'
import AboutUs from './pages/aboutUs'
import CreateAdmin from './components/CreateAdmin'
import HandleProfiles from './components/HandleProfiles'
import TermsAndConditions from './pages/terms&conditions'
import AllCustomers from './components/AllCustomers'
import AllWorkers from './components/AllWorkers'
import MyBookings from './components/MyBookings'
import MyReviews from './components/MyReviews'
import MakeReview from './components/MakeReview'
import PrivacyPolicy from './pages/PrivacyPolicy';
import MakeBooking from './components/MakeBooking'
import Settings from './components/Settings'
import ScrollToTop from './components/ScrollToTop'



function App() {
  

  return (
    <>
    <Router>
      <ScrollToTop/>
        <Routes>
          <Route index element={<Home/>}/>
          <Route path='*' element={<NotFound/>}/>
          <Route path='/aboutus' element={<AboutUs/>}/>
          <Route path='/terms&conditions' element={<TermsAndConditions/>}/>
          <Route path='/profiles' element={<Profiles/>}/>
          <Route path='/eachProfile' element={<EachProfile/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/customerDashboard' element={<CustomerDashboard/>}/>
          <Route path='/workerDashboard' element={<WorkerDashboard/>}/>
          <Route path='/adminDashboard' element={<AdminDashboard/>}/>
          <Route path='/myJobs' element={<MyJobs/>}/>
          <Route path='/workerReviews' element={<WorkerReviews/>}/>
          <Route path="/contact" element={<Contact />} />
          <Route path='/myProfile' element={<MyProfile/>}/>
          <Route path='/editProfile' element={<EditProfile/>}/>
          <Route path='/createProfile' element={<CreateProfile/>}/>
          <Route path='/createAdmin' element={<CreateAdmin/>}/>
          <Route path='/handleProfiles' element={<HandleProfiles/>}/>
          <Route path='/allCustomers' element={<AllCustomers/>}/>
          <Route path='/allWorkers' element={<AllWorkers/>}/>
          <Route path='/myBookings' element={<MyBookings/>}/>
          <Route path='/myReviews' element={<MyReviews/>}/>
          <Route path='/makeReview' element={<MakeReview/>}/>
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path='/makeBooking' element={<MakeBooking/>}/>
          <Route path='/settings' element={<Settings/>}/>
        </Routes>
    </Router>
    </>
  )
}

export default App
