import { Card, Placeholder } from "react-bootstrap"
import guidanomadiPlaceholder from '../assets/images/placeholder.PNG'

const PlaceholderCard = () => {
    return (
        <Card className="m-5">
            <Card.Img variant="top" src={guidanomadiPlaceholder} style={{ height: '100px', overflow: 'hidden' }} />
            <Card.Body style={{ height: '240px' }} className="d-flex flex-column justify-content-between">
                <Placeholder as={Card.Title} animation="glow">
                    <Placeholder xs={6} />
                </Placeholder>
                <Placeholder as={Card.Text} animation="glow">
                    <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                    <Placeholder xs={6} /> <Placeholder xs={8} />
                </Placeholder>
                <Placeholder.Button variant="primary" xs={6} />
            </Card.Body>
        </Card>
    )
}

export default PlaceholderCard