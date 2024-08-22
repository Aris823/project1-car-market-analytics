import React from "react";
import { useState } from "react";
import {Col, Row, Container, Button} from 'react-bootstrap';
import DataTable from "../../Components/DataTable";
import PieChart from "../../Components/piechart";
import carList from "../../assets/taladrod-cars.min.json"
import StackedBarChart from "../../Components/StackedbarChart2";

const DashboardPage = () => {
    const {Cars} = carList
    const {MMList} = carList
    const [page, setPage] = useState("table")

    const handleTableChange = () => {
        if (page == "table") {
            setPage("detail_table")
        }else {
            setPage("table")
        }
    }
    return (
        <Container>
        <h1>Dashboard</h1>
        <Row>
           
        <Col>
        <Button onClick={handleTableChange}>{page == "table" ? "View Detail" : "View Less"}</Button>
          <DataTable data={Cars} brand={MMList} name={page} />
        </Col>

        {page == "table" &&
        <Col>
          <div style={{ height: '500px', marginBottom: '20px' }}>
            <PieChart data={Cars} />
          </div>
        </Col>
        }

        {page == "detail_table" &&
        <Col>
        <div style={{ height: '500px', overflowX: 'auto' }}>
          <StackedBarChart data={Cars} />
        </div>
      </Col>
        }
      </Row>
      </Container>
    );
};

export default DashboardPage;