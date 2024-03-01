import { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { isBefore } from 'date-fns';
import HomeMadeSpinner from './HomeMadeSpinner';

const SetPropertyDetailsForm = () => {
    const [userWroteSth, setUserWroteSth] = useState(false);
    const { id } = useParams()
    useEffect(() => {
        console.log(id)
    }, [id])
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        whyIsPerfect: '',
        numberOfRooms: '',
        sizeSqMeters: '',
        floorNumber: '',
        numberOfToilets: '',
        price: '',
        availableFrom: ''
    });
    const [errors, setErrors] = useState({
        title: '',
        numberOfRooms: '',
        sizeSqMeters: '',
        numberOfToilets: '',
        price: '',
        availableFrom: '',
        thumbnail: '',
        submit: ''
    })
    const handleInputChange = (category, value) => {
        setFormData(prevState => ({
            ...prevState,
            [category]: value
        }));
        setErrors(prevState => ({
            ...prevState,
            [category]: ""
        }));
        setUserWroteSth(true)
    }

    const handleThumbnailChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileType = file.type;
            if (!['image/jpeg', 'image/jpg', 'image/png'].includes(fileType)) {
                setErrors(prevState => ({
                    ...prevState,
                    thumbnail: '⚠️ Si prega di selezionare un file di tipo JPEG, JPG o PNG.'
                }));
            } else {
                setFormData(prevState => ({
                    ...prevState,
                    thumbnail: file
                }));
                setErrors(prevState => ({
                    ...prevState,
                    thumbnail: ''
                }));
            }
        }
    }

    const validateForm = () => {
        const newErrors = {};

        if (formData.title.trim().length <= 4) {
            newErrors.title = "⚠️ Il titolo deve avere più di 4 caratteri alfabetici"
        }

        if (formData.numberOfRooms <= 0 || formData.numberOfRooms >= 21) {
            newErrors.numberOfRooms = "⚠️ Numero di stanze non valido"
        }

        if (formData.sizeSqMeters <= 30) {
            newErrors.sizeSqMeters = "⚠️ La metratura minima consentita è di 30mq"
        }

        if (formData.numberOfToilets <= 0 || formData.numberOfToilets >= 10) {
            newErrors.numberOfToilets = "⚠️ Numero di bagni non valido"
        }

        if (formData.price <= 0) {
            newErrors.price = "⚠️ Prezzo non valido"
        }

        const today = new Date();
        const selectedDate = new Date(formData.availableFrom);
        if (isBefore(selectedDate, today)) {
            newErrors.availableFrom = "⚠️ La data di disponibilità non può essere nel passato"
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return false
        } else {
            setErrors({})
            return true
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (userWroteSth && validateForm() && errors.thumbnail === '') {
            try {
                const response = await fetch(`http://localhost:3001/properties/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('authToken')
                    },
                    body: JSON.stringify(formData)
                });
                if (!response.ok) {
                    throw new Error('Failed to update property details');
                }
                const formDataToSend = new FormData()
                formDataToSend.append('thumbnail', formData.thumbnail)
                const thumbnailResponse = await fetch(`http://localhost:3001/properties/${id}/thumbnail`, {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('authToken')
                    },
                    body: formDataToSend
                })
                if (!thumbnailResponse.ok) {
                    throw new Error('Failed to upload thumbnail')
                }
                setFormData({
                    title: '',
                    description: '',
                    whyIsPerfect: '',
                    numberOfRooms: '',
                    sizeSqMeters: '',
                    floorNumber: '',
                    numberOfToilets: '',
                    price: '',
                    availableFrom: ''
                })
            } catch (error) {
                console.error('Error updating property details:', error.message);
                setErrors({ submit: '⚠️ Errore nel caricamento dei dati' });
            }
        }
    }

    return (
        <div className="p-5 bg-primary m-5 mx-3 mx-md-auto rounded">
            <h1 className="pb-4 text-center">
                <span className="text-dark">NUOVO</span>
                <span className="text-light"> ANNUNCIO</span>
            </h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="title" className="mb-3">
                    <Form.Label>Titolo:</Form.Label>
                    <Form.Control type="text" name="title" value={formData.title} onChange={(e) => handleInputChange('title', e.target.value)} />
                    {errors.title && <Alert variant="danger">{errors.title}</Alert>}
                </Form.Group>
                <div className='d-flex flex-column justify-content-center align-items-start'>
                    <Form.Group controlId="description" className="mb-3 w-100">
                        <Form.Label>Descrizione dall'immobile:</Form.Label>
                        <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={(e) => handleInputChange('description', e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="whyIsPerfect" className="mb-3 w-100">
                        <Form.Label>Perché è perfetto per i nomadi digitali?</Form.Label>
                        <Form.Control as="textarea" rows={3} name="whyIsPerfect" value={formData.whyIsPerfect} onChange={(e) => handleInputChange('whyIsPerfect', e.target.value)} />
                    </Form.Group>
                </div>
                <div className='d-sm-flex justify-content-center align-items-start'>
                    <Form.Group controlId="numberOfRooms" className="mb-3 mx-2">
                        <Form.Label>Numero di stanze:</Form.Label>
                        <Form.Control type="number" name="numberOfRooms" value={formData.numberOfRooms} onChange={(e) => handleInputChange('numberOfRooms', e.target.value)} />
                        {errors.numberOfRooms && <Alert variant="danger">{errors.numberOfRooms}</Alert>}
                    </Form.Group>
                    <Form.Group controlId="sizeSqMeters" className="mb-3 mx-2">
                        <Form.Label>Dimensione (mq):</Form.Label>
                        <Form.Control type="number" name="sizeSqMeters" value={formData.sizeSqMeters} onChange={(e) => handleInputChange('sizeSqMeters', e.target.value)} />
                        {errors.sizeSqMeters && <Alert variant="danger">{errors.sizeSqMeters}</Alert>}
                    </Form.Group>
                </div>
                <div className='d-sm-flex justify-content-center align-items-start'>
                    <Form.Group controlId="floorNumber" className="mb-3 mx-2">
                        <Form.Label>Numero piano:</Form.Label>
                        <Form.Control type="number" name="floorNumber" value={formData.floorNumber} onChange={(e) => handleInputChange('floorNumber', e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="numberOfToilets" className="mb-3 mx-2">
                        <Form.Label>Numero di bagni:</Form.Label>
                        <Form.Control type="number" name="numberOfToilets" value={formData.numberOfToilets} onChange={(e) => handleInputChange('numberOfToilets', e.target.value)} />
                        {errors.numberOfToilets && <Alert variant="danger">{errors.numberOfToilets}</Alert>}
                    </Form.Group>
                </div>
                <Form.Group controlId="price" className="mb-3 mx-2">
                    <Form.Label>Prezzo in euro (€):</Form.Label>
                    <Form.Control type="number" name="price" value={formData.price} onChange={(e) => handleInputChange('price', e.target.value)} />
                    {errors.price && <Alert variant="danger">{errors.price}</Alert>}
                </Form.Group>
                <Form.Group controlId="availableFrom" className="mb-3 mx-2">
                    <Form.Label>Disponibile dal:</Form.Label>
                    <Form.Control type="date" name="availableFrom" value={formData.availableFrom} onChange={(e) => handleInputChange('availableFrom', e.target.value)} />
                    {errors.availableFrom && <Alert variant="danger">{errors.availableFrom}</Alert>}
                </Form.Group>
                <Form.Group controlId="thumbnail" className="mb-3 mx-2">
                    <Form.Label>Immagine di copertina:</Form.Label>
                    <Form.Control type="file" accept=".jpg,.jpeg,.png" onChange={handleThumbnailChange} />
                    {errors.thumbnail && <Alert variant="danger">{errors.thumbnail}</Alert>}
                </Form.Group>
                {errors.submit && <Alert variant="danger">{errors.submit}</Alert>}
                <Button variant="dark" type="submit" className="property-form-confirm-button mt-4 d-flex justify-content-center align-items-center">
                    {/* {submitted ? <HomeMadeSpinner /> : 'CONFERMA'} */}
                    CONFERMA
                </Button>
            </Form>
        </div>
    )
}

// DOMANI TOCCA FARE LA PAGINA DI DETTAGIO DELLA PROPRIETA'

export default SetPropertyDetailsForm;
