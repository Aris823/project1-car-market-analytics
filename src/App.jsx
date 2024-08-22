import { useState, useEffect } from 'react'
import { useLocalStorage } from 'react-use';
import carList from './assets/taladrod-cars.min.json'
// import carList from './assets/taladrod-cars.json'
// import carList from './assets/sample.json'
import {
  Container,
  Row,
  Col,
} from 'react-bootstrap'
import Car from './Components/Car'
import DataTable from './Components/DataTable';
import PieChart from './Components/piechart';
import StackedBarChart from './Components/StackedbarChart2';

function App() {

  const [data, setData] = useState(null);
  const { Cars } = carList
  const { MMList } = carList
  const [highlightedCar, setHighlightedCar, remove] = useLocalStorage("highlighted_car", [])
  const [page, setPage] = useState("car_lists")

  const addByCarID = (CarID) => {
    const newCar = Cars.find(car => car.Cid === CarID)
    setHighlightedCar([...highlightedCar,newCar])
    console.log(highlightedCar)
  }

  return (
    <Container fluid>
      {page === "car_lists" && <Col>
        <h1>Car Listing</h1>
        <Row>
          {Cars.map(car => (
            !car.IsCExp ? (
              <Col key={car.Cid} md={3} className="mb-4">
                <Car car={car} highlightedCar={highlightedCar} onAdd={addByCarID}/>
              </Col>
            ) : null
          ))}
        </Row>
      </Col>}
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


<Col>
        <h1>Highlighted Listing</h1>
        <Row>
          {highlightedCar.map(car => (
              <Col key={car.Cid} md={3} className="mb-4">
                <Car car={highlightedCar}/>
              </Col>
          ))}
        </Row>
      </Col>

    </Container>
  )
}

export default App
