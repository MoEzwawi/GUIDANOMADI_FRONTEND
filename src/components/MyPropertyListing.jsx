import { useState } from "react";
import { Button, Card, Modal } from "react-bootstrap"
import { Trash3Fill } from "react-bootstrap-icons"
import countries from "../assets/data/countries";

const MyPropertyListing = ({ property, listingHasBeenDeleted }) => {
    const [show, setShow] = useState(false);
    const authToken = localStorage.getItem('authToken')
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const getCountryCode = (countryName) => {
        const targetCountry = countries.find(country => country.name === countryName);
        return targetCountry ? targetCountry.code : null;
    };

    const deletePropertyListing = async () => {
        try {
            const res = await fetch('http://localhost:3001/properties/' + property.id, {
                method: 'DELETE',
                headers: {
                    "Authorization": "Bearer " + authToken
                }
            })
            if (res.ok) {
                listingHasBeenDeleted()
            } else {
                throw new Error('unable to delete listing')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const currentCountryCode = getCountryCode(property.address.country);
    return (
        <>
            <Card className="m-5">
                <Card.Img variant="top" src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg" style={{ height: '100px' }} />
                <Card.Body style={{ height: '240px' }} className="d-flex flex-column justify-content-between">
                    <div className="d-flex justify-content-around align-items-center">
                        <Card.Title>{property.id}</Card.Title>
                        <div className="fs-2" style={{ cursor: 'pointer' }} onClick={handleShow}><Trash3Fill /></div>
                    </div>
                    <Card.Text>
                        {property.price} <br />
                        {property.address.country} <br />
                        <img src={`https://flagsapi.com/${currentCountryCode}/flat/16.png`} alt="country" /><br />
                        {property.address.city} <br />
                        {property.listingType === 'FOR_SALE' ? 'In vendita' : 'In affitto'}
                    </Card.Text>
                    <Button variant="warning">CIAO</Button>
                </Card.Body>
            </Card>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Sicuro di voler eliminare?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Immobile n° {property.id}, {property.listingType === 'FOR_SALE' ? <span>in vendita</span> : <span>in affitto</span>} a {property.address.city} <img src={`https://flagsapi.com/${currentCountryCode}/flat/16.png`} alt="country" /></Modal.Body>
                <Modal.Footer>
                    <Button className="border-0" variant="secondary" id="delete-button" onClick={() => { deletePropertyListing(); handleClose() }}>
                        Elimina definitivamente
                    </Button>
                    <Button className="border-0" variant="primary" onClick={handleClose}>
                        Annulla
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default MyPropertyListing