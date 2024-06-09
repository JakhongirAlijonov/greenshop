import "./App.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Shop from "./pages/Shop/Shop";
import News from "./pages/News/News";
import Contact from "./pages/Contact/Contact";
import Team from "./pages/Team/Team";
import Portfolio from "./pages/Portfolio/Portfolio";
import Service from "./pages/Service/Service";
import Signup from "./pages/SignUp/Signup";
import Login from "./pages/Login/Login";
import { AuthProvider } from "./contexts/authContext";

function MainContent() {
  const location = useLocation();
  const shouldShowNavbar = !['/signup', '/signin'].includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/news" element={<News />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/service" element={<Service />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/team" element={<Team />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Login />} />
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <MainContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
