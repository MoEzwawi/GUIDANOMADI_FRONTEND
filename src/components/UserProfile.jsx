import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import PropertyListing from "./PropertyListing";

const UserProfile = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [myProperties, setMyProperties] = useState([]);
    const [myFavourites, setMyFavourites] = useState([]);
    const authToken = localStorage.getItem('authToken');

    useEffect(() => {
        const fetchUserData = async () => {
            const currentUserString = localStorage.getItem('currentUser');
            const parsedCurrentUser = JSON.parse(currentUserString);
            setCurrentUser(parsedCurrentUser);
        };

        const fetchMyProperties = async () => {
            try {
                const response = await fetch("http://localhost:3001/users/me/myProperties", {
                    headers: {
                        "Authorization": "Bearer " + authToken
                    }
                });
                const data = await response.json();
                setMyProperties(data);
            } catch (error) {
                console.error("Error fetching properties:", error);
            }
        };

        const fetchMyFavourites = async () => {
            try {
                const response = await fetch("http://localhost:3001/users/me/myFavourites", {
                    headers: {
                        "Authorization": "Bearer " + authToken
                    }
                });
                const data = await response.json();
                console.log("Data from fetchMyFavourites:", data);
                setMyFavourites(data);
            } catch (error) {
                console.error("Error fetching favourites:", error);
            }
        };

        fetchUserData();
        fetchMyProperties();
        fetchMyFavourites();
    }, [authToken]);

    return (
        <Container>
            <div className="user-profile">
                {currentUser && (
                    <div>
                        <img src={currentUser.avatarUrl} alt="User Avatar" />
                        <h2>{currentUser.firstName} {currentUser.lastName}</h2>
                        <p>Email: {currentUser.email}</p>
                        <p>Username: {currentUser.username}</p>
                        <p>Role: {currentUser.role}</p>
                    </div>
                )}
                {!currentUser && <p>No user data found.</p>}

                <Row className='g-3 mb-5'>
                    <h3>I miei annunci</h3>
                    <div className="property-listings">
                        {Array.isArray(myProperties) && myProperties.length > 0 && myProperties.map(property => (
                            <Col xs={12} md={6} lg={4} xl={3} key={property.id}>
                                <PropertyListing property={property} />
                            </Col>
                        ))}
                    </div>
                </Row>

                <Row className='g-3 mb-5'>
                    <h3>I miei preferiti</h3>
                    <div className="property-listings">
                        {Array.isArray(myFavourites) && myFavourites.length > 0 && myFavourites.map(property => (
                            <Col xs={12} md={6} lg={4} xl={3} key={property.id}>
                                <PropertyListing property={property} />
                            </Col>
                        ))}
                    </div>
                </Row>
            </div>
        </Container>
    );
}

export default UserProfile;
