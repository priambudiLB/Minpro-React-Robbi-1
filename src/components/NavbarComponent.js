import React from 'react'
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
// import { Link } from 'react-router-dom'

//----------------------------------------------------------------------------------------------------------------------

const NavbarComponent = () => {

    const handleLogOut = () => {
        localStorage.removeItem('accessToken')
        window.location.href = "/login"
    }

    //----------------------------------------------------------------------------------------------------------------------

    let buttonAlt = "";

    if (localStorage.getItem('accessToken')) {

        buttonAlt = <Button variant="outline-danger" onClick={handleLogOut} className="marginLeft: 5">Logout</Button>

    } else {

        buttonAlt = <a href="/login" style={{ color: 'white' }} variant="none" className="m-4">Login</a>
    }

    //----------------------------------------------------------------------------------------------------------------------

    return (

        <Navbar expand="lg">

            <Container>

                <Navbar.Brand href="#" style={{ color: 'white' }}> <strong>Cemilan</strong> Cemilun </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />

                <Navbar.Collapse id="navbarScroll">

                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px', color: 'white' }}
                        navbarScroll
                    >

                        <a href="/" style={{ color: 'white' }} className="m-4" variant="none">Home</a>
                        {" "}

                        {buttonAlt}

                    </Nav>

                </Navbar.Collapse>

            </Container>

        </Navbar>
    )
}

//----------------------------------------------------------------------------------------------------------------------

export default NavbarComponent