import Container from "react-bootstrap/Container";
import { useLocation } from 'react-router-dom';
import { Instagram, TwitterX, Facebook, Youtube } from "react-bootstrap-icons";


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
                    <p className="text-black me-5 d-none d-sm-block"></p>
                    <p className="mb-0 fs-6 ps-5">GUIDANOMADI {year} &copy;</p>
                    <p className="mb-0 fs-4"><Instagram className="icona me-sm-2 me-1" /><Youtube className="icona mx-sm-2 me-1" /><Facebook className="icona mx-sm-2 me-1" /><TwitterX className="icona ms-sm-2 me-sm-3 me-1" /></p>
                </div>
            </Container>) : null
    )
}

export default MyFooter