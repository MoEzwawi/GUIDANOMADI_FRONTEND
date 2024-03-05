import { Card, Placeholder } from "react-bootstrap"
// eslint-disable-next-line no-unused-vars
import guidanomadiPlaceholder from '../assets/images/placeholder.PNG'
// eslint-disable-next-line no-unused-vars
import { houseDrawingByTheSea } from "../assets/images/houseDrawings"
import { houseDrawingWithGreenGarden } from "../assets/images/houseDrawings"

const PlaceholderCard = () => {
    return (
        <Card className="m-5">
            <Card.Img variant="top" src={houseDrawingWithGreenGarden} style={{ height: '140px', overflow: 'hidden', padding: '8px' }} />
            <Card.Body style={{ height: '200px' }} className="d-flex flex-column justify-content-between">
                <Placeholder as={Card.Title} animation="glow">
                    <Placeholder xs={6} />{'              '}<Placeholder xs={2} />
                    <br />
                    <Placeholder xs={6} />
                </Placeholder>
                <Placeholder as={Card.Text} animation="glow">
                    <Placeholder xs={4} />{' '}
                    <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                    <Placeholder xs={6} /> <Placeholder xs={8} />
                </Placeholder>
            </Card.Body>
        </Card>
    )
}

export default PlaceholderCard