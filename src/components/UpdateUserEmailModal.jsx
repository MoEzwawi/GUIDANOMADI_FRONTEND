import { useState } from "react"
import { Alert, Button, Form, Modal } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { getCurrentUserAction } from "../redux/actions/currentUser";


const UpdateUserEmailModal = ({ showUpdateEmailModal, setShowUpdateEmailModal, userEmail }) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const dispatch = useDispatch()
    const [error, setError] = useState(false)
    const [dto, setDto] = useState({
        email: userEmail
    })
    const handleClose = () => {
        setShowUpdateEmailModal(false)
    }
    const handleInputChange = (value) => {
        setDto({
            email: value
        })
    }
    const validateEmail = () => {
        if (emailRegex.test(dto.email)) {
            return true
        } else {
            setError(true)
            return false
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (validateEmail()) {
            if (dto.email === userEmail) {
                handleClose()
            } else {
                try {
                    const res = await fetch('http://localhost:3001/users/me/changeEmail', {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + localStorage.getItem('authToken')
                        },
                        body: JSON.stringify(dto)
                    })
                    if (res.ok) {
                        const data = await res.json()
                        console.log(data)
                        dispatch(getCurrentUserAction())
                    } else {
                        throw new Error(res.status + res.statusText)
                    }
                } catch (error) {
                    console.log("errore nell'aggiornamento dell'email", error)
                }
            }
        }
    }
    return (
        <Modal show={showUpdateEmailModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Vuoi modificare l'indirizzo email?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="email"
                            autoFocus
                            value={dto.email}
                            onChange={(e) => {
                                handleInputChange(e.target.value)
                            }}
                            onSubmit={handleSubmit}
                        />
                    </Form.Group>
                </Form>
                {error && <Alert dismissible onClose={() => { setError(false) }} variant="danger">⚠️ Inserisci un indirizzo email valido</Alert>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Annulla
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Conferma
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default UpdateUserEmailModal