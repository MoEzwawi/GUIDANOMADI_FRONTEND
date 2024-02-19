export const API = 'http://localhost:3001/auth/register'
export const REGISTER = 'REGISTER'

export const registerAction = (obj) => {
    return async (dispatch) => {
        fetch(API, {
            method: 'POST',
            headers: {
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
                    type: REGISTER,
                    payload: data,
                });
                console.log("Questo è l'id", data)
            })
            .catch((err) => {
                console.log(err);
            });
    };
};