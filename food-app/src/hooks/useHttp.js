import { useState, useCallback } from 'react';

function useHttp() {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const sendRequest = useCallback(async function (requestConfig, transformData) {
		setIsLoading(true);
		setError(null);
		try {
			const response = await fetch(requestConfig.url, {
				method: requestConfig.method || 'GET',
				body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
				headers: requestConfig.headers ? requestConfig.headers : {}
			});
			const data = await response.json();

			transformData(data);

			if (!response.ok) {
				throw new Error('Something went wrong!');
			}
			
		} catch (err) {
			setError(err.message);
		}

		setIsLoading(false);
	}, []);

	return ({
		isLoading: isLoading,
		error: error,
		sendRequest: sendRequest
	});
}

export default useHttp;