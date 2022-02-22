import '../App.css';
import AddBook from './Form';
import { Container, Navbar, Row, Col, Nav, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useUserAuth } from '../Util/UserAuthContext';

function FormTag() {

    // State to grab the book id
    const [bookId, setBookId] = useState("");

    const getBookIdHandler = (id) => {
        console.log("The id of doc to be edited: ", id);
        setBookId(id);
    }

    // Handling Logout
    const { logOut, user } = useUserAuth();
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await logOut();
            navigate("/");
        } catch (error) {
            console.log(error.message);
        }
    };

    return (

        <>
            {/* ------------- Navigation Bar START ------------- */}
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
                <Container>
                    <Navbar.Brand>Company Dashboard</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto"></Nav>
                        <Nav>
                            <Navbar.Text className="nav-component">
                                <b>Signed as: </b> {user.email}
                            </Navbar.Text>
                            <Link to="/home" className="btn btn-primary mr-2 nav-component">Home</Link>
                            <Button onClick={handleLogout} className="nav-component">Logout</Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {/* ------------- Navigation Bar END ------------- */}

            <Container style={{ width: "600px" }}>
                <Row>
                    <Col>
                        <AddBook id={bookId} setBookId={setBookId} />
                    </Col>
                </Row>
            </Container>
        </>

    )
}

export default FormTag