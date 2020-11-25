import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Card, Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

function Cust_Appointment() {
  const [app, setApp] = useState();

  const { id } = useParams();
  useEffect(() => {
    async function getApp(params) {
      try {
        let token = localStorage.getItem("token");
        let resp = await axios.get(
          `http://localhost:8080/api/customer/appointment/${id}`, {
            headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        );
        console.log(resp.data.appointment);
        setApp(resp.data.appointment);
      } catch (error) {
        console.log(error);
      }
    }
    getApp();
  }, []);

  return (
    <>
      <Navbar bg="primary" variant="light">
        <Navbar.Brand>Workshop Buddy</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link>Features</Nav.Link>
        </Nav>
      </Navbar>
      <div>
        <Container className="my-2">
          <h1>Appointment Details</h1>
          {app && app.isAcknowledged ? (
            <span class="badge badge-pill badge-success my-2">
              Acknowledged
            </span>
          ) : (
            <span class="badge badge-pill badge-danger my-2">
              Pending Acknowledgement
            </span>
          )}

          <Row>
            <Col>
              <Card>
                <Card.Header>
                  <h3>{app && app.date}</h3>
                </Card.Header>
                <Card.Body>
                  <h5>{app && app.vehicle.vehicleNumber}</h5>
                  <h5>{app && app.vehicle.make + " " + app.vehicle.model}</h5>
                  <h5>{app && app.work}</h5>
                </Card.Body>
                <Card.Footer>
                  <h5>{app && app.workshop.name}</h5>
                  <h5>{app && app.workshop.address}</h5>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Cust_Appointment;
