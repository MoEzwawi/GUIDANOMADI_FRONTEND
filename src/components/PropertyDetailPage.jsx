import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const PropertyDetailPage = () => {
    const { id } = useParams()
    const [property, setProperty] = useState(null)
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
            } else {
                throw new Error("Couldn't fetch property number " + id)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getProperty(id)
    }, [id])
    return (
        <Container className="mt-5">
            <h1>{property.title}</h1>
            <Card>
                <Card.Body>
                    <Row>
                        <Col md={8}>
                            <p>{property.description}</p>
                            <p><strong>Perché è perfetta:</strong> {property.whyIsPerfect}</p>
                            <p><strong>Numero di stanze:</strong> {property.numberOfRooms}</p>
                            <p><strong>Metri quadrati:</strong> {property.sizeSqMeters}</p>
                            <p><strong>Piano:</strong> {property.floorNumber}</p>
                            <p><strong>Numero di bagni:</strong> {property.numberOfToilets}</p>
                            <p><strong>Tipo di annuncio:</strong> {property.listingType === 'FOR_SALE' ? 'In vendita' : 'In affitto'}</p>
                            <p><strong>Prezzo:</strong> {property.price} €</p>
                            <p><strong>Disponibile dal:</strong> {property.availableFrom}</p>
                            <p><strong>Indirizzo:</strong> {property.address.street} {property.address.streetNumber}, {property.address.zipCode} {property.address.city}, {property.address.provinceOrState}, {property.address.country}</p>
                            <p><strong>Proprietario:</strong> {property.listedBy.firstName} {property.listedBy.lastName}</p>
                        </Col>
                        <Col md={4}>
                            <img src={property.listedBy.avatarUrl} alt="Proprietario" className="img-fluid" />
                            <p>Email: {property.listedBy.email}</p>
                            <p>Username: {property.listedBy.username}</p>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default PropertyDetailPage;
