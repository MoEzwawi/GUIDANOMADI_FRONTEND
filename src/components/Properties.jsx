import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPropertiesAction } from "../redux/actions/properties";
import { Container, Row, Col, Pagination } from 'react-bootstrap';
import PropertyListing from "./PropertyListing";
import CustomSpinner from "./CustomSpinner";
import MyPropertyListing from "./MyPropertyListing";

const Properties = () => {
    const dispatch = useDispatch();
    const currentUserString = localStorage.getItem('currentUser');
    const currentUser = JSON.parse(currentUserString);
    const [isLoading, setIsLoading] = useState(true);
    const [dataLoaded, setDataLoaded] = useState(false)
    const [page, setPage] = useState(0)
    const properties = useSelector(state => state.properties);

    useEffect(() => {
        dispatch(getPropertiesAction(page))
            .then(() => {
                setTimeout(() => {
                    setIsLoading(false)
                    setDataLoaded(true)
                }, 500)
            })
            .catch(() => {
                setTimeout(() => {
                    setIsLoading(false)
                    setDataLoaded(false)
                }, 500)
            })
    }, [dispatch, page]);

    return (
        <div id="properties-page-root">
            {isLoading &&
                <CustomSpinner />}
            {!isLoading &&
                <Container className='mb-3 mt-1'>
                    <Row className='g-3 mb-5'>
                        {localStorage?.getItem('authToken') && dataLoaded && properties.content && properties.content.content && properties.content.content.map((property, i) => (
                            <Col xs={12} md={6} lg={4} xl={3} key={property.id}>
                                {currentUser.id === property.listedBy.id ?
                                    <MyPropertyListing property={property} /> :
                                    <PropertyListing property={property} />
                                }
                            </Col>
                        ))}
                    </Row>
                    <Row>
                        <Col xs={12} className="d-flex justify-content-center align-items-center">
                            {dataLoaded && properties.content && properties.content.totalPages !== null && (
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
                    </Row>
                </Container >}
        </div >
    );
}

export default Properties;