import { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Carousel, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import CustomSpinner from './CustomSpinner';
import { houseDrawingWithGreenGarden } from "../assets/images/houseDrawings"
import { format } from 'date-fns';
import SendEmailForm from './SendEmailForm';

const PropertyDetailPage = () => {
    const { id } = useParams()
    const [showEmailSuccess, setShowEmailSuccess] = useState(false)
    const [isEmailFormVisible, setIsEmailFormVisible] = useState(false)
    const [wantToSendEmail, setWantToSendEmail] = useState(false)
    const [property, setProperty] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isThumbnailLoading, setIsThumbnailLoading] = useState(true)
    const fallBackThumbnailUrl = "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg"
    const [propertyImages, setPropertyImages] = useState([])
    const getProperty = async (id) => {
        try {
            const res = await fetch('http://localhost:3001/properties/' + id, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('authToken')
                }
            })
            if (res.ok) {
                const data = await res.json()
                setProperty(data)
                console.log('ecco la proprietà del belino', data)
                setTimeout(() => {
                    setIsLoading(false)
                }, 500);
            } else {
                throw new Error("Couldn't fetch property number " + id)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const getPropertyImages = async (id) => {
        try {
            const res = await fetch(`http://localhost:3001/properties/${id}/images`, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem('authToken')
                }
            })
            if (res.ok) {
                const data = await res.json()
                setPropertyImages(data)
                setIsThumbnailLoading(false)
            } else {
                throw new Error("Error retrieving data")
            }
        } catch (error) {
            console.log(error)
            setIsThumbnailLoading(false)
        }
    }
    useEffect(() => {
        getProperty(id)
        getPropertyImages(id)
        console.log('id di questa casa', id)
    }, [id])
    useEffect(() => {
        setIsEmailFormVisible(wantToSendEmail)
    }, [wantToSendEmail])
    return (
        <div className={isLoading ? 'd-flex justify-content-center align-items-center flex-grow-1' : 'overflow-hidden'}>
            {isLoading ?
                (<CustomSpinner />)
                : (<Container className="my-4 bg-primary rounded-3 py-4 px-5 overflow-hidden">
                    <Row className='d-flex justify-content-center'>
                        <Col xs={12}>
                            <h1 className='text-with-background ps-4 mb-2 d-md-none rounded-3'
                                style={{ fontStyle: 'italic' }}>{property.title ? property.title : "Annuncio Immobiliare"}</h1>
                            <div className='rounded-3 overflow-hidden mx-auto mb-4 mt-1' id='detail-carousel-container'>
                                <h1 className='text-with-background ps-4 mb-0 d-none d-md-block'
                                    style={{ fontStyle: 'italic' }}>{property.title ? property.title : "Annuncio Immobiliare"}</h1>
                                {propertyImages.length === 0 &&
                                    <img src={isThumbnailLoading ? houseDrawingWithGreenGarden : fallBackThumbnailUrl} alt="house" className='carousel' />}
                                {propertyImages.length === 1 &&
                                    <img src={isThumbnailLoading ? houseDrawingWithGreenGarden : propertyImages[0].imageUrl} alt="house" className='carousel' />}
                                {propertyImages.length > 1 &&
                                    <Carousel fade interval={2700} className="carousel">
                                        {
                                            propertyImages.map((image, i) => (
                                                <Carousel.Item key={i}>
                                                    <img src={image.imageUrl} alt="house"
                                                        style={{ objectFit: 'cover', width: '100%' }} />
                                                </Carousel.Item>
                                            ))
                                        }
                                    </Carousel>}
                            </div>
                        </Col>
                    </Row>
                    <Row className='p-4'>
                        <Col xs={12} md={6}>
                            <Row>
                                <Col xs={12}>
                                    <p><strong>Descrizione: </strong><br />{property.description}</p>
                                    <p><strong>Perché secondo noi è perfetta: </strong><br />{property.whyIsPerfect}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} md={6}>
                                    <p><strong>Numero di stanze: </strong> {property.numberOfRooms}</p>
                                </Col>
                                <Col xs={12} md={6}>
                                    <p><strong>Dimensione: </strong> {property.sizeSqMeters} m<sup>2</sup></p>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} md={6}>
                                    <p><strong>Piano: </strong> {property.floorNumber}</p>
                                </Col>
                                <Col xs={12} md={6}>
                                    <p><strong>Numero di bagni: </strong> {property.numberOfToilets}</p>
                                </Col>
                            </Row>
                            <p><strong>Tipo di annuncio: </strong> {property.listingType === 'FOR_SALE' ? 'In vendita' : 'In affitto'}</p>
                            <p><strong>Prezzo:</strong> {property.price} €{property.listingType === 'FOR_SALE' ? '' : '/mese'}</p>
                            <p><strong>Disponibile dal: </strong>{format(new Date(property.availableFrom), 'dd/MM/yyyy')}</p>
                            <p><strong>Indirizzo:</strong> {property.address.street} {property.address.streetNumber}, {property.address.zipCode} {property.address.city}, {property.address.provinceOrState}, {property.address.country}</p>
                        </Col>
                        <Col xs={0} md={1}></Col>
                        <Col xs={12} md={5}>
                            <div className='bg-secondary ps-4 p-3 rounded-3 text-center'>
                                <div className='d-flex justify-content-start'>
                                    <h3>PUBBLICATO DA:</h3>
                                </div>
                                <div className='d-xl-flex justify-content-start align-items-center'>
                                    <div>
                                        <img src={property.listedBy.avatarUrl} alt="Proprietario" className="rounded-circle mb-3" height='100px' width='100px' />
                                    </div>
                                    <div className='rounded-3 ms-2'>
                                        <p className='name-with-background fs-3 bg-black rounded-3 d-flex justify-content-center mb-0'><span className='text-white my-0 ms-2'>{property.listedBy.firstName.toUpperCase() + ' '}</span>
                                            <span className='text-primary my-0 me-2'>{property.listedBy.lastName.toUpperCase()}</span></p>
                                        <p className='text-black mt-2' style={{ fontSize: '1.1em' }}>{property.listedBy.email}</p>
                                    </div>
                                </div>
                                <div>
                                    <Button variant='primary' className='text-primary bg-black invia-una-mail' onClick={() => {
                                        setWantToSendEmail(!wantToSendEmail)
                                    }}>
                                        INVIA UNA MAIL AL PROPRIETARIO
                                    </Button>
                                </div>
                            </div>
                            {wantToSendEmail &&
                                <SendEmailForm
                                    property={property}
                                    thumbnail={propertyImages[0]}
                                    wantToSendEmail={wantToSendEmail}
                                    setWantToSendEmail={setWantToSendEmail}
                                    isEmailFormVisible={isEmailFormVisible}
                                    setIsEmailFormVisible={setIsEmailFormVisible}
                                    setShowEmailSuccess={setShowEmailSuccess}
                                />

                            }
                            {showEmailSuccess && <Alert className="fs-5" variant="success" onClose={() => setShowEmailSuccess(false)} dismissible>Messaggio inviato! ✉️🚀</Alert>}
                        </Col>
                    </Row>
                </Container>)
            }
        </div>
    );
}

export default PropertyDetailPage;
