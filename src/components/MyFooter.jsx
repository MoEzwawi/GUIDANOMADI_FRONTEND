import Container from "react-bootstrap/Container";
import { useLocation } from 'react-router-dom';
import { Instagram, TwitterX, Facebook, Youtube, Github, Linkedin } from "react-bootstrap-icons";


const date = new Date()
const year = date.getFullYear()

const MyFooter = () => {
    const location = useLocation()
    const renderFooter = () => {
        if (location.pathname === '/login' || location.pathname === '/register') {
            return false
        } else {
            return true
        }
    }
    return (
        renderFooter() ? (
            <Container fluid id="myFooter">
                <div className="d-flex align-items-center justify-content-between">
                    <p className="mb-0 fs-4">
                        <a target="_blank" rel="noreferrer" style={{ color: '#8d8c7c' }} href="https://github.com/MoEzwawi" alt="Developer's Github">
                            <Github className="me-sm-2 me-1" /></a>
                        <a target="_blank" rel="noreferrer" style={{ color: '#8d8c7c' }} href="https://www.linkedin.com/in/mohamed-ezwawi-developer/" alt="Mohamed Ezwawi LinkedIn">
                            <Linkedin className="ms-sm-2 me-sm-3 me-1" /></a>
                    </p>
                    <p className="mb-0 fs-6 ps-0 ps-sm-5 mx-1" style={{ cursor: 'pointer' }}>GUIDANOMADI {year} &copy;</p>
                    <p className="mb-0 fs-4"><Instagram className="icona me-sm-2 me-1" /><Youtube className="icona mx-sm-2 me-1" /><Facebook className="icona mx-sm-2 me-1" /><TwitterX className="icona ms-sm-2 me-sm-3 me-1" /></p>
                </div>
            </Container>) : null
    )
}

export default MyFooter