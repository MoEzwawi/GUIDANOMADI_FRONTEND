import { Card } from "react-bootstrap";
import { Star, StarFill } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import countries from '../assets/data/countries.js';
import { Link } from "react-router-dom";
import { houseDrawingWithGreenGarden } from "../assets/images/houseDrawings"


const PropertyListing = ({ property }) => {
    const [isFav, setIsFav] = useState(null);
    const [clicks, setClicks] = useState(0);
    const [thumbnailUrl, setThumbnailUrl] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const authToken = localStorage.getItem('authToken')

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

    useEffect(() => {
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
    }, [property.id, clicks, authToken]);

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

    const currentCountryCode = getCountryCode(property.address.country)

    const significantSubstring = (string) => {
        const maxLength = 20
        if (string.length > maxLength) {
            return string.substring(0, maxLength) + '...'
        } else {
            return string
        }
    }

    return (
        <Card className="m-5">
            {isLoading && <Card.Img variant="top" src={houseDrawingWithGreenGarden} style={{ height: '140px' }} />}
            {!isLoading && <Card.Img variant="top" src={thumbnailUrl ? thumbnailUrl : "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg"} style={{ height: '140px' }} />}
            <Card.Body style={{ height: '200px', overflow: 'hidden' }} className="d-flex flex-column justify-content-between">
                <div className="d-flex justify-content-around align-items-center">
                    <Link to={`/property/${property.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                        <Card.Title className="property-card-title">{property.title !== null ? significantSubstring(property.title) : 'Annuncio immobiliare'}</Card.Title>
                    </Link>
                    {isFav !== null && (
                        <div className={isFav ? 'fs-2 text-warning' : 'fs-2 text-black'}
                            style={{ cursor: 'pointer' }}
                            onClick={changeFavStatus}>
                            {isFav ? <StarFill /> : <Star />}
                        </div>
                    )}
                </div>
                <Card.Text>
                    {property.price} {property.listingType === 'FOR_SALE' ? '€' : '€ / mese'}<br />
                    <div className="d-flex justify-content-between align-items-center">
                        {property.address.country}
                        <img src={`https://flagsapi.com/${currentCountryCode}/flat/32.png`} alt="country" />
                    </div>
                    {property.address.city} <br />
                    {property.listingType === 'FOR_SALE' ? 'In vendita' : 'In affitto'}
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default PropertyListing;
