import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginAction } from "../redux/actions/login";
import { Alert, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import glogo from '../assets/images/GUIDANOMADI_LOGO_final.jpg'

const Login = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState({
        email: "",
        password: "",
    });
    const [showAlert, setShowAlert] = useState(false);
    const [error, setError] = useState(null);

    const handleInputChange = (category, value) => {
        setData((prevState) => ({
            ...prevState,
            [category]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(loginAction(data));
            setShowAlert(true);
            setError(null);
        } catch (error) {
            setError(error.message);
            setShowAlert(true);
        }
    };

    return (
        <div className="bg-black vh-100 p-5">
            <div className="logo-volante">
                <img src={glogo} alt="giudanomadi-logo" height='100px' className="glogo" />
            </div>
            <div className="p-5 bg-primary mx-3 mx-md-auto rounded" style={{ maxWidth: '576px', marginTop: '6em' }}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={data.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={data.password}
                            onChange={(e) => handleInputChange("password", e.target.value)}
                        />
                    </Form.Group>

                    <Button variant="dark" type="submit">
                        <span className="text-primary">LOG</span><span>IN</span>
                    </Button>
                </Form>
                {showAlert && (
                    <Alert className="fs-5" variant={error ? "danger" : "success"} onClose={() => setShowAlert(false)} dismissible>
                        {error ? error : "Login riuscito! 🚀"}
                    </Alert>
                )}
                <div className="d-flex justify-content-end text-dark">
                    <Link to='/register' style={{ color: 'black', fontWeight: '500' }}>Non sei ancora registrato?</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;