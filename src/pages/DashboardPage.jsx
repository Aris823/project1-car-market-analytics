import React from "react";
import { useState } from "react";
import { Col, Row, Container, Button } from 'react-bootstrap';
import DataTable from "../Components/DataTable";
import PieChart from "../Components/piechart";
import carList from "../assets/taladrod-cars.json";
import StackedBarChart from "../Components/StackedbarChart2";

const DashboardPage = () => {
  const { Cars } = carList
  const { MMList } = carList
  const [page, setPage] = useState("table")

  const handleTableChange = () => {
    if (page == "table") {
      setPage("detail_table")
    } else {
      setPage("table")
    }
  }
  return (
    <Container>
      <h1>Dashboard</h1>
      <Row>
        <Row>
          <Col xs={3}>
            <Button onClick={handleTableChange}>{page == "table" ? "View Detail" : "View Less"}</Button>
          </Col>
        </Row>
        <br />

        <Col md={5}>
          <DataTable data={Cars} brand={MMList} name={page} />
        </Col>

        <Col md={7}>
          {page == "table" &&
            <Row>
              <div style={{ height: '500px', marginBottom: '20px' }}>
                <PieChart data={Cars} />
              </div>
            </Row>
          }

          {page == "detail_table" &&
            <Row>
              <div style={{ height: '1000px', width: '100%', overflowX: 'auto' }}>
                <StackedBarChart data={Cars} />
              </div>
            </Row>
          }
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardPage;