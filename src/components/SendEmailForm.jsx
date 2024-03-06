import { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { serviceId, templateId, myPublicKey } from '../mailConfig';
import { Button, Form } from 'react-bootstrap';

export const SendEmailForm = ({ property, thumbnail }) => {
    const form = useRef();
    const type = property.listingType === 'FOR_SALE' ? 'in vendita' : 'in affitto'
    const [formData, setFormData] = useState(
        {
            to_name: property.listedBy.firstName,
            from_name: "",
            from_surname: "",
            from_email: "",
            p_type: type,
            p_city: property.address.city,
            image_url: thumbnail.imageUrl,
            message: ""
        }
    )
    const fetchUserData = async () => {
        const currentUserString = localStorage.getItem('currentUser');
        const parsedCurrentUser = JSON.parse(currentUserString);
        setFormData(prevData => ({
            ...prevData,
            from_name: parsedCurrentUser.firstName,
            from_surname: parsedCurrentUser.lastName,
            from_email: parsedCurrentUser.email
        }));
    }

    useEffect(() => {
        fetchUserData()
    }, [])

    const handleInputChange = (e) => {
        setFormData(prevData => ({
            ...prevData,
            message: e.target.value
        }))
    }

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm(serviceId, templateId, form.current, {
                publicKey: myPublicKey,
            })
            .then(
                () => {
                    console.log('SUCCESS!');
                },
                (error) => {
                    console.log('FAILED...', error);
                },
            );
    };

    return (
        <Form ref={form} onSubmit={sendEmail} className='mt-4'>
            <Form.Control className='d-none' name='to_name' value={formData.to_name} />
            <Form.Control className='d-none' name='from_name' value={formData.from_name} />
            <Form.Control className='d-none' name='from_surname' value={formData.from_surname} />
            <Form.Control className='d-none' name='from_email' value={formData.from_email} />
            <Form.Control className='d-none' name='p_type' value={formData.p_type} />
            <Form.Control className='d-none' name='p_city' value={formData.p_city} />
            <Form.Control className='d-none' name='image_url' value={formData.image_url} />
            <Form.Control placeholder='Inserisci il tuo messaggio' autoFocus
                name='message' className='text-area' rows={4} as='textarea' value={formData.message} onChange={handleInputChange} />
            <Button type='submit' className='bg-danger'>INVIA</Button>
        </Form>
    )
};

export default SendEmailForm