export const API = 'http://localhost:3001/users/me'
export const GET_CURRENT_USER = 'GET_CURRENT_USER'

export const getCurrentUserAction = () => {
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
                    type: GET_CURRENT_USER,
                    payload: data,
                });
                localStorage.setItem('currentUser', JSON.stringify(data))
                window.location.reload()
            })
            .catch((err) => {
                console.log(err);
            });
    };
};