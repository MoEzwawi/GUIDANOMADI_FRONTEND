import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import image from '../assets/images/GUIDANOMADI_LOGO_final.jpg'
import { CaretDown, CaretDownFill } from 'react-bootstrap-icons';

const Topbar = () => {

    return (
        <Navbar expand="md" className="bg-black p-0 ">
            <Container>
                <Navbar.Brand>
                    <div className='border border-2 border-tertiary'>
                        <img src={image} alt='guidanomadi logo' height='65px' />
                    </div>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className='border-white' />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home" className='text-light fw-bold'
                            style={{ fontSize: '1.2em' }}>Home</Nav.Link>
                        <Nav.Link href="#link" className='text-light fw-bold'
                            style={{ fontSize: '1.2em' }}>Link</Nav.Link>
                    </Nav>
                    <Nav className="ml-auto mb-3 mb-md-0">
                        <NavDropdown title={
                            <span style={{ fontSize: '1.2em' }}>
                                <img src="https://upload.wikimedia.org/wikipedia/commons/e/ee/Aldo_Baglio.jpg" alt="User Avatar" height="47px" width="47px" className="rounded-circle" />
                                <span className='fw-bold text-light my-0 mx-2'>Aldo Baglio</span>
                                <span className='fw-bold text-light'><CaretDownFill /></span>
                                {/* QUI DEVO TOGLIERE LA CACATA DEL DROPDOWN E METTERCI UN OFFCANVAS */}
                            </span>
                        }
                            id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Another action
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Topbar;