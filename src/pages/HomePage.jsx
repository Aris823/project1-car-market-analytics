import React from 'react';
import carList from '../assets/taladrod-cars.min.json'
import Car from '../Components/Car'
import {Col, Row} from 'react-bootstrap'
import { useLocalStorage } from 'react-use';



const HomePage = () => {
    const {Cars} = carList
    const [highlightedCar, setHighlightedCar, remove] = useLocalStorage("highlighted_car", [])
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
        <Col>
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
      </Col>
    );
};

export default HomePage;