import React from 'react';
import {Col, Row} from 'react-bootstrap'
import Car from '../../Components/Car'
import { useLocalStorage } from 'react-use';
import carList from '../../assets/taladrod-cars.min.json'

const HighlightPage = () => {

    const { Cars } = carList
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
          <h1>Highlighted Listing</h1>
          { highlightedCar.length === 0 
          ? <h3 style={{color: 'gray', opacity: 0.5}}>You haven't highlighted any car yet.</h3> 
          : <Row>
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
        }
          
        </Col>
    );
};

export default HighlightPage;