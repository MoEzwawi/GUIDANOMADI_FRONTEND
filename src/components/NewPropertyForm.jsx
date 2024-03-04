import { useState } from "react";
import { useDispatch } from "react-redux";
import { newPropertyAction } from "../redux/actions/newProperty";
import { Form, Button, Alert } from "react-bootstrap";
import countries from '../assets/data/countries.js';
import { useNavigate } from "react-router-dom";
import HomeMadeSpinner from "./HomeMadeSpinner.jsx";

const NewPropertyForm = () => {
    const [submitted, setSubmitted] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [data, setData] = useState({
        listingType: "",
        street: "",
        streetNumber: "",
        zipCode: "",
        city: "",
        provinceOrState: "",
        country: ""
    });
    const [errors, setErrors] = useState({
        listingType: "",
        street: "",
        streetNumber: "",
        zipCode: "",
        city: "",
        provinceOrState: "",
        country: "",
        submit: ""
    });
    const [userWroteSth, setUserWroteSth] = useState(false);

    const handleInputChange = (category, value) => {
        setData(prevState => ({
            ...prevState,
            [category]: value
        }));
        setErrors(prevState => ({
            ...prevState,
            [category]: ""
        }));
        setUserWroteSth(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (userWroteSth && !submitted) {
            let isValid = validateForm();
            if (isValid) {
                try {
                    const responseObject = await dispatch(newPropertyAction(data));
                    console.log('oggetto di risposta', responseObject)
                    const id = responseObject.propertyId
                    console.log("l'id che come param", id)
                    setSubmitted(true)
                    setTimeout(() => {
                        setData({
                            listingType: "",
                            street: "",
                            streetNumber: "",
                            zipCode: "",
                            city: "",
                            provinceOrState: "",
                            country: ""
                        });
                        navigate(`/setPropertyDetails/${id}`)
                    }, 500);
                } catch (error) {
                    console.log(error)
                    setErrors({ submit: '⚠️ Errore nel caricamento dei dati' })
                }
            }
        }
    };

    const validateForm = () => {
        let isValid = true;
        let newErrors = {};

        if (data.listingType.trim() === "") {
            newErrors.listingType = "⚠️ Il tipo di annuncio è obbligatorio";
            isValid = false;
        }

        if (data.street.trim() === "") {
            newErrors.street = "⚠️ Campo obbligatorio";
            isValid = false;
        }
        const streetNumberRegex = /\d+[a-zA-Z]?/;
        if (!streetNumberRegex.test(data.streetNumber)) {
            newErrors.streetNumber = "⚠️ Inserisci un numero civico";
            isValid = false;
        }
        const zipRegex = /^\d{5}$/;
        if (!zipRegex.test(data.zipCode)) {
            newErrors.zipCode = "⚠️ Inserisci un CAP valido";
            isValid = false;
        }

        if (data.city.trim() === "") {
            newErrors.city = "⚠️ Campo obbligatorio";
            isValid = false;
        }

        if (data.provinceOrState.trim() === "") {
            newErrors.provinceOrState = "⚠️ Campo obbligatorio";
            isValid = false;
        }

        if (data.country.trim() === "") {
            newErrors.country = "⚠️ Campo obbligatorio";
            isValid = false;
        }

        setErrors(newErrors);

        return isValid;
    };


    return (
        <div className="p-5 bg-primary m-5 mx-3 mx-md-auto rounded" style={{ maxWidth: '576px' }}>
            <h1 className="pb-4 text-center">
                <span className="text-dark">NUOVO</span>
                <span className="text-light"> ANNUNCIO</span>
            </h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="listingType" className="mb-3">
                    <Form.Label>Tipo di annuncio:</Form.Label>
                    <Form.Select value={data.listingType} onChange={(e) => handleInputChange('listingType', e.target.value)}>
                        <option value="">Seleziona il tipo di annuncio</option>
                        <option value="FOR_RENT">AFFITTO</option>
                        <option value="FOR_SALE">VENDITA</option>
                    </Form.Select>
                    {errors.listingType && <Alert variant="danger">{errors.listingType}</Alert>}
                </Form.Group>
                <Form.Group controlId="street" className="mb-3">
                    <Form.Label>Nome della via:</Form.Label>
                    <Form.Control type="text" value={data.street} onChange={(e) => handleInputChange('street', e.target.value)} />
                    {errors.street && <Alert variant="danger">{errors.street}</Alert>}
                </Form.Group>
                <Form.Group controlId="streetNumber" className="mb-3">
                    <Form.Label>Numero civico:</Form.Label>
                    <Form.Control type="text" value={data.streetNumber} onChange={(e) => handleInputChange('streetNumber', e.target.value)} />
                    {errors.streetNumber && <Alert variant="danger">{errors.streetNumber}</Alert>}
                </Form.Group>
                <Form.Group controlId="zipCode" className="mb-3">
                    <Form.Label>Codice postale:</Form.Label>
                    <Form.Control type="text" value={data.zipCode} onChange={(e) => handleInputChange('zipCode', e.target.value)} />
                    {errors.zipCode && <Alert variant="danger">{errors.zipCode}</Alert>}
                </Form.Group>
                <Form.Group controlId="city" className="mb-3">
                    <Form.Label>Città:</Form.Label>
                    <Form.Control type="text" value={data.city} onChange={(e) => handleInputChange('city', e.target.value)} />
                    {errors.city && <Alert variant="danger">{errors.city}</Alert>}
                </Form.Group>
                <Form.Group controlId="provinceOrState" className="mb-3">
                    <Form.Label>Provincia/Regione:</Form.Label>
                    <Form.Control type="text" value={data.provinceOrState} onChange={(e) => handleInputChange('provinceOrState', e.target.value)} />
                    {errors.provinceOrState && <Alert variant="danger">{errors.provinceOrState}</Alert>}
                </Form.Group>
                <Form.Group controlId="country" className="mb-3">
                    <Form.Label>Paese:</Form.Label>
                    <Form.Select
                        value={data.country}
                        onChange={(e) => handleInputChange('country', e.target.value)}
                    >
                        <option value="">Seleziona il paese</option>
                        {countries.map((country, index) => (
                            <option key={index} value={country.name}>{country.name}</option>
                        ))}
                    </Form.Select>
                    {errors.country && <Alert variant="danger">{errors.country}</Alert>}
                </Form.Group>
                {errors.submit && <Alert variant="danger">{errors.submit}</Alert>}
                <Button variant="dark" type="submit" className="property-form-confirm-button mt-4 d-flex justify-content-center align-items-center">
                    {submitted ? <HomeMadeSpinner /> : 'CONFERMA'}
                </Button>
            </Form>
        </div>
    );
}

export default NewPropertyForm;