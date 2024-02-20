import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginAction } from "../redux/actions/login";
import { Alert } from "react-bootstrap";

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
            setData({
                email: "",
                password: "",
            });
            setError(null);
        } catch (error) {
            setError(error.message);
            setShowAlert(true);
        }
    };

    return (
        <div className="p-5 bg-primary m-5">
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        placeholder="Inserisci email"
                        value={data.email}
                        onChange={(e) => {
                            handleInputChange("email", e.target.value);
                        }}
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Inserisci password"
                        value={data.password}
                        onChange={(e) => {
                            handleInputChange("password", e.target.value);
                        }}
                    />
                </div>
                <button type="submit">SUBMIT</button>
            </form>
            {showAlert && (
                <Alert variant={error ? "danger" : "success"} onClose={() => setShowAlert(false)} dismissible>
                    {error ? error : "Login riuscito!"}
                </Alert>
            )}
        </div>
    );
};

export default Login;