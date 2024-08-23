import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavbarComponent from './Components/NavBar';
import HomePage from './pages/CarListingPage/HomePage';
import DashboardPage from './pages/DashboardPage';


function App() {

  return (
    <Router fluid>
      <NavbarComponent />
      <div className="container mt-4">
        <Routes>
          
          {/* <Route path="/pages/HighlightPage" element={<HighlightPage />} /> */}
          <Route path="/" element={<DashboardPage />} />
          <Route path="/pages/CarListingPage" element={<HomePage />} />
        </Routes>
      </div>

    </Router>
  )
}

export default App
