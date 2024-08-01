async function requester(method, url, data) {
    const options = {};

    if (method !== 'GET') {
        options.method = method;
    }

    if (data) {
        options.headers = {
            'Content-Type': 'application/json',
        };
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(url, options);


        if (response.status === 204) {
            return null;
        }

        const result = await response.json();


        if (!result.ok) {
            throw result;
        }



        return result;
    } catch (error) {
        console.error('Error making request:', error.message);
        throw error;
    }
}

export const get = requester.bind(null, 'GET');
export const post = requester.bind(null, 'POST');
export const put = requester.bind(null, 'PUT');
export const del = requester.bind(null, 'DELETE');
