import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerAction } from "../redux/actions/register";
import { Alert, Form, Button } from "react-bootstrap";
import glogo from '../assets/images/GUIDANOMADI_LOGO_final.jpg'
import { Link } from "react-router-dom";

const Register = () => {
    const dispatch = useDispatch();
    const [showAlert, setShowAlert] = useState(false);
    const [userWroteSth, setUserWroteSth] = useState(false)
    const [errorNome, setErrorNome] = useState(null)
    const [errorCognome, setErrorCognome] = useState(null)
    const [errorEmail, setErrorEmail] = useState(null)
    const [errorPw, setErrorPw] = useState(null)
    const nameRegex = /^(.*[a-zA-Z]){3,}.*/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const handleInputChange = (category, value) => {
        setData(prevState => ({
            ...prevState,
            [category]: value
        }));
        setUserWroteSth(true)
    };

    const validateDataBeforeSubmit = (e) => {
        e.preventDefault();
        if (userWroteSth) {
            let isNomeValid = nameRegex.test(data.firstName);
            let isCognomeValid = nameRegex.test(data.lastName);
            let isEmailValid = emailRegex.test(data.email);
            let isPwValid = passwordRegex.test(data.password);

            setErrorNome(!isNomeValid);
            setErrorCognome(!isCognomeValid);
            setErrorEmail(!isEmailValid);
            setErrorPw(!isPwValid);

            if (isNomeValid && isCognomeValid && isEmailValid && isPwValid) {
                handleSubmit();
            }
        }
    }

    const handleSubmit = () => {
        dispatch(registerAction(data));
        setShowAlert(true);
    };


    return (
        <div className="bg-black vh-100 p-5">
            <div className="logo-volante">
                <img src={glogo} alt="giudanomadi-logo" height='100px' className="glogo" />
            </div>
            <div className="p-5 bg-primary mx-3 mx-md-auto rounded" style={{ maxWidth: '576px', marginTop: '6em' }}>
                <Form onSubmit={validateDataBeforeSubmit}>
                    <Form.Group className='mb-3' controlId="firstName">
                        <Form.Label>Nome:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="es. Mario"
                            value={data.firstName}
                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                        />
                    </Form.Group>
                    {errorNome && userWroteSth && <Alert variant="danger">⚠️ Il nome deve contenere almeno tre caratteri</Alert>}
                    <Form.Group className='mb-3' controlId="lastName">
                        <Form.Label>Cognome:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="es. Rossi"
                            value={data.lastName}
                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                        />
                    </Form.Group>
                    {errorCognome && userWroteSth && <Alert variant="danger">⚠️ Il cognome deve contenere almeno tre caratteri</Alert>}
                    <Form.Group className='mb-3' controlId="email">
                        <Form.Label>E-mail:</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="es. mario.rossi@email.it"
                            value={data.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                        />
                    </Form.Group>
                    {errorEmail && userWroteSth && <Alert variant="danger">⚠️ Inserisci un indirizzo e-mail valido</Alert>}
                    <Form.Group className='mb-3' controlId="password">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="La tua password"
                            value={data.password}
                            onChange={(e) => handleInputChange('password', e.target.value)}
                        />
                    </Form.Group>
                    {errorPw && userWroteSth && <Alert variant="danger">⚠️ La password deve contenere minimo sei caratteri e almeno un numero</Alert>}
                    {/*QUI AGGIUNGERE IL CAMPO CONFERMA PASSWORD!*/}
                    <Button variant="dark" type="submit">
                        <span className="text-primary">REGIS</span><span>TRATI</span>
                    </Button>
                </Form>
                {showAlert && !errorNome && !errorCognome && !errorEmail && !errorPw &&
                    <Alert variant="danger" className="fs-5">Registrazione avvenuta correttamente! 🚀</Alert>}
                <div className="d-flex justify-content-end text-dark">
                    <Link to='/login' style={{ color: 'black', fontWeight: '500' }}>Già registrato? Effettua il login!</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
