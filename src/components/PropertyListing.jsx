import { Button, Card } from "react-bootstrap";
import { Star, StarFill } from "react-bootstrap-icons";
import { useEffect, useState } from "react";

import countries from '../assets/data/countries.js';

const PropertyListing = ({ property }) => {
    const [isFav, setIsFav] = useState(null);
    const [clicks, setClicks] = useState(0);

    useEffect(() => {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
            console.error('Authentication token not found');
            return;
        }

        const fetchFav = async () => {
            try {
                const response = await fetch(`http://localhost:3001/properties/${property.id}/fav`, {
                    headers: {
                        "Authorization": "Bearer " + authToken
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setIsFav(data);
                } else {
                    console.error('Failed to fetch favorite status');
                }
            } catch (error) {
                console.error('Error while fetching favorite status:', error);
            }
        };
        fetchFav();
    }, [property.id, clicks]);

    const changeFavStatus = async () => {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
            console.error('Authentication token not found');
            return;
        }

        try {
            const response = await fetch(`http://localhost:3001/properties/${property.id}/fav`, {
                method: 'PUT',
                headers: {
                    "Authorization": "Bearer " + authToken
                }
            });
            if (response.ok) {
                setClicks(clicks + 1);
            } else {
                console.error('Failed to update favorite status');
            }
        } catch (error) {
            console.error('Error while updating favorite status:', error);
        }
    };

    const getCountryCode = (countryName) => {
        const targetCountry = countries.find(country => country.name === countryName);
        return targetCountry ? targetCountry.code : null;
    };

    const currentCountryCode = getCountryCode(property.address.country);

    return (
        <Card className="m-5">
            <Card.Img variant="top" src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg" style={{ height: '100px' }} />
            <Card.Body style={{ height: '240px' }} className="d-flex flex-column justify-content-between">
                <div className="d-flex justify-content-around align-items-center">
                    <Card.Title>{property.id}</Card.Title>
                    {isFav !== null && (
                        <div className={isFav ? 'fs-2 text-warning' : 'fs-2 text-black'} onClick={changeFavStatus}>
                            {isFav ? <StarFill /> : <Star />}
                        </div>
                    )}
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
    );
};

export default PropertyListing;
