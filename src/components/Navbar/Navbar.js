import React from 'react';
import { useDispatch } from "react-redux";
import "./Navbar.css";
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { handleSearch } from "../redux/reducerSlice";

export default function Navbars(props) {
    const dispatch = useDispatch();
    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="lg" >
                <Container fluid>
                    <Navbar.Brand className='ms-5' href="#">Moudy</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="m-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll >
                            <a href="#" onClick={(e) => { window.scrollTo(0, props.popusoffsetNum); e.preventDefault() }} className={props.scroll.popus ? "active" : ""} >Popular Movies</a>
                            <a href="#" onClick={(e) => { window.scrollTo(0, (props.ratedMoviesOffSetNum - 65)); e.preventDefault() }} className={props.scroll.ratedMovies ? "active" : ""} >Top Rated Movies</a>
                            <a href="#" onClick={(e) => { window.scrollTo(0, (props.ratedShowOffsetNum - 55)); e.preventDefault() }} className={props.scroll.ratedShow ? "active" : ""} >Top Rated Show</a>
                            <a href="#" onClick={(e) => { window.scrollTo(0, (props.tvShowOffsetNum - 65)); e.preventDefault() }} className={props.scroll.tvShow ? "active" : ""} >Popular Tv Shows</a>
                        </Nav>
                        <Form className="d-flex">
                            <FormControl
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                onChange={(e) => dispatch(handleSearch({ e: e.target.value }))}
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div >
    )
}
