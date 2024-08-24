import React, { useState } from 'react';
import Car from '../../Components/Car';
import carsData from '../../assets/taladrod-cars.json';
import { Col, Row, Container } from 'react-bootstrap';
import { useLocalStorage } from 'react-use';

const HomePage = () => {
    const [selectedBrand, setSelectedBrand] = useState("All");
    const [subBrands, setSubBrands] = useState([]);
    const [selectedSubBrand, setSelectedSubBrand] = useState("All");
    const { Cars } = carsData;

    const [highlightedCar, setHighlightedCar] = useLocalStorage("highlighted_car", []);

    const addByCarID = (CarID) => {
        const newCar = Cars.find(car => car.Cid === CarID);
        const isAlreadyHighlighted = highlightedCar.some(car => car.Cid === newCar.Cid);

        if (isAlreadyHighlighted) {
            setHighlightedCar(highlightedCar.filter(car => car.Cid !== newCar.Cid));
        } else {
            setHighlightedCar([...highlightedCar, newCar]);
        }
    };

    const handleBrandFilter = (event) => {
        const brand = event.target.value;
        setSelectedBrand(brand);
        setSelectedSubBrand("All"); // Reset sub-brand when a new brand is selected

        if (brand !== "All") {
            const brandModels = Cars
                .filter(car => car.NameMMT.split(' ')[0] === brand)
                .map(car => car.Model);
            setSubBrands([...new Set(brandModels)]);
        } else {
            setSubBrands([]);
        }
    };

    const handleSubBrandFilter = (event) => {
        setSelectedSubBrand(event.target.value); // Update the sub-brand value
    };

    const filteredCars = Cars.filter(car => {
        const brand = car.NameMMT.split(' ')[0];
        const matchesBrand = selectedBrand === "All" || selectedBrand === brand;
        const matchesModel = selectedSubBrand === "All" || selectedSubBrand === car.Model;

        return matchesBrand && matchesModel;
    });

    const uniqueBrands = ["All", ...new Set(Cars.map(car => car.NameMMT.split(' ')[0]))];

    return (
        <Container>
            <Row>
                
                    <h1>Highlighted Car</h1>
                    {highlightedCar.length === 0
                        ? <h3 style={{ color: 'gray', opacity: 0.5 }}>You haven't highlighted any car yet.</h3>
                        : <Row>
                            {highlightedCar.map(car => (
                                !car.IsCExp ? (
                                    <Col key={car.Cid} md={3} className="mb-4">
                                        <Car car={car} highlightedCar={highlightedCar} onAdd={addByCarID} />
                                    </Col>
                                ) : null
                            ))}
                        </Row>
                    }
                
                <Col>
                    <h1>Car Listing</h1>
                    <br />
                    <div style={{ textAlign: "center" , fontSize: "1.5rem"}}>
                        <label htmlFor="brandFilter" className="filter-label">Filter by Brand: </label>
                        &nbsp; &nbsp;
                        <select
                            id="brandFilter"
                            value={selectedBrand}
                            onChange={handleBrandFilter}
                            className="filter-select"
                            style={{ width: "200px"}}
                        >
                            {uniqueBrands.map(brand => (
                                <option key={brand} value={brand}>{brand}</option>
                            ))}
                        </select>
                        &nbsp; &nbsp;
                        {selectedBrand !== "All" && subBrands.length > 0 && (
                            <select
                                id="subBrandFilter"
                                value={selectedSubBrand}
                                onChange={handleSubBrandFilter}
                                className="filter-select"
                                style={{ width: "200px"}}
                            >
                                {subBrands.map(model => (
                                    <option key={model} value={model}>{model}</option>
                                ))}
                            </select>
                        )}
                    </div>
                    <br />
                    <Row>
                        {filteredCars.map(car => (
                            !car.IsCExp ? (
                                <Col key={car.Cid} md={3} className="mb-4">
                                    <Car car={car} highlightedCar={highlightedCar} onAdd={addByCarID} />
                                </Col>
                            ) : null
                        ))}
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default HomePage;
