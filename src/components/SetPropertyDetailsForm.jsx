import { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const SetPropertyDetailsForm = () => {
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
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
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
            setSubmitted(true)
            setErrors({})
        } catch (error) {
            console.error('Error updating property details:', error.message);
            setErrors({ submit: 'Failed to update property details. Please try again later.' });
        }
    };

    return (
        <div className="p-5 bg-primary m-5 mx-3 mx-md-auto rounded" style={{ maxWidth: '576px' }}>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="title" className="mb-3">
                    <Form.Label>Title:</Form.Label>
                    <Form.Control type="text" name="title" value={formData.title} onChange={handleInputChange} />
                </Form.Group>
                <Form.Group controlId="description" className="mb-3">
                    <Form.Label>Description:</Form.Label>
                    <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleInputChange} />
                </Form.Group>
                <Form.Group controlId="whyIsPerfect" className="mb-3">
                    <Form.Label>Why is perfect:</Form.Label>
                    <Form.Control type="text" name="whyIsPerfect" value={formData.whyIsPerfect} onChange={handleInputChange} />
                </Form.Group>
                <Form.Group controlId="numberOfRooms" className="mb-3">
                    <Form.Label>Number of Rooms:</Form.Label>
                    <Form.Control type="number" name="numberOfRooms" value={formData.numberOfRooms} onChange={handleInputChange} />
                </Form.Group>
                <Form.Group controlId="sizeSqMeters" className="mb-3">
                    <Form.Label>Size (sq meters):</Form.Label>
                    <Form.Control type="number" name="sizeSqMeters" value={formData.sizeSqMeters} onChange={handleInputChange} />
                </Form.Group>
                <Form.Group controlId="floorNumber" className="mb-3">
                    <Form.Label>Floor Number:</Form.Label>
                    <Form.Control type="number" name="floorNumber" value={formData.floorNumber} onChange={handleInputChange} />
                </Form.Group>
                <Form.Group controlId="numberOfToilets" className="mb-3">
                    <Form.Label>Number of Toilets:</Form.Label>
                    <Form.Control type="number" name="numberOfToilets" value={formData.numberOfToilets} onChange={handleInputChange} />
                </Form.Group>
                <Form.Group controlId="price" className="mb-3">
                    <Form.Label>Price:</Form.Label>
                    <Form.Control type="number" name="price" value={formData.price} onChange={handleInputChange} />
                </Form.Group>
                <Form.Group controlId="availableFrom" className="mb-3">
                    <Form.Label>Available From:</Form.Label>
                    <Form.Control type="date" name="availableFrom" value={formData.availableFrom} onChange={handleInputChange} />
                </Form.Group>
                {errors.submit && <Alert variant="danger">{errors.submit}</Alert>}
                {submitted && <Alert variant="success">Property details updated successfully!</Alert>}
                <Button variant="dark" type="submit" className="mt-3">Submit</Button>
            </Form>
        </div>
    );
};

export default SetPropertyDetailsForm;
