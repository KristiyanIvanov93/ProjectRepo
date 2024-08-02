async function requester(method, url, data) {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const accessToken = localStorage.getItem('accessToken');

    // Do not add authorization header for login and registration endpoints
    if (accessToken && !url.endsWith('/login') && !url.endsWith('/register')) {
        options.headers['X-Authorization'] = accessToken;
    }

    if (data) {
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(url, options);
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Request failed');
        }

        if (response.status === 204) {
            return null; 
        }

        return await response.json();
    } catch (error) {
        console.error('Error making request:', error);
        throw error;
    }
}

export const get = requester.bind(null, 'GET');
export const post = requester.bind(null, 'POST');
export const put = requester.bind(null, 'PUT');
export const del = requester.bind(null, 'DELETE');
