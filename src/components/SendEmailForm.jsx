import { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { serviceId, templateId, myPublicKey } from '../mailConfig';
import { Alert, Button, Form } from 'react-bootstrap';

export const SendEmailForm = ({ property, thumbnail, wantToSendEmail, setWantToSendEmail, isEmailFormVisible, setIsEmailFormVisible, setShowEmailSuccess }) => {
    const form = useRef();
    const [showEmptyMessageAlert, setShowEmptyMessageAlert] = useState(false)
    const [emailFail, setEmailFail] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
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
        if (formData.message.length > 0) {
            emailjs
                .sendForm(serviceId, templateId, form.current, {
                    publicKey: myPublicKey,
                })
                .then(
                    () => {
                        console.log('SUCCESS!');
                        setWantToSendEmail(!wantToSendEmail)
                        setIsEmailFormVisible(false)
                        setShowEmailSuccess(true)
                    },
                    (error) => {
                        console.log('FAILED...', error)
                        setEmailFail(true)
                    },
                );
        } else {
            setShowEmptyMessageAlert(true)
        }
    };

    return (
        <Form ref={form} onSubmit={sendEmail} className={isEmailFormVisible ? 'send-email-form email-active mt-4' : 'send-email-form mt-4'}>
            <Form.Control className='d-none' name='to_name' value={formData.to_name} />
            <Form.Control className='d-none' name='from_name' value={formData.from_name} />
            <Form.Control className='d-none' name='from_surname' value={formData.from_surname} />
            <Form.Control className='d-none' name='from_email' value={formData.from_email} />
            <Form.Control className='d-none' name='p_type' value={formData.p_type} />
            <Form.Control className='d-none' name='p_city' value={formData.p_city} />
            <Form.Control className='d-none' name='image_url' value={formData.image_url} />
            <Form.Control placeholder='Inserisci il tuo messaggio' autoFocus
                name='message' className='text-area bg-tertiary' rows={4} as='textarea' value={formData.message} onChange={handleInputChange} />
            <div className='mt-3 d-flex justify-content-end'>
                <Button type='submit' className='me-2 text-primary bg-black invia-una-mail'>INVIA</Button>
            </div>
            {showEmptyMessageAlert && <Alert className="fs-5" variant="success" onClose={() => setShowEmptyMessageAlert(false)} dismissible>⚠️ Attenzione, non puoi inviare un messaggio vuoto!</Alert>}
            {emailFail && <Alert className="fs-5" variant="success" onClose={() => setEmailFail(false)} dismissible>Non siamo riusciti a inviare il messaggio 😕</Alert>}
        </Form>
    )
};

export default SendEmailForm