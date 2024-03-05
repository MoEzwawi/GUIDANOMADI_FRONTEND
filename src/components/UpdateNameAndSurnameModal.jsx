import { useState } from "react"
import { Alert, Button, Form, Modal } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { getCurrentUserAction } from "../redux/actions/currentUser";


const UpdateNameAndSurnameModal = ({ showUpdateNameModal, setShowUpdateNameModal, userfirstName, userLastName }) => {
    const dispatch = useDispatch()
    const nameRegex = /^(.*[a-zA-Z]){3,}.*/;
    const [errorFirstName, setErrorFirstName] = useState(false)
    const [errorLastName, setErrorLastName] = useState(false)
    const [dto, setDto] = useState({
        firstName: userfirstName,
        lastName: userLastName
    })
    const handleClose = () => {
        setShowUpdateNameModal(false)
    }
    const handleInputChange = (key, value) => {
        setDto(prevState => ({
            ...prevState,
            [key]: value
        }))
    }
    const validateElement = (el) => {
        return nameRegex.test(el)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (validateElement(dto.firstName) && validateElement(dto.lastName)) {
            if (dto.firstName === userfirstName && dto.lastName === userLastName) {
                handleClose()
            } else {
                try {
                    const res = await fetch('http://localhost:3001/users/me/updateNameAndSurname', {
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
                    console.log("errore nell'aggiornamento dei dati utente", error)
                }
            }
        } else {
            setErrorFirstName(!validateElement(dto.firstName))
            setErrorLastName(!validateElement(dto.lastName))
        }
    }
    return (
        <Modal show={showUpdateNameModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Vuoi modificare nome e cognome?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Label>Nome:</Form.Label>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="text"
                            value={dto.firstName}
                            onChange={(e) => {
                                handleInputChange("firstName", e.target.value)
                            }}
                            onSubmit={handleSubmit}
                        />
                    </Form.Group>
                    {errorFirstName && <Alert dismissible onClose={() => { setErrorFirstName(false) }} variant="danger">⚠️ Inserisci un nome valido</Alert>}
                    <Form.Group className="mb-3">
                        <Form.Label>Cognome:</Form.Label>
                        <Form.Control
                            type="text"
                            value={dto.lastName}
                            onChange={(e) => {
                                handleInputChange("lastName", e.target.value)
                            }}
                            onSubmit={handleSubmit}
                        />
                    </Form.Group>
                    {errorLastName && <Alert dismissible onClose={() => { setErrorLastName(false) }} variant="danger">⚠️ Inserisci un cognome valido</Alert>}
                </Form>
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

export default UpdateNameAndSurnameModal