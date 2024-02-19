import { useState } from "react"
import { useDispatch } from "react-redux"
import { loginAction } from "../redux/actions/login"

const Login = () => {
    const dispatch = useDispatch()
    const [data, setData] = useState({
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
        dispatch(loginAction(data))
    }
    return (
        <div className="p-5 bg-warning m-5">
            <form onSubmit={handleSubmit}>
                <div>
                    <input placeholder="Insert email" value={data.email} onChange={(e) => {
                        handleInputChange('email', e.target.value)
                    }} />
                </div>
                <div>
                    <input type="password" placeholder="Insert password" value={data.password} onChange={(e) => {
                        handleInputChange('password', e.target.value)
                    }} />
                </div>
                <button>SUBMIT</button>
            </form>
        </div>
    )
}

export default Login