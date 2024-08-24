import React, { useState } from 'react';
import { Container, Row, Col, Table, FormControl } from 'react-bootstrap';
import carList from '../assets/taladrod-cars.min.json'
//import "../App.css";

const DataTable = ({ data, brand,name }) => {
    const { Cars } = carList;
    
    const [searchTerm, setSearchTerm] = useState('');

    const filteredData = data.filter(car => {
        if (!car.IsCExp) {
            return car.NameMMT.toLowerCase().includes(searchTerm.toLowerCase());
        }
        return false;
    });
    const filteredBrand = brand.filter(item =>
        item.Name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const calTotalOfBrand = (mkID) => {
        return filteredData.reduce((acc, item) => {
            if (item.MkID === mkID) {
                return acc + 1;
            }
            return acc;
        }, 0);
    };

    const calTotalOfModel = (MdID) => {
        return filteredData.reduce((acc, item) => {
            if (item.MdID === MdID) {
                return acc + 1;
            }
            return acc;
        }, 0);
    };

    const calTotalValueAccordingToBrand = (mkID) => {
        return filteredData.reduce((acc, item) => {
            if (item.MkID === mkID) {
                const priceString = item.Prc;
                const cleanString = priceString.replace(/[^0-9.]/g, '');
                const priceValue = parseInt(cleanString, 10);
                return acc + priceValue;
            }
            return acc;
        }, 0);
    };

    const countMdIDOccurrences = (data) => {
        return data.reduce((acc, car) => {
            const { MdID, Model, NameMMT, Prc } = car;
            if (!acc[MdID]) {
                acc[MdID] = {
                    count: 0,
                    models: new Set(),
                    nameMMT: new Set(),
                    prc: 0,
                };
            }
            acc[MdID].count += 1;
            acc[MdID].models.add(Model);
            acc[MdID].nameMMT.add(NameMMT);
            acc[MdID].prc += parseInt(Prc.replace(/[^0-9.]/g, ''), 10);

            return acc;
        }, {});
    };

    const mdIDCounts = countMdIDOccurrences(filteredData);

    const formattedResults = Object.entries(mdIDCounts).map(([mdID, { count, models, nameMMT, prc }]) => ({
        MdID: Number(mdID),
        Count: count,
        Models: Array.from(models).join(', '),
        NameMMT: Array.from(nameMMT).join(', '),
        Prc: prc,
    }));

    return (
        <Container>
            <br />
            <Row>
                <Col xs={6}>
                    <FormControl
                        type="text"
                        placeholder="Search by brand eg. Toyota"
                        className="mb-3"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Col>

                {name === "detail_table" &&
                <Col xs={12}>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Brand</th>
                                <th>Model</th>
                                <th>No. Of Cars</th>
                                <th>Value(Baht)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {formattedResults.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.NameMMT.slice(0, item.NameMMT.indexOf(' '))}</td>
                                    <td>{item.Models}</td>
                                    <td>{item.Count}</td>
                                    <td>{item.Prc}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
                }

            {name === "table" &&
            <Col xs={12}>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <td><b>Brand</b></td>
                                <td><b>Total No. of Cars</b></td>
                                <td><b>Total Value(Baht)</b></td>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredBrand.map((item, index) => {
                                const totalCars = calTotalOfBrand(item.mkID);
                                const totalValue = calTotalValueAccordingToBrand(item.mkID);

                                if (totalCars > 0) {
                                    return (
                                        <tr key={index}>
                                            <td>{item.Name}</td>
                                            <td>{totalCars}</td>
                                            <td>{totalValue}</td>
                                        </tr>
                                    );
                                }
                                return null;
                            })}
                        </tbody>
                    </Table>
                </Col>
            }
            </Row>
        </Container>
    );
};

export default DataTable;
