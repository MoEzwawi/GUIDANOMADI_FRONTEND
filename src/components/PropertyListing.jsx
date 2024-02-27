import { Button, Card, ListGroup } from "react-bootstrap"
import countries from '../assets/data/countries.js';

const PropertyListing = ({ property }) => {
    const getCountryCode = (countryName) => {
        const targetCountry = countries.find(country => country.name === countryName)
        return targetCountry.code
    }
    const currentCountry = property.address.country
    const currentCountryCode = getCountryCode(currentCountry)
    console.log('codice dio boia', currentCountryCode)
    return (
        <Card className="m-5">
            <Card.Img variant="top" src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg" style={{ height: '100px' }} />
            <Card.Body style={{ height: ' 240px' }} className="d-flex flex-column justify-content-between">
                <Card.Title>{property.id}</Card.Title>
                <Card.Text>
                    {property.price} <br />
                    {property.address.country} <br />
                    <img src={`https://flagsapi.com/${currentCountryCode}/flat/16.png`} alt="country" /><br />
                    {property.address.city} <br />
                    {property.listingType}
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