export const API = 'http://localhost:3001/properties'

export const newPropertyAction = (obj) => {
    return async () => {
        try {
            const res = await fetch(API, {
                method: 'POST',
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem('authToken'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            });

            if (!res.ok) {
                throw new Error("Errore nel caricamento dei dati");
            }

            const data = await res.json();
            console.log('response data', data);
            return data;
        } catch (error) {
            console.error(error);
            throw error
        }
    };
};