import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import image from '../assets/images/GUIDANOMADI_LOGO_final.jpg'
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
import { PersonFill } from 'react-bootstrap-icons';
const Topbar = () => {
    const currentUserString = localStorage.getItem('currentUser');
    const currentUser = JSON.parse(currentUserString);
    const location = useLocation()
    const renderTopbar = () => {
        if (location.pathname === '/login' || location.pathname === '/register') {
            return false
        } else {
            return true
        }
    }
    const logout = () => {
        localStorage.removeItem('authToken')
        localStorage.removeItem('currentUser')
        window.location.reload()
    }
    const [showOffCanvas, setShowOffCanvas] = useState(false);
    const handleCloseOffCanvas = () => setShowOffCanvas(false);
    const handleShowOffCanvas = () => setShowOffCanvas(true);

    return (
        renderTopbar() ? (
            <>
                <Navbar expand="lg" className="bg-black p-0 ">
                    <Container>
                        <Navbar.Brand>
                            <Link to='/home'>
                                <div className='border border-2 border-tertiary'>
                                    <img src={image} alt='guidanomadi logo' id='navbar-logo' />
                                </div>
                            </Link>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" className='border-white' />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Link to="/home" className='text-light fw-bold mx-2' style={{ fontSize: '1.2em', textDecoration: 'none' }}>Home</Link>
                                <Link to="/properties" className='text-light fw-bold mx-2' style={{ fontSize: '1.2em', textDecoration: 'none' }}>Annunci</Link>
                            </Nav>
                            <Nav className="ml-auto mb-3 mb-md-0">
                                <Nav.Link onClick={handleShowOffCanvas}>
                                    {currentUser !== null &&
                                        <span style={{ fontSize: '1.2em' }}>
                                            <img src={currentUser.avatarUrl} alt="User Avatar" height="47px" width="47px" className="rounded-circle" />
                                            <span className='text-white my-0 ms-2'>{currentUser.firstName.toUpperCase() + ' '}</span>
                                            <span className='text-primary my-0 me-2'>{currentUser.lastName.toUpperCase()}</span>
                                        </span>
                                    }
                                </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <Offcanvas show={showOffCanvas} onHide={handleCloseOffCanvas} placement='end' className='bg-dark'>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>{currentUser !== null &&
                            <span style={{ fontSize: '1.2em' }}>
                                <img src={currentUser.avatarUrl} alt="User Avatar" height="47px" width="47px" className="rounded-circle" />
                                <span className='text-primary my-0 ms-2'>{currentUser.firstName.toUpperCase() + ' '}</span>
                                <span className='text-white my-0 me-2'>{currentUser.lastName.toUpperCase()}</span>
                            </span>
                        }</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <div className='text-white fs-5 underline-and-pointer-on-hover mb-4'>
                            <Link to='/me' style={{ textDecoration: 'none' }} onClick={handleCloseOffCanvas}>
                                <PersonFill /><span>Vai alla pagina profilo</span>
                            </Link>
                        </div>
                        <div className='text-white fs-5 underline-and-pointer-on-hover mb-4'>
                            <Link to='/newProperty' style={{ textDecoration: 'none' }} onClick={handleCloseOffCanvas}>
                                <span>PUBBLICA UN NUOVO ANNUNCIO</span></Link>
                        </div>
                    </Offcanvas.Body>
                    <Button className='bg-danger mt-auto mb-3 ms-auto me-3 rounded-pill' onClick={logout}>LOG-OUT</Button>
                </Offcanvas>
            </>
        ) : null
    )
}

export default Topbar;