import { useState, useEffect } from 'react'
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

  //   useEffect(() => {
  //     fetch('./assets/taladrod-cars.min.json')
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       return response.json(); // Parse JSON data
  //     })
  //     .then(data => setData(data)) // Set state with data
  //     .catch(error => console.error('Error fetching data:', error)); // Handle errors
  // }, []);

  //   // Handle case where data is still being fetched or failed to fetch
  //   if (data === null) {
  //     return <div>Loading...</div>; // Or any other loading indicator
  //   }

  return (
    <Container fluid>
      <Col>
        {/* <h1>Car Listing</h1>
      <Row>
        {Cars.map(car => (
          !car.IsCExp ? (
          <Col key={car.Cid} md={3} className="mb-4">
            <Car car={car} />
          </Col>
          ) : null
        ))}
      </Row> */}
        <DataTable data={Cars} brand={MMList} />
      </Col>
      <Col>
        <div style={{ height: '500px', marginBottom: '20px' }}>
          <PieChart data={Cars} />
        </div>
      </Col>
      <Col>
        <div style={{ height: '500px', overflowX: 'auto' }}>
          <StackedBarChart data={Cars} />
        </div>
      </Col>
    </Container>
  )
}

export default App
