import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPropertiesAction } from "../redux/actions/properties";
import { Container, Row, Col, Pagination, Form, Button } from 'react-bootstrap';
import countries from '../assets/data/countries.js';
import PropertyListing from "./PropertyListing";
import CustomSpinner from "./CustomSpinner";
import MyPropertyListing from "./MyPropertyListing";
import { useLocation } from "react-router-dom";

const Properties = () => {
    const location = useLocation()
    const queryParameters = new URLSearchParams(location.search)
    const cityParameter = queryParameters.get('city')
    const dispatch = useDispatch();
    const [queryParametersChecked, setQueryParametersChecked] = useState(false)
    const [listingDeleted, setListingDeleted] = useState(0)
    const [quickNDrity, setQuickNDirty] = useState(true)
    const currentUserString = localStorage.getItem('currentUser')
    const currentUser = JSON.parse(currentUserString);
    const [isLoading, setIsLoading] = useState(true);
    const [dataLoaded, setDataLoaded] = useState(false)
    const [showPagination, setShowPagination] = useState(false)
    const [page, setPage] = useState(0)
    const properties = useSelector(state => state.properties)

    const listingHasBeenDeleted = () => {
        setListingDeleted(listingDeleted + 1)
    }
    const [queryParams, setQueryParams] = useState({
        country: "",
        city: "",
        type: "",
        orderBy: ""
    })

    const [queryParamsString, setQueryParamsString] = useState("")

    const handleInputChange = (category, value) => {
        setQueryParams(prevState => ({
            ...prevState,
            [category]: value
        }))
    }

    const handleSubmit = (e) => {
        if (e) {
            e.preventDefault()
        }
        setPage(0)
        const countryString = queryParams.country !== "" ? `&country=${queryParams.country}` : ""
        const cityString = queryParams.city !== "" ? `&city=${queryParams.city}` : ""
        const typeString = queryParams.type !== "" ? `&listingType=${queryParams.type}` : ""
        const orderString = queryParams.orderBy !== "" ? `&orderBy=${queryParams.orderBy}` : ""
        const finalString = countryString + cityString + typeString + orderString
        setQueryParamsString(finalString)
    }

    useEffect(() => {
        if (cityParameter !== null) {
            let countryParameter = ''
            switch (cityParameter) {
                case 'Dubai':
                    countryParameter = 'Emirati Arabi Uniti'
                    break;
                case "Bali":
                    countryParameter = 'Indonesia'
                    break;
                default:
                    countryParameter = 'Spagna'
            }
            setQueryParams({
                country: countryParameter,
                city: cityParameter,
                type: "",
                orderBy: ""
            })
            setQueryParamsString('&country=' + countryParameter + '&city=' + cityParameter)
            setQueryParametersChecked(true)
        } else {
            setQueryParams({
                country: "",
                city: "",
                type: "",
                orderBy: ""
            })
            setQueryParamsString("")
            setQueryParametersChecked(true)
        }
    }, [cityParameter])

    useEffect(() => {
        if (queryParametersChecked) {
            dispatch(getPropertiesAction(page, queryParamsString))
                .then(() => {
                    setTimeout(() => {
                        setIsLoading(false)
                        setDataLoaded(true)
                        setTimeout(() => {
                            setShowPagination(true)
                        }, 300)
                    }, 500)
                })
                .catch(() => {
                    setTimeout(() => {
                        setIsLoading(false)
                        setDataLoaded(false)
                    }, 500)
                })
        }
    }, [dispatch, page, listingDeleted, queryParamsString, quickNDrity, queryParametersChecked])

    return (
        <div>
            <header>
                <div id="properties-page-title" className="bg-primary text-dark rounded-3 p-4">
                    <h1>Trova la tua casa da sogno tra centinaia di annunci immobiliari pensati per nomadi digitali come te 🛩️💻🏡</h1>
                </div>
                <Form onSubmit={handleSubmit}>
                    <Row className='g-4 mt-3 mb-2 mx-3 d-flex justify-content-center align-items-end'>
                        <Col xs={12} sm={6} md={3}>
                            <Form.Group>
                                <Form.Label>Nazione:</Form.Label>
                                <Form.Select value={queryParams.country}
                                    onChange={(e) => handleInputChange('country', e.target.value)}>
                                    <option value="">Qualsiasi</option>
                                    {countries.map((country, index) => (
                                        <option key={index} value={country.name}>{country.name}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col xs={12} sm={6} md={3}>
                            <Form.Group>
                                <Form.Label>Città:</Form.Label>
                                <Form.Control placeholder="Inserisci città..." value={queryParams.city}
                                    onChange={(e) => handleInputChange('city', e.target.value)} />
                            </Form.Group>
                        </Col>
                        <Col xs={12} sm={6} md={3}>
                            <Form.Group>
                                <Form.Label>Tipo:</Form.Label>
                                <Form.Select value={queryParams.type}
                                    onChange={(e) => handleInputChange('type', e.target.value)}>
                                    <option value="">Qualsiasi</option>
                                    <option value="FOR_RENT">AFFITTO</option>
                                    <option value="FOR_SALE">VENDITA</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col xs={12} sm={6} md={3}>
                            <Form.Label>Ordina per:</Form.Label>
                            <Form.Select value={queryParams.orderBy}
                                onChange={(e) => handleInputChange('orderBy', e.target.value)}>
                                <option value="">Prime disponibilità</option>
                                <option value="price">Prezzo: in ordine crescente</option>
                                <option value="price_desc">Prezzo: in ordine decrescente</option>
                                <option value="sizeSqMeters">Metratura: in ordine crescente</option>
                                <option value="sizeSqMeters_desc">Metratura: in ordine decrescente</option>
                            </Form.Select>
                        </Col>
                    </Row>
                    <div className="ms-4 mt-4">
                        <Button type="submit" variant="secondary" id='filters-button' style={{ marginLeft: '6px' }}>Trova</Button>
                    </div>
                </Form>
            </header>
            <div id="properties-page-root">
                {isLoading &&
                    <CustomSpinner />}
                {!isLoading &&
                    <Container className='mb-3 mt-1'>
                        <Row className='g-3 mb-5'>
                            {localStorage?.getItem('authToken') && dataLoaded && properties.content && properties.content.content && properties.content.content.map((property, i) => (
                                <Col xs={12} md={6} lg={4} xl={3} key={property.id}>
                                    {currentUser.id === property.listedBy.id ?
                                        <MyPropertyListing property={property} listingHasBeenDeleted={listingHasBeenDeleted} /> :
                                        <PropertyListing property={property} />
                                    }
                                </Col>
                            ))}
                        </Row>
                        {properties.content.numberOfElements !== 0 ?
                            (<Row>
                                <Col xs={12} className="d-flex justify-content-center align-items-center">
                                    {dataLoaded && properties.content && properties.content.totalPages !== null && showPagination && (
                                        <Pagination>
                                            {!properties.content.first &&
                                                <>
                                                    <Pagination.First onClick={() => {
                                                        setIsLoading(true)
                                                        setPage(0)
                                                    }} />
                                                    {properties.content.number !== 1 &&
                                                        <>
                                                            <Pagination.Prev onClick={() => {
                                                                setIsLoading(true)
                                                                setPage(page - 1)
                                                            }} />
                                                            <Pagination.Ellipsis />
                                                        </>}
                                                    <Pagination.Item onClick={() => {
                                                        setIsLoading(true)
                                                        setPage(page - 1)
                                                    }}>
                                                        {page}
                                                    </Pagination.Item>
                                                </>
                                            }

                                            <Pagination.Item active>
                                                {page + 1}
                                            </Pagination.Item>

                                            {!properties.content.last &&
                                                <>
                                                    <Pagination.Item onClick={() => {
                                                        setIsLoading(true)
                                                        setPage(page + 1)
                                                    }}>
                                                        {page + 2}
                                                    </Pagination.Item>
                                                    {properties.content.number !== properties.content.totalPages - 2 &&
                                                        <>
                                                            <Pagination.Ellipsis />
                                                            <Pagination.Next onClick={() => {
                                                                setIsLoading(true)
                                                                setPage(page + 1)
                                                            }} />
                                                        </>}
                                                    <Pagination.Last onClick={() => {
                                                        setIsLoading(true)
                                                        setPage(properties.content.totalPages - 1)
                                                    }} />
                                                </>
                                            }
                                        </Pagination>
                                    )}
                                </Col>
                            </Row>) :
                            <Col xs={12} md={6}>
                                <h4>Ops! Non abbiamo trovato annunci che corrispondano ai tuoi parametri di ricerca.</h4>
                                <Button variant="primary" onClick={() => {
                                    setQueryParams({
                                        country: "",
                                        city: "",
                                        type: "",
                                        orderBy: ""
                                    })
                                    setQueryParamsString("")
                                    setIsLoading(true)
                                    setQuickNDirty(!quickNDrity)
                                }}>Scopri tutti gli annunci</Button>
                            </Col>}
                    </Container >}
            </div >
        </div>
    );
}

export default Properties;