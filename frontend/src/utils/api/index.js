import ApiError from '../errors/ApiError';

const API_URL = import.meta.env.VITE_API_URL;

async function api({
  path,
  body,
  credentials = true,
  method = 'GET',
  contentType = 'application/json',
  options,
}) {
  const response = await fetch(`${API_URL}${path}`, {
    method,
    ...(body && { body: JSON.stringify(body) }),
    ...(credentials && { credentials: 'include' }),
    headers: {
      'Content-Type': contentType,
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new ApiError(
      error.details || 'Something went wrong',
      error.statusCode,
    );
  }

  const responseContentType = response.headers.get('content-type');
  if (responseContentType && responseContentType.includes('application/json')) {
    return response.json();
  }

  if (responseContentType && responseContentType.includes('application/pdf')) {
    return response.blob();
  }
}

export default api;
