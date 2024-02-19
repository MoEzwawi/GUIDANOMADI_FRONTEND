import { useState } from "react"
import { useDispatch } from "react-redux"
import { registerAction } from "../redux/actions/register"
import { newPropertyAction } from "../redux/actions/newProperty"

const NewPropertyForm = () => {
    const dispatch = useDispatch()
    const [data, setData] = useState({
        listingType: '',
        street: '',
        streetNumber: '',
        zipCode: '',
        city: '',
        provinceOrState: '',
        country: ''
    })
    const handleInputChange = (category, value) => {
        setData(prevState => ({
            ...prevState,
            [category]: value
        }))
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(newPropertyAction(data))
    }
    return (
        <div className="p-5 bg-warning m-5">
            <form onSubmit={handleSubmit}>
                <div className="d-flex justify-content-center">
                    <label htmlFor="listingType">Type:</label>
                    <select id="listingType" value={data.listingType} onChange={(e) => handleInputChange('listingType', e.target.value)}>
                        <option value="FOR_RENT">FOR RENT</option>
                        <option value="FOR_SALE">FOR SALE</option>
                    </select>
                </div>
                <div className="d-flex justify-content-center">
                    <label htmlFor="street">Street:</label>
                    <input id="street" value={data.street} onChange={(e) => {
                        handleInputChange('street', e.target.value)
                    }} />
                </div>
                <div className="d-flex justify-content-center">
                    <label htmlFor="streetNumber">Number</label>
                    <input id="streetNumber" placeholder="es. mario.rossi@streetNumber.it" value={data.streetNumber} onChange={(e) => {
                        handleInputChange('streetNumber', e.target.value)
                    }} />
                </div>
                <div className="d-flex justify-content-center">
                    <label htmlFor="zipCode">zipCode:</label>
                    <input id="zipCode" placeholder="La tua zipCode" value={data.zipCode} onChange={(e) => {
                        handleInputChange('zipCode', e.target.value)
                    }} />
                </div>
                <div className="d-flex justify-content-center">
                    <label htmlFor="city">City:</label>
                    <input id="city" placeholder="es. Mario" value={data.city} onChange={(e) => {
                        handleInputChange('city', e.target.value)
                    }} />
                </div>
                <div className="d-flex justify-content-center">
                    <label htmlFor="provinceOrState">Province:</label>
                    <input id="provinceOrState" placeholder="es. Mario" value={data.provinceOrState} onChange={(e) => {
                        handleInputChange('provinceOrState', e.target.value)
                    }} />
                </div>
                <div className="d-flex justify-content-center">
                    <label htmlFor="country">Country:</label>
                    <input id="country" placeholder="es. Mario" value={data.country} onChange={(e) => {
                        handleInputChange('country', e.target.value)
                    }} />
                </div>
                <button>SUBMIT</button>
            </form>
        </div>
    )
}

export default NewPropertyForm