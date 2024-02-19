export const API = 'http://localhost:3001/properties'
export const NEW_PROPERTY = 'NEW_PROPERTY'

export const newPropertyAction = (obj) => {
    return async (dispatch) => {
        fetch(API, {
            method: 'POST',
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('authToken'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error("Errore nel caricamento dei dati");
                }
            })
            .then((data) => {
                dispatch({
                    type: NEW_PROPERTY,
                    payload: data,
                });
                console.log('response data', data)
            })
            .catch((err) => {
                console.log(err);
            });
    };
};