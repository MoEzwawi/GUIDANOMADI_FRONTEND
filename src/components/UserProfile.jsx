import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Placeholder, Pagination } from "react-bootstrap";
import PropertyListing from "./PropertyListing";
import { Link } from "react-router-dom";
import MyPropertyListing from "./MyPropertyListing";
import PlaceholderCard from "./PlaceholderCard";
import { PencilSquare, PlusLg } from "react-bootstrap-icons";
import UpdateUserEmailModal from "./UpdateUserEmailModal";
import UpdateNameAndSurnameModal from "./UpdateNameAndSurnameModal";
import UpdateProfilePicModal from "./UpdateProfilePicModal";

const UserProfile = () => {
    const [listingDeleted, setListingDeleted] = useState(0)
    const [currentUser, setCurrentUser] = useState(null);
    const [shrinkTitle, setShrinkTitle] = useState(false)
    useEffect(() => {
        const h1title = document.getElementById("user-page-title")
        if (currentUser) {
            const titleContent = h1title.textContent
            const titleLength = titleContent.length
            if (titleLength > 15) {
                setShrinkTitle(true)
            }
        }
    }, [currentUser])
    const [myProperties, setMyProperties] = useState(null);
    const [myPropertiesPage, setMyPropertiesPage] = useState(0)
    const [propertiesLoaded, setPropertiesLoaded] = useState(false)
    const [propertiesLoadedFirstTime, setPropertiesLoadedFirstTime] = useState(false)
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
    const listingHasBeenDeleted = () => {
        if (myProperties.numberOfElements === 1 && myPropertiesPage > 0) {
            setMyPropertiesPage(myPropertiesPage - 1)
        }
        setListingDeleted(listingDeleted + 1)
    }
    useEffect(() => {

        const fetchMyProperties = async () => {
            try {
                const response = await fetch("http://localhost:3001/users/me/myProperties?size=4&page=" + myPropertiesPage, {
                    headers: {
                        "Authorization": "Bearer " + authToken
                    }
                });
                const data = await response.json();
                console.log('data from fetchmyproperties', data)
                setMyProperties(data);
                setTimeout(() => {
                    setPropertiesLoadedFirstTime(true)
                    setPropertiesLoaded(true)
                }, 500);
            } catch (error) {
                console.error("Error fetching properties:", error);
            }
        };
        fetchMyProperties()
    }, [authToken, myPropertiesPage, listingDeleted])

    useEffect(() => {
        const fetchMyFavourites = async () => {
            try {
                const response = await fetch("http://localhost:3001/users/me/myFavourites?size=4&page=" + myFavouritesPage, {
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
    }, [authToken, myFavouritesPage])

    const [isMouseDown, setIsMouseDown] = useState(false)
    const handleMouseDown = () => {
        setIsMouseDown(true);
    }

    const handleMouseUp = () => {
        setIsMouseDown(false);
    }
    const [isHovered, setIsHovered] = useState(false)
    const handleMouseEnter = () => {
        setIsHovered(true)
    }
    const handleMouseLeave = () => {
        setIsHovered(false)
    }

    const [showUpdateProfilePicModal, setShowUpdateProfilePicModal] = useState(false)
    const [showUpdateEmailModal, setShowUpdateEmailModal] = useState(false)
    const [showUpdateNameModal, setShowUpdateNameModal] = useState(false)

    const handleShowEmailModal = () => {
        setShowUpdateEmailModal(true)
    }

    const handleShowNameModal = () => {
        setShowUpdateNameModal(true)
    }

    const handleShowProfilePicModal = () => {
        setShowUpdateProfilePicModal(true)
    }

    return (
        <Container>
            {currentUser && (
                <Row className='my-4 mx-3 align-items-center bg-primary rounded-3 p-4'>
                    <Col xs={12} md={3} className="d-flex justify-content-center align-items-center">
                        <div className="rounded-circle" id="profile-pic-container" onMouseDown={handleMouseDown}
                            onMouseUp={handleMouseUp} onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave} onClick={handleShowProfilePicModal}>
                            {isHovered && <PlusLg id="plus-icon" className="text-white" style={{ height: '50px', width: '50px' }} />}
                            <img src={currentUser.avatarUrl} alt="User Avatar" id='user-profile-pic' style={{
                                transition: 'transform 0.2s',
                                transform: isMouseDown ? 'scale(0.95)' : 'scale(1)'
                            }} />
                        </div>
                    </Col>
                    <Col xs={12} md={6} className="d-flex flex-column justify-content-evenly align-items-start">
                        <div className="d-flex align-items-end">
                            <h1 id="user-page-title" className={shrinkTitle ? "shrink-title-font-size" : "normal-title-font-size"}><span className="text-black">{currentUser.firstName.toUpperCase()}</span><span className="text-white">{currentUser.lastName.toUpperCase()}</span></h1>
                            <PencilSquare id="pencil-icon-name" onClick={handleShowNameModal} />
                        </div>
                        <div className="d-flex align-items-end">
                            <p style={{ fontSize: '1.2em' }}>{currentUser.email}</p>
                            <PencilSquare id="pencil-icon-email" onClick={handleShowEmailModal} />
                        </div>
                    </Col>
                    <Col xs={12} md={3}>
                        <Link to='/newProperty'><Button variant="dark">Pubblica un nuovo annuncio</Button></Link>
                    </Col>
                </Row>
            )}
            {!currentUser && <p>No user data found.</p>}
            <Row className='g-3 mb-5'>
                <h3 className="mt-4">I miei preferiti</h3>
                {favouritesLoaded ? (myFavourites.content.length > 0 ? (myFavourites.content.map(property => (
                    <Col xs={12} md={6} lg={4} xl={3} key={property.id}>
                        <PropertyListing property={property} />
                    </Col>
                ))) :
                    <Col xs={12} md={6}>
                        <h4>Nessun annuncio tra i tuoi preferiti</h4>
                        <Link to='/properties'><Button variant="primary">Scopri gli ultimi annunci</Button></Link>
                    </Col>) : (!favouritesLoadedFirstTime ? (
                        <Placeholder animation="glow" className='text-body-tertiary '>
                            <Placeholder xs={12} size="lg" />
                            <Placeholder xs={12} />
                            <Placeholder xs={12} size="sm" />
                            <Placeholder xs={12} size="xs" />
                        </Placeholder>) :
                        (<>
                            <Col xs={12} md={6} lg={4} xl={3}>
                                <PlaceholderCard />
                            </Col>
                            <Col xs={12} md={6} lg={4} xl={3} className="d-none d-md-block">
                                <PlaceholderCard />
                            </Col>
                            <Col xs={12} md={6} lg={4} xl={3} className="d-none d-lg-block">
                                <PlaceholderCard />
                            </Col>
                            <Col xs={12} md={6} lg={4} xl={3} className="d-none d-xl-block">
                                <PlaceholderCard />
                            </Col>
                        </>
                        ))
                }
            </Row>
            {favouritesLoadedFirstTime && myFavourites.content.length > 0 &&
                (<Row>
                    <Col xs={12} className="d-flex justify-content-center align-items-center">
                        {favouritesLoadedFirstTime && (
                            <Pagination>
                                {!myFavourites.first &&
                                    <>
                                        {myFavourites.totalPages > 2 &&
                                            <Pagination.First onClick={() => {
                                                setFavouritesLoaded(false)
                                                setMyFavouritesPage(0)
                                            }} />}
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
                                        {myFavourites.totalPages > 2 &&
                                            <Pagination.Last onClick={() => {
                                                setFavouritesLoaded(false)
                                                setMyFavouritesPage(myFavourites.totalPages - 1)
                                            }} />}
                                    </>
                                }
                            </Pagination>
                        )}
                    </Col>
                </Row>)}
            <Row className='g-3 mb-5'>
                <h3>I miei annunci</h3>
                {propertiesLoaded ? (myProperties.content.length > 0 ? (myProperties.content.map(property => (
                    <Col xs={12} md={6} lg={4} xl={3} key={property.id}>
                        <MyPropertyListing property={property} listingHasBeenDeleted={listingHasBeenDeleted} />
                    </Col>
                ))) :
                    <Col xs={12} md={6}>
                        <h4>Non hai ancora pubblicato un annuncio</h4>
                        <Link to='/newProperty'><Button variant="primary">Pubblica il tuo prossimo annuncio</Button></Link>
                    </Col>) : (!propertiesLoadedFirstTime ? (
                        <Placeholder animation="glow" className='text-body-tertiary '>
                            <Placeholder xs={12} size="lg" />
                            <Placeholder xs={12} />
                            <Placeholder xs={12} size="sm" />
                            <Placeholder xs={12} size="xs" />
                        </Placeholder>) :
                        (<>
                            <Col xs={12} md={6} lg={4} xl={3}>
                                <PlaceholderCard />
                            </Col>
                            <Col xs={12} md={6} lg={4} xl={3} className="d-none d-md-block">
                                <PlaceholderCard />
                            </Col>
                            <Col xs={12} md={6} lg={4} xl={3} className="d-none d-lg-block">
                                <PlaceholderCard />
                            </Col>
                            <Col xs={12} md={6} lg={4} xl={3} className="d-none d-xl-block">
                                <PlaceholderCard />
                            </Col>
                        </>
                        ))
                }
            </Row>
            {propertiesLoadedFirstTime && myProperties.content.length > 0 &&
                (<Row>
                    <Col xs={12} className="d-flex justify-content-center align-items-center">
                        {propertiesLoadedFirstTime && (
                            <Pagination>
                                {!myProperties.first &&
                                    <>
                                        {myProperties.totalPages > 2 &&
                                            <Pagination.First onClick={() => {
                                                setPropertiesLoaded(false)
                                                setMyPropertiesPage(0)
                                            }} />}
                                        {myProperties.number !== 1 &&
                                            <>
                                                <Pagination.Prev onClick={() => {
                                                    setPropertiesLoaded(false)
                                                    setMyPropertiesPage(myPropertiesPage - 1)
                                                }} />
                                                <Pagination.Ellipsis />
                                            </>}
                                        <Pagination.Item onClick={() => {
                                            setPropertiesLoaded(false)
                                            setMyPropertiesPage(myPropertiesPage - 1)
                                        }}>
                                            {myPropertiesPage}
                                        </Pagination.Item>
                                    </>
                                }

                                <Pagination.Item active>
                                    {myPropertiesPage + 1}
                                </Pagination.Item>

                                {!myProperties.last &&
                                    <>
                                        <Pagination.Item onClick={() => {
                                            setPropertiesLoaded(false)
                                            setMyPropertiesPage(myPropertiesPage + 1)
                                        }}>
                                            {myPropertiesPage + 2}
                                        </Pagination.Item>
                                        {myProperties.number !== myProperties.totalPages - 2 &&
                                            <>
                                                <Pagination.Ellipsis />
                                                <Pagination.Next onClick={() => {
                                                    setPropertiesLoaded(false)
                                                    setMyPropertiesPage(myPropertiesPage + 1)
                                                }} />
                                            </>}
                                        {myProperties.totalPages > 2 &&
                                            <Pagination.Last onClick={() => {
                                                setPropertiesLoaded(false)
                                                setMyPropertiesPage(myProperties.totalPages - 1)
                                            }} />}
                                    </>
                                }
                            </Pagination>
                        )}
                    </Col>
                </Row>)}
            {currentUser && <UpdateNameAndSurnameModal showUpdateNameModal={showUpdateNameModal} setShowUpdateNameModal={setShowUpdateNameModal} userfirstName={currentUser.firstName} userLastName={currentUser.lastName} />}
            {currentUser &&
                <UpdateUserEmailModal showUpdateEmailModal={showUpdateEmailModal}
                    setShowUpdateEmailModal={setShowUpdateEmailModal}
                    userEmail={currentUser.email} />}
            {currentUser && <UpdateProfilePicModal showUpdateProfilePicModal={showUpdateProfilePicModal} setShowUpdateProfilePicModal={setShowUpdateProfilePicModal} />}
        </Container>
    );
}

export default UserProfile;
