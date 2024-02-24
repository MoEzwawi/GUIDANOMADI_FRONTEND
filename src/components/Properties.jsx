import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPropertiesAction } from "../redux/actions/properties";
import { Spinner, Container, Row, Col, Pagination } from 'react-bootstrap';
import PropertyListing from "./PropertyListing";

const Properties = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [dataLoaded, setDataLoaded] = useState(false)
    const [page, setPage] = useState(0)
    const properties = useSelector(state => state.properties);

    useEffect(() => {
        dispatch(getPropertiesAction(page))
            .then(() => {
                setTimeout(() => {
                    setIsLoading(false);
                    setDataLoaded(true)
                }, 500)
            })
            .catch(() => {
                setTimeout(() => {
                    setIsLoading(false);
                    setDataLoaded(false)
                }, 500)
            });
    }, [dispatch, page]);

    return (
        <div id="properties-page-root">
            {isLoading &&
                <Spinner animation="grow" role="status" variant="primary">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>}
            <Container className='mb-5 mt-3'>
                <Row className='g-3 mb-5'>
                    {!isLoading && localStorage?.getItem('authToken') && dataLoaded && properties.content && properties.content.content && properties.content.content.map((property, i) => (
                        <Col xs={12} md={6} lg={4} xl={3} key={property.id}>
                            <PropertyListing property={property} />
                        </Col>
                    ))}
                </Row>
                <Row>
                    {!isLoading &&
                        <Col xs={12} className="d-flex justify-content-center align-items-center">
                            <Pagination>
                                <Pagination.Item key={1} onClick={() => {
                                    setPage(0)
                                }}>1</Pagination.Item>
                                <Pagination.Item key={2} onClick={() => {
                                    setPage(1)
                                }}>2</Pagination.Item>
                                <Pagination.Item key={3} onClick={() => {
                                    setPage(2)
                                }}>3</Pagination.Item>
                                <Pagination.Item key={4} onClick={() => {
                                    setPage(3)
                                }}>4</Pagination.Item>
                                <Pagination.Item key={5} onClick={() => {
                                    setPage(4)
                                }}>5</Pagination.Item>
                            </Pagination>
                        </Col>}
                </Row>
            </Container>
        </div>
    );
}

export default Properties;