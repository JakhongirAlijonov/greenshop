import './App.css'
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Shop from './pages/Shop/Shop'
import News from './pages/News/News'
import Contact from './pages/Contact/Contact'
import Team from './pages/Team/Team'
import Portfolio from './pages/Portfolio/Portfolio'
import Service from './pages/Service/Service'
function App() {
  return (
   <Router>
   <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='shop' element={<Shop/>}/>
      <Route path='news' element={<News/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/service' element={<Service/>}/>
      <Route path='/portfolio' element={<Portfolio/>}/>
      <Route path='/team' element={<Team/>}/>


    </Routes>
    <Footer/>
   </Router>
  )
}

export default App