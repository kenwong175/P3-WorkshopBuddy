import axios from "axios";
import { Formik, useFormik } from "formik";
import React, { useState } from "react";
import { useEffect } from "react";
import { Button, Col, Container, Form, Image } from "react-bootstrap";
import { NavLink, Redirect } from "react-router-dom";
import * as Yup from "yup";

function AdminRegister({ isRegis, setIsRegis }) {
  const [newUser, setNewUser] = useState({});

  function changeHandler(e) {
    setNewUser((user) => ({ ...user, [e.target.name]: e.target.value }));
  }

  let Schema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(5, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    firstname: Yup.string().min(5, "Too Short!").required("Required"),
    lastname: Yup.string().min(2, "Too Short!").required("Required"),
  });

  const {
    handleSubmit,
    handleChange,
    errors,
    values,
    touched,
    handleBlur,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
      firstname: "",
      lastname: "",
    },
    validationSchema: Schema,
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      // console.log(values);
      register(values);
    },
  });

  async function register(user) {
    try {
      let resp = await axios.post("/api/auth/register", user);
      setIsRegis(true);
    } catch (error) {
      // console.log(error);
    }
  }

  if (isRegis) {
    return <Redirect to={"/login"} />;
  }
  return (
    <div className="cdash d-flex align-items-center">
      <Container className="text-center">
        <Col md={4} className="mx-auto py-4 cont2 shadow">
          <h3>
            <strong>
              WORKSHOP <i class="fas fa-tools"></i> BUDDY
            </strong>
          </h3>
          <div className="my-1">REGISTER</div>
          <Form onSubmit={handleSubmit}>
            <Form.Row className="mb-3">
              <Form.Control
                placeholder="Email"
                onChange={handleChange}
                name="email"
                value={values.email}
                className={touched.email && errors.email ? `is-invalid` : null}
              />
              {touched.email && errors.email ? (
                <div className="invalid-feedback">{errors.email}</div>
              ) : null}
            </Form.Row>
            <Form.Row className="mb-3">
              <Form.Control
                onChange={handleChange}
                placeholder="Password"
                value={values.password}
                name="password"
                type="password"
                className={
                  touched.password && errors.email ? `is-invalid` : null
                }
              />
              {touched.password && errors.password ? (
                <div className="invalid-feedback">{errors.password}</div>
              ) : null}
            </Form.Row>
            <Form.Row className="mb-3">
              <Form.Control
                placeholder="First Name"
                onChange={handleChange}
                value={values.firstname}
                name="firstname"
                className={
                  touched.firstname && errors.firstname ? `is-invalid` : null
                }
              />
              {touched.firstname && errors.firstname ? (
                <div className="invalid-feedback">{errors.firstname}</div>
              ) : null}
            </Form.Row>
            <Form.Row className="mb-3">
              <Form.Control
                placeholder="Last Name"
                onChange={handleChange}
                value={values.lastname}
                name="lastname"
                className={
                  touched.lastname && errors.lastname ? `is-invalid` : null
                }
              />
              {touched.lastname && errors.lastname ? (
                <div className="invalid-feedback">{errors.lastname}</div>
              ) : null}
            </Form.Row>

            <Form.Row className="mb-3">
              <Button type="submit" block>
                Register
              </Button>
            </Form.Row>
          </Form>
          <NavLink to="/login"> Back </NavLink>
        </Col>
      </Container>
    </div>
  );
}

export default AdminRegister;
