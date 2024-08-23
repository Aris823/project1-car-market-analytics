import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import carList from './assets/taladrod-cars.min.json'
//import carList from './assets/sample.json'
import NavbarComponent from './Components/NavBar';
import HomePage from './pages/HomePage';
import HighlightPage from './pages/HighlighPage/HighlightPage'
import DashboardPage from './pages/DashboardPage/DashboardPage';

function App() {

  return (
    <Router fluid>
      <NavbarComponent />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pages/HighlightPage" element={<HighlightPage />} />
          <Route path="/pages/DashboardPage" element={<DashboardPage />} />
        </Routes>
      </div>

    </Router>
  )
}

export default App
