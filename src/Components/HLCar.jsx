import React from 'react';
import {
    Card,
    Button,
    ListGroup,
} from 'react-bootstrap';

const Car = ({ car}) => {
    if (car.IsCExp) {
        return <></>
    }

   // const existingCarIndex = highlightedCar.findIndex(item => item.Cid == car.Cid)

    // const handleHighlight = (CarID) => {
    //     onAdd(CarID)
    // }

    return (
        //     <Card style={{ width: '18rem' }}>
        //     <Card.Img variant="top" src={car.Img300} alt={car.Img100} />
        //     <Card.Body>
        //       <Card.Title>{car.NameMMT}</Card.Title>
        //       <Card.Text>
        //         Some quick example text to build on the card title and make up the
        //         bulk of the card's content.
        //       </Card.Text>
        //       <Button variant="primary">HighLight</Button>
        //     </Card.Body>
        //   </Card>
        
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
                {/* <Card.Link href="#">Card Link</Card.Link>
                <Card.Link href="#">Another Link</Card.Link> */}
                <Button variant="primary">Remove</Button>
            </Card.Body>
        </Card>

        // <div style={{border: '1px solid #ddd', margin: '10px', padding: '10px'}}>
        // <h2>{car.NameMMT}</h2>
        // <p>Model: {car.Model}</p>
        // <p>Price: {car.Prc}</p>
        // <p>Year: {car.Yr}</p>
        // <p>Province: {car.Province}</p>
        // <img src={car.Img300} alt={car.Model} style={{width: '100%'}}/>
        // </div>
    );
};

export default Car;