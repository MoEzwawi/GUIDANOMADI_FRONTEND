import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginAction } from "../redux/actions/login";
import { Alert, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate()
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
            navigate('/properties')
        } catch (error) {
            setError(error.message);
            setShowAlert(true);
        }
    };

    return (
        <div className="p-5 bg-primary m-5 mx-3 mx-md-auto rounded" style={{ maxWidth: '576px' }}>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
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
                <Alert variant={error ? "danger" : "success"} onClose={() => setShowAlert(false)} dismissible>
                    {error ? error : "Login riuscito!"}
                </Alert>
            )}
            <div className="d-flex justify-content-end text-dark">
                <Link to='/register' style={{ color: 'black' }}>Non sei ancora registrato?</Link>
            </div>
        </div>
    );
};

export default Login;