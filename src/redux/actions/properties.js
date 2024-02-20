export const API = 'http://localhost:3001/properties?page=1&size=3  '
export const GET_PROPERTIES = 'GET_PROPERTIES'

export const getPropertiesAction = () => {
    return async (dispatch) => {
        fetch(API, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('authToken')
            }
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
                    type: GET_PROPERTIES,
                    payload: data,
                });
                console.log('le proprietà:', data)
            })
            .catch((err) => {
                console.log(err);
            });
    };
};