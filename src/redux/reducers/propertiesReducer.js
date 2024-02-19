import { GET_PROPERTIES } from "../actions/properties"

const initialState = {
    content: []
}

const propertiesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PROPERTIES:
            return {
                ...state,
                content: action.payload
            }
        default: return state
    }
}

export default propertiesReducer