export const API = 'http://localhost:3001/auth/login'
export const LOGIN = 'LOGIN'

export const loginAction = (obj) => {
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
                localStorage.setItem('authToken', data.token)
                dispatch({
                    type: LOGIN,
                    payload: data,
                });
                console.log('il token:', data)
            })
            .catch((err) => {
                console.log(err);
            });
    };
};