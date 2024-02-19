import { useState } from "react"
import { useDispatch } from "react-redux"
import { registerAction } from "../redux/actions/register"

const Register = () => {
    const dispatch = useDispatch()
    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    })
    const handleInputChange = (category, value) => {
        setData(prevState => ({
            ...prevState,
            [category]: value
        }))
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(registerAction(data))
    }
    return (
        <div className="p-5 bg-warning m-5">
            <form onSubmit={handleSubmit}>
                <div className="d-flex justify-content-center">
                    <label htmlFor="firstName">Nome:</label>
                    <input id="firstName" placeholder="es. Mario" value={data.firstName} onChange={(e) => {
                        handleInputChange('firstName', e.target.value)
                    }} />
                </div>
                <div className="d-flex justify-content-center">
                    <label htmlFor="lastName">Cognome:</label>
                    <input id="lastName" placeholder="es. Rossi" value={data.lastName} onChange={(e) => {
                        handleInputChange('lastName', e.target.value)
                    }} />
                </div>
                <div className="d-flex justify-content-center">
                    <label htmlFor="email">E-mail:</label>
                    <input id="email" placeholder="es. mario.rossi@email.it" value={data.email} onChange={(e) => {
                        handleInputChange('email', e.target.value)
                    }} />
                </div>
                <div className="d-flex justify-content-center">
                    <label htmlFor="password">Password:</label>
                    <input id="password" type="password" placeholder="La tua password" value={data.password} onChange={(e) => {
                        handleInputChange('password', e.target.value)
                    }} />
                </div>
                <button>SUBMIT</button>
            </form>
        </div>
    )
}

export default Register