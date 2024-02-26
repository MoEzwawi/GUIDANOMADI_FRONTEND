import { Button, Card, ListGroup } from "react-bootstrap"

const PropertyListing = ({ property }) => {
    return (
        <Card className="m-5">
            <Card.Img variant="top" src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg" style={{ height: '100px' }} />
            <Card.Body style={{ height: ' 240px' }} className="d-flex flex-column justify-content-between">
                <Card.Title>{property.id}</Card.Title>
                <Card.Text>
                    Price: {property.price} <br />
                    Country: {property.address.country} <br />
                    Location: {property.address.city} <br />
                    Listing Type: {property.listingType}
                </Card.Text>
                <Button variant="warning">CIAO</Button>
            </Card.Body>
            {/* <ListGroup className="list-group-flush">
                <ListGroup.Item>Some additional info</ListGroup.Item>
                <ListGroup.Item>Another piece of information</ListGroup.Item>
            </ListGroup>
            <Card.Body>
                
            </Card.Body> */}
        </Card>
    )
}

export default PropertyListing;