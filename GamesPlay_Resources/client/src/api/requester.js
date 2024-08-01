async function requester(method, url, data) {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    if (data) {
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(url, options);

        // Check if the response status indicates success
        if (!response.ok) {
            // Parse error details if available
            let errorMessage = `Error: ${response.status}`;
            try {
                const errorData = await response.json();
                errorMessage = errorData.message || errorMessage;
            } catch (e) {
                // Ignore JSON parsing errors for error responses
            }
            throw new Error(errorMessage);
        }

        // Handle responses with no content (204 No Content)
        if (response.status === 204) {
            return null;
        }

        // Parse JSON response
        const result = await response.json();
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
