import React from 'react';
import {
    Card,
    Button,
    ListGroup,
} from 'react-bootstrap';

const Car = ({ car, highlightedCar , onAdd }) => {
    if (car.IsCExp) {
        return <></>
    }

    const handleHighlight = (CarID) => {
        onAdd(CarID)
    }

    let isAlreadyHighlighted = false
    if (highlightedCar.find(item => item.Cid == car.Cid)){
         isAlreadyHighlighted = true
    }

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={car.Img300} alt={car.Img100} />
            <Card.Body>
                <Card.Title>{car.Prc} {car.Currency}</Card.Title>
                <Card.Text>
                    {car.NameMMT}
                </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item>Model: {car.Model}</ListGroup.Item>
                <ListGroup.Item>Year: {car.Yr}</ListGroup.Item>
                <ListGroup.Item>Province: {car.Province}</ListGroup.Item>
            </ListGroup>
            <Card.Body>
                <Button variant={isAlreadyHighlighted ? 'danger' : 'primary'} onClick={() => handleHighlight(car.Cid)}>
                {isAlreadyHighlighted ? 'Remove' : 'Highlight'}
                </Button>
            </Card.Body>
        </Card>

    );
};

export default Car;