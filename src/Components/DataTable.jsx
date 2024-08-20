import React from 'react';
import {
    Container,
    Row,
    Col,
    Table,
} from 'react-bootstrap'

const DataTable = ({ data, brand }) => {

    // const calTotalOfBrand = (mkID) => {
    //     data.reduce((acc, item) => 
    //     if (item.Mkid == mkID) {
    //         acc + 1
    //     }, 0
    //     )
    // }

    const calTotalOfBrand = (mkID) => {
        return data.reduce((acc, item) => {
            if (item.MkID === mkID) {
                return acc + 1;
            }
            return acc;
        }, 0);
    }

    const calTotalOfModel = (MdID) => {
        return data.reduce((acc, item) => {
            if (item.MdID === MdID) {
                return acc + 1
            }
            return acc;
        }, 0)
    }

    const calTotalValueAccordingToBrand = (mkID) => {
        return data.reduce((acc, item) => {
            if (item.MkID === mkID) {
                //console.log("string: ",item.Prc)
                const priceString = item.Prc;
                //console.log("priceString:", priceString)
                const cleanString = priceString.replace(/[^0-9.]/g, '');
                // console.log("cleanString:",cleanString)
                const priceValue = parseInt(cleanString, 10);
                //console.log("Int:",priceValue)
                return acc + priceValue;
            }
            return acc;
        }, 0);
    }

    // Function to count occurrences of each MdID and collect models
    const countMdIDOccurrences = (data) => {
        return data.reduce((acc, car) => {
            const { MdID, Model, NameMMT , Prc } = car;

            // If MdID does not exist in accumulator, initialize it
            if (!acc[MdID]) {
                acc[MdID] = {
                    count: 0,
                    models: new Set(),
                    nameMMT: new Set(),
                    prc: 0,
                };
            }

            // Increment the count for this MdID
            acc[MdID].count += 1;

            // Add model to the set of models for this MdID
            acc[MdID].models.add(Model);
            acc[MdID].nameMMT.add(NameMMT);

            acc[MdID].prc += parseInt(Prc.replace(/[^0-9.]/g, ''),10);

            return acc;
        }, {});
    };

    // Get the count of each MdID and associated models
    const mdIDCounts = countMdIDOccurrences(data);

    // Format the result for easier readability
    const formattedResults = Object.entries(mdIDCounts).map(([mdID, { count, models , nameMMT, prc}]) => ({
        MdID: Number(mdID),
        Count: count,
        Models: Array.from(models).join(', '), // Join models into a single string
        NameMMT: Array.from(nameMMT).join(', '),
        Prc: prc,
    }));

    return (
        <Container>
            <Row>
                {/* <Col xs={6}>
                    <Table>
                        <thead>
                            <tr>
                                <th>Car id</th>
                                <th>MkID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.Cid}</td>
                                    <td>{item.MkID}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col> */}


                {/* <Col xs={6}>
                    <Table>
                        <thead>
                            <tr>
                                <th>MdID</th>
                                <th>Model</th>
                                <th>No. Of Car</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.MdID}</td>
                                    <td>{item.Model}</td>
                                    <td>{calTotalOfModel(id)}</td>
                                </tr>
                            ))}


                        </tbody>
                    </Table>
                </Col> */}

                <Col xs={12}>
                    <Table>
                        <thead>
                            <tr>
                                <th>MdID</th>
                                <th>Brand</th>
                                <th>Model</th>
                                <th>No. Of Car</th>
                                <th>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {formattedResults.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.MdID}</td>
                                    <td>{item.NameMMT.slice(0, item.NameMMT.indexOf(' '))}</td>
                                    <td>{item.Models}</td>
                                    <td>{item.Count}</td>
                                    <td>{item.Prc}</td>
                                </tr>
                            ))}

                        </tbody>
                    </Table>
                </Col>



                {/* <Col xs={6}>
                    <Table>
                        <thead>
                            <tr>
                                <td>mkID</td>
                                <td>brand</td>
                                <td>Total</td>
                            </tr>
                        </thead>

                        <tbody>
                            {brand.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.mkID}</td>
                                    <td>{item.Name}</td>
                                    <td>{calTotalOfBrand(item.mkID)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col> */}

                <Col xs={12}>
                    <Table>
                        <thead>
                            <tr>
                                <td>mkID</td>
                                <td>brand</td>
                                <td>Total No. of Cars</td>
                                <td>Total Value</td>
                            </tr>
                        </thead>

                        <tbody>
                            {brand.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.mkID}</td>
                                    <td>{item.Name}</td>
                                    <td>{calTotalOfBrand(item.mkID)}</td>
                                    <td>{calTotalValueAccordingToBrand(item.mkID)}</td>
                                </tr>
                            ))}
                            <tr>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>


        </Container>
    );
};

export default DataTable;