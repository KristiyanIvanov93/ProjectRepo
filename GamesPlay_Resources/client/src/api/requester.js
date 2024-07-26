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

        // Check if response status indicates an error
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Check if response is empty
        if (response.status === 204) { // No Content
            return null;
        }

        // Handle JSON response
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error making request:', error);
        throw error; // Re-throw error to allow further handling if needed
    }
}

export const get = requester.bind(null, 'GET');
export const post = requester.bind(null, 'POST');
export const put = requester.bind(null, 'PUT');
export const del = requester.bind(null, 'DELETE');
