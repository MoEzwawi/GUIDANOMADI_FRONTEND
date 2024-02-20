export const API = 'http://localhost:3001/auth/login'
export const LOGIN = 'LOGIN'

export const loginAction = (obj) => {
    return async (dispatch) => {
        try {
            const res = await fetch(API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            });

            if (!res.ok) {
                throw new Error("Username o password errati");
            }

            const data = await res.json();
            localStorage.setItem('authToken', data.token);
            dispatch({
                type: LOGIN,
                payload: data,
            });
            console.log('il token:', data);
            return data;
        } catch (error) {
            throw error;
        }
    };
};
