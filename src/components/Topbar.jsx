import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import image from '../assets/images/GUIDANOMADI_LOGO_final.jpg'
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Button, Card, Offcanvas } from 'react-bootstrap';
import { HouseFill, PersonFill, PlusCircleFill } from 'react-bootstrap-icons';
import guidanomadiPlaceholder from '../assets/images/placeholder.PNG'

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
                                <Link to='/community' className='text-light fw-bold mx-2' style={{ fontSize: '1.2em', textDecoration: 'none' }}>Community</Link>
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
                        <Card className="bg-primary mb-3 card-dell-offcanvas">
                            <Link to='/me' className="d-flex align-items-center text-white text-decoration-none" onClick={handleCloseOffCanvas}>
                                <Card.Body>
                                    <PersonFill size={20} /><span className="ms-2">VAI ALLA PAGINA PROFILO</span>
                                </Card.Body>
                            </Link>
                        </Card>
                        <Card className="bg-primary mb-3 card-dell-offcanvas">
                            <Link to='/newProperty' className="d-flex align-items-center text-white text-decoration-none" onClick={handleCloseOffCanvas}>
                                <Card.Body>
                                    <PlusCircleFill size={20} /><span className="ms-2">PUBBLICA UN NUOVO ANNUNCIO</span>
                                </Card.Body>
                            </Link>
                        </Card>
                        <Card className="bg-primary mb-3 card-dell-offcanvas">
                            <Link to='/properties' className="d-flex align-items-center text-white text-decoration-none" onClick={handleCloseOffCanvas}>
                                <Card.Body>
                                    <HouseFill size={20} /><span className="ms-2">ESPLORA ANNUNCI IMMOBILIARI</span>
                                </Card.Body>
                            </Link>
                        </Card>
                        <div style={{ position: 'absolute', bottom: '38%', left: '50%', transform: 'translateX(-50%) translateY(50%)' }}>
                            <Link to='/home' onClick={handleCloseOffCanvas}>
                                <img src={guidanomadiPlaceholder} alt='guida nomadi logo' height='200px' />
                            </Link>
                        </div>
                    </Offcanvas.Body>
                    <Button variant='secondary' className='border-0 mt-auto mb-3 ms-auto me-3 rounded-pill' onClick={logout} id='logout-button'>LOG-OUT</Button>
                </Offcanvas>
            </>
        ) : null
    )
}

export default Topbar;