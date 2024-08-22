import { useState } from 'react'
import { useLocalStorage } from 'react-use';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import carList from './assets/taladrod-cars.min.json'
import carList from './assets/taladrod-cars.json'
//import carList from './assets/sample.json'
import {
  Container,
  Row,
  Col,
  Button
} from 'react-bootstrap'
import Car from './Components/Car'
import DataTable from './Components/DataTable';
import PieChart from './Components/piechart';
import StackedBarChart from './Components/StackedbarChart2';
import NavbarComponent from './Components/NavBar';
import HomePage from './pages/HomePage';
import HighlightPage from './pages/HighlighPage/HighlightPage'
import DashboardPage from './pages/DashboardPage/DashboardPage';

function App() {

  const { Cars } = carList
  const { MMList } = carList
  const [highlightedCar, setHighlightedCar, remove] = useLocalStorage("highlighted_car", [])
  const [page, setPage] = useState("car_lists")

  const addByCarID = (CarID) => {

    const newCar = Cars.find(car => car.Cid === CarID)

    // Check if newCar is already in the highlightedCar array
    const isAlreadyHighlighted = highlightedCar.some(car => car.Cid === newCar.Cid);

    if (isAlreadyHighlighted) {
      // Remove newCar from highlightedCar
      setHighlightedCar(highlightedCar.filter(car => car.Cid !== newCar.Cid));
    } else {
      // Add newCar to highlightedCar
      setHighlightedCar([...highlightedCar, newCar]);
    }
  }

  return (
    <Router fluid>
      <NavbarComponent />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/pages/HighlightPage" element={<HighlightPage />} />
          <Route path="/pages/DashboardPage" element={<DashboardPage />} />
          {/* <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} /> */}
        </Routes>
      </div>

      {/* {page === "car_lists" && <Col>
        <h1>Car Listing</h1>
        <Row>
          {Cars.map(car => (
            !car.IsCExp ? (
              <Col key={car.Cid} md={3} className="mb-4">
                <Car car={car} highlightedCar={highlightedCar} onAdd={addByCarID} />
              </Col>
            ) : null
          ))}
        </Row>
      </Col>} */}
      {page === "table" &&
        <Row>
          <Col>
            <DataTable data={Cars} brand={MMList} name={page} />
          </Col>

          <Col>
            <div style={{ height: '500px', marginBottom: '20px' }}>
              <PieChart data={Cars} />
            </div>
          </Col>
        </Row>
      }



      {page === "detail_table" &&
        <Row>
          <Col>
            <DataTable data={Cars} brand={MMList} name={page} />
          </Col>
          <Col>
            <div style={{ height: '500px', overflowX: 'auto' }}>
              <StackedBarChart data={Cars} />
            </div>
          </Col>
        </Row>
      }


      {page === "highlighted_lists" &&
        <Col>
          <h1>Highlighted Listing</h1>
          <Row>
            {
              highlightedCar.map(car => (
                !car.IsCExp ? (
                  <Col key={car.Cid} md={3} className="mb-4">
                    <Car car={car} highlightedCar={highlightedCar} onAdd={addByCarID} />
                  </Col>
                ) : null
              ))
            }
          </Row>
        </Col>
      }

    </Router>
  )
}

export default App
