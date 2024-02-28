import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Placeholder, Pagination } from "react-bootstrap";
import PropertyListing from "./PropertyListing";
import { Link } from "react-router-dom";
import MyPropertyListing from "./MyPropertyListing";

const UserProfile = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [myProperties, setMyProperties] = useState(null);
    const [myPropertiesPage, setMyPropertiesPage] = useState(0)
    const [propertiesLoaded, setPropertiesLoaded] = useState(false)
    const [myFavourites, setMyFavourites] = useState(null);
    const [myFavouritesPage, setMyFavouritesPage] = useState(0)
    const [favouritesLoaded, setFavouritesLoaded] = useState(false)
    const [favouritesLoadedFirstTime, setFavouritesLoadedFirstTime] = useState(false)
    const authToken = localStorage.getItem('authToken');
    const fetchUserData = async () => {
        const currentUserString = localStorage.getItem('currentUser');
        const parsedCurrentUser = JSON.parse(currentUserString);
        setCurrentUser(parsedCurrentUser);
    };
    useEffect(() => {
        fetchUserData();
    }, []);
    useEffect(() => {

        const fetchMyProperties = async () => {
            try {
                const response = await fetch("http://localhost:3001/users/me/myProperties?size=2&page=" + myPropertiesPage, {
                    headers: {
                        "Authorization": "Bearer " + authToken
                    }
                });
                const data = await response.json();
                console.log('data from fetchmyproperties', data)
                setMyProperties(data);
                setTimeout(() => {
                    setPropertiesLoaded(true)
                }, 500);
            } catch (error) {
                console.error("Error fetching properties:", error);
            }
        };
        fetchMyProperties()
    }, [authToken, myPropertiesPage])

    useEffect(() => {
        const fetchMyFavourites = async () => {
            try {
                const response = await fetch("http://localhost:3001/users/me/myFavourites?size=2&page=" + myFavouritesPage, {
                    headers: {
                        "Authorization": "Bearer " + authToken
                    }
                });
                const data = await response.json();
                console.log("Data from fetchMyFavourites:", data);
                setMyFavourites(data);
                setTimeout(() => {
                    setFavouritesLoadedFirstTime(true)
                    setFavouritesLoaded(true)
                }, 500);
            } catch (error) {
                console.error("Error fetching favourites:", error);
            }
        };
        fetchMyFavourites();
    }, [authToken, myFavouritesPage]);

    return (
        <Container>
            {currentUser && (
                <Row className='my-3 align-items-center'>
                    <Col xs={12} md={6} lg={3} className="d-flex justify-content-center align-items-center">
                        <img src={currentUser.avatarUrl} alt="User Avatar" height='100px' width='100px' className="rounded-circle" />
                    </Col>
                    <Col xs={12} md={6} lg={3}>
                        <h2>{currentUser.firstName} {currentUser.lastName}</h2>
                    </Col>
                    <Col xs={12} md={6} lg={3}>
                        <p>Email: {currentUser.email}</p>
                        <p>Username: {currentUser.username}</p>
                    </Col>
                    <Col xs={12} md={6} lg={3}>
                        <Link to='/newProperty'><Button variant="primary">Pubblica un nuovo annuncio</Button></Link>
                    </Col>
                </Row>
            )}
            {!currentUser && <p>No user data found.</p>}
            <Row className='g-3 mb-5'>
                <h3>I miei preferiti</h3>
                {favouritesLoaded ? (myFavourites.content.length > 0 ? (myFavourites.content.map(property => (
                    <Col xs={12} md={6} lg={4} xl={3} key={property.id}>
                        <PropertyListing property={property} />
                    </Col>
                ))) :
                    <Col xs={12} md={6} lg={4} xl={3}>
                        <h4>Nessun annuncio tra i tuoi preferiti</h4>
                        <Link to='/properties'><Button variant="primary">Scopri gli ultimi annunci</Button></Link>
                    </Col>) :
                    <Col xs={12} md={6} lg={4} xl={3}>
                        <Placeholder animation="glow" className='text-body-tertiary '>
                            <Placeholder xs={12} size="lg" />
                            <Placeholder xs={12} />
                            <Placeholder xs={12} size="sm" />
                            <Placeholder xs={12} size="xs" />
                        </Placeholder>
                    </Col>}
            </Row>
            <Row>
                <Col xs={12} className="d-flex justify-content-center align-items-center">
                    {favouritesLoadedFirstTime && (
                        <Pagination>
                            {!myFavourites.first &&
                                <>
                                    <Pagination.First onClick={() => {
                                        setFavouritesLoaded(false)
                                        setMyFavouritesPage(0)
                                    }} />
                                    {myFavourites.number !== 1 &&
                                        <>
                                            <Pagination.Prev onClick={() => {
                                                setFavouritesLoaded(false)
                                                setMyFavouritesPage(myFavouritesPage - 1)
                                            }} />
                                            <Pagination.Ellipsis />
                                        </>}
                                    <Pagination.Item onClick={() => {
                                        setFavouritesLoaded(false)
                                        setMyFavouritesPage(myFavouritesPage - 1)
                                    }}>
                                        {myFavouritesPage}
                                    </Pagination.Item>
                                </>
                            }

                            <Pagination.Item active>
                                {myFavouritesPage + 1}
                            </Pagination.Item>

                            {!myFavourites.last &&
                                <>
                                    <Pagination.Item onClick={() => {
                                        setFavouritesLoaded(false)
                                        setMyFavouritesPage(myFavouritesPage + 1)
                                    }}>
                                        {myFavouritesPage + 2}
                                    </Pagination.Item>
                                    {myFavourites.number !== myFavourites.totalPages - 2 &&
                                        <>
                                            <Pagination.Ellipsis />
                                            <Pagination.Next onClick={() => {
                                                setFavouritesLoaded(false)
                                                setMyFavouritesPage(myFavouritesPage + 1)
                                            }} />
                                        </>}
                                    <Pagination.Last onClick={() => {
                                        setFavouritesLoaded(false)
                                        setMyFavouritesPage(myFavourites.totalPages - 1)
                                    }} />
                                </>
                            }
                        </Pagination>
                    )}
                </Col>
            </Row>
            <Row className='g-3 mb-5'>
                <h3>I miei annunci</h3>
                {propertiesLoaded ? (myProperties.content.length > 0 ? (myProperties.content.map(property => (
                    <Col xs={12} md={6} lg={4} xl={3} key={property.id}>
                        <MyPropertyListing property={property} />
                    </Col>
                ))) :
                    <div className="mx-auto">
                        <h4>Non hai ancora pubblicato un annuncio</h4>
                        <Link to='/newProperty'><Button variant="primary">Pubblica il tuo prossimo annuncio</Button></Link>
                    </div>) : <Placeholder animation="glow" className='text-body-tertiary '>
                    <Placeholder xs={12} size="lg" />
                    <Placeholder xs={12} />
                    <Placeholder xs={12} size="sm" />
                    <Placeholder xs={12} size="xs" />
                </Placeholder>}
            </Row>
        </Container>
    );
}

export default UserProfile;