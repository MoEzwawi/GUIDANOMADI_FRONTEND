import { useState } from "react"
import { Alert, Button, Form, Modal } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { getCurrentUserAction } from "../redux/actions/currentUser";
import HomeMadeSpinner from "./HomeMadeSpinner";

const UpdateProfilePicModal = ({ showUpdateProfilePicModal, setShowUpdateProfilePicModal }) => {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const [picture, setPicture] = useState(null)
    const [error, setError] = useState("")
    const handleClose = () => {
        setShowUpdateProfilePicModal(false)
    }
    const handlePictureChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setPicture(file)
        }
    }
    const handleSubmit = async () => {
        if (picture) {
            try {
                setIsLoading(true)
                const formData = new FormData()
                formData.append('profilePic', picture)
                const res = await fetch('http://localhost:3001/users/me/upload', {
                    method: 'POST',
                    headers: {
                        "Authorization": 'Bearer ' + localStorage.getItem('authToken')
                    },
                    body: formData
                })
                if (res.ok) {
                    const data = await res.text()
                    console.log(data)
                    dispatch(getCurrentUserAction())
                } else {
                    throw new Error("⚠️ Impossibile effettuare l'upload dell'immagine")
                }
            } catch (error) {
                setIsLoading(false)
                console.log(error)
                setError(error.message)
            }
        }
    }
    return (
        <Modal show={showUpdateProfilePicModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Vuoi cambiare l'immagine del profilo?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="file"
                            accept=".jpg,.jpeg,.png,image/webp"
                            onChange={handlePictureChange}
                        />
                    </Form.Group>
                </Form>
                {error && <Alert dismissible onClose={() => { setError("") }} variant="danger">{error}</Alert>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Annulla
                </Button>
                <Button style={{ width: '106px', height: '38px' }} variant="primary" onClick={handleSubmit} className="d-flex justify-content-center align-items-center">
                    {isLoading ? <HomeMadeSpinner /> : 'Conferma'}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default UpdateProfilePicModal