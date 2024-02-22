import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPropertiesAction } from "../redux/actions/properties";
import { Spinner, Button, Card, ListGroup } from 'react-bootstrap';

const Properties = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const properties = useSelector(state => state.properties);

    useEffect(() => {
        dispatch(getPropertiesAction())
            .then(() => {
                setTimeout(() => {
                    setIsLoading(false);
                }, 500)
            })
            .catch(() => {
                setTimeout(() => {
                    setIsLoading(false);
                }, 500)
            });
    }, [dispatch]);

    return (
        <div>
            <h2>Properties</h2>
            <div className="d-flex justify-content-center ">
                {isLoading &&
                    <Spinner animation="border" role="status" variant="danger">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>}
                {!isLoading && localStorage?.getItem('authToken') && properties.content.content.map((property, i) => (
                    <Card key={property.id} className="m-5" style={{ width: '18rem' }}>
                        <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
                        <Card.Body>
                            <Card.Title>{property.id}</Card.Title>
                            <Card.Text>
                                Price: {property.price} <br />
                                Country: {property.address.country} <br />
                                Location: {property.address.city} <br />
                                Listing Type: {property.listingType}
                            </Card.Text>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroup.Item>Some additional info</ListGroup.Item>
                            <ListGroup.Item>Another piece of information</ListGroup.Item>
                        </ListGroup>
                        <Card.Body>
                            <Button variant="warning">CIAO</Button>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default Properties;