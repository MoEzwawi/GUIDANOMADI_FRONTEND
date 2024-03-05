import { useEffect, useState } from "react";
import { Button, Card, Modal } from "react-bootstrap"
import { Trash3, Trash3Fill } from "react-bootstrap-icons"
import countries from "../assets/data/countries";
import { Link } from "react-router-dom";
import { houseDrawingWithGreenGarden } from "../assets/images/houseDrawings"


const MyPropertyListing = ({ property, listingHasBeenDeleted }) => {
    const [show, setShow] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [toBeEliminated, setToBeEliminated] = useState(false)
    const authToken = localStorage.getItem('authToken')
    const handleClose = () => {
        setShow(false)
        setToBeEliminated(false)
    }
    const handleShow = () => setShow(true)
    const [thumbnailUrl, setThumbnailUrl] = useState(null)
    const getCountryCode = (countryName) => {
        const targetCountry = countries.find(country => country.name === countryName);
        return targetCountry ? targetCountry.code : null;
    }

    const getPropertyThumbnail = async (id) => {
        try {
            const res = await fetch(`http://localhost:3001/properties/${id}/thumbnail`, {
                headers: {
                    "Authorization": "Bearer " + authToken
                }
            })
            if (res.status === 404) {
                throw new Error("Thumbnail non trovata");
            }
            if (res.ok) {
                const data = await res.json()
                console.log('risposta del get thumbnail', data)
                setThumbnailUrl(data.imageUrl)
                setIsLoading(false)
            }
        } catch (error) {
            console.log('errore nella fetch della thumbnail ', error)
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getPropertyThumbnail(property.id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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

    const currentCountryCode = getCountryCode(property.address.country)

    const significantSubstring = (string) => {
        const maxLength = 22
        if (string.length > maxLength) {
            return string.substring(0, maxLength) + '...'
        } else {
            return string
        }
    }

    return (
        <>
            <Card className="m-5">
                {isLoading && <Card.Img variant="top" src={houseDrawingWithGreenGarden} style={{ height: '140px' }} />}
                {!isLoading && <Card.Img variant="top" src={thumbnailUrl ? thumbnailUrl : "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg"} style={{ height: '140px' }} />}
                <Card.Body style={{ height: '200px', overflow: 'hidden' }} className="d-flex flex-column justify-content-between">
                    <div className="d-flex justify-content-around align-items-center">
                        <Link to={`/property/${property.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                            <Card.Title className="property-card-title">{property.title !== null ? significantSubstring(property.title) : 'Annuncio immobiliare'}</Card.Title>
                        </Link>
                        <div className="fs-2" style={{ cursor: 'pointer' }}
                            onClick={() => {
                                setToBeEliminated(true)
                                handleShow()
                            }}>{toBeEliminated ? <Trash3Fill className="text-danger" /> : <Trash3 />}</div>
                    </div>
                    <Card.Text>
                        {property.price} {property.listingType === 'FOR_SALE' ? '€' : '€ / mese'}<br />
                        {property.address.country} <br />
                        <img src={`https://flagsapi.com/${currentCountryCode}/flat/16.png`} alt="country" /><br />
                        {property.address.city} <br />
                        {property.listingType === 'FOR_SALE' ? 'In vendita' : 'In affitto'}
                    </Card.Text>
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