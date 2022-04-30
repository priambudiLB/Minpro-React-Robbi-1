import React from 'react'
import { Col, Row, Form, Button } from 'react-bootstrap'

//--------------------------------------------------------------------------------------------------

const Formulir = ({
    name,
    email,
    password,
    address,
    join_date,
    phone,
    handleChange,
    handleSubmit }) => {

    return (

        <div className="mt-5">

            <Row>
                <Col>
                    <h4> Buat Akun </h4>
                    <hr />
                </Col>
            </Row>

            <Row>
                <Col>
                    <Form
                    onSubmit={handleSubmit} 
                    >

                        <Form.Group>

                            <Form.Label>Nama</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={name}
                                onChange={(event) => handleChange(event)}
                            />

                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">

                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="nama"
                                value={password}
                            onChange={(event) => handleChange(event)}
                            />

                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">

                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="text"
                                rows={3}
                                name="email"
                                value={email}
                            onChange={(event) => handleChange(event)}
                            />

                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">

                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                name="address"
                                value={address}
                            onChange={(event) => handleChange(event)}
                            />

                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">

                            <Form.Label>Join Date</Form.Label>
                            <Form.Control
                                type="text"
                                name="join_date"
                                value={join_date}
                            onChange={(event) => handleChange(event)}
                            />

                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">

                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="text"
                                name="phone"
                                value={phone}
                            onChange={(event) => handleChange(event)}
                            />

                        </Form.Group>

                        <Button variant="primary" type="submit" className="mt-4">
                            Submit
                        </Button>

                    </Form>
                </Col>
            </Row>

        </div>

    )
}

export default Formulir