import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getPropertiesAction } from "../redux/actions/properties"
import { Spinner, Button } from 'react-bootstrap';

const Properties = () => {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true);
    const properties = useSelector(state => state.properties)

    useEffect(() => {
        dispatch(getPropertiesAction())
            .then(() => {
                setTimeout(() => {
                    setIsLoading(false);
                }, 500); // Imposta il timeout a 500 millisecondi (mezzo secondo)
            })
            .catch(() => {
                setTimeout(() => {
                    setIsLoading(false);
                }, 500); // Anche in caso di errore, assicurati di impostare isLoading su false dopo il timeout
            });
    }, [dispatch])

    console.log("propertiessss", properties)
    console.log('content', properties.content)
    console.log('questo è content.content', properties.content.content)
    return (
        <div>
            <h2>Properties</h2>
            <div className="d-flex justify-content-center ">
                {isLoading &&
                    <Spinner animation="border" role="status" variant="danger">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>}
                {!isLoading && properties.content.content.map((property, i) => (
                    <div key={property.id} className="border border-5 border-danger m-5 p-3">
                        <h3>{property.id}</h3>
                        <p>Price: {property.price}</p>
                        <p>Country: {property.address.country}</p>
                        <p>Location: {property.address.city}</p>
                        <p className="danger">{property.listingType}</p>
                        <Button variant="warning">CIAO</Button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Properties