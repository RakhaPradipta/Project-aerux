import toast from 'react-hot-toast';

export class APIError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.data = data;
  }
}

export const handleAPIError = (error) => {
  if (error.response) {
    const { status, data } = error.response;
    const message = data?.message || 'An error occurred';

    switch (status) {
      case 400:
        toast.error('Bad request: ' + message);
        break;
      case 401:
        toast.error('Unauthorized. Please login again.');
        localStorage.removeItem('token');
        window.location.href = '/login';
        break;
      case 403:
        toast.error('Forbidden: You do not have permission');
        break;
      case 404:
        toast.error('Resource not found');
        break;
      case 500:
        toast.error('Server error. Please try again later.');
        break;
      default:
        toast.error(message);
    }

    return new APIError(message, status, data);
  }

  if (error.request) {
    toast.error('No response from server. Check your connection.');
    return new APIError('Network error', 0, null);
  }

  toast.error('Error: ' + error.message);
  return error;
};

export const showSuccessToast = (message = 'Success!') => {
  toast.success(message);
};

export const showErrorToast = (message = 'An error occurred') => {
  toast.error(message);
};

export const showLoadingToast = (message = 'Loading...') => {
  return toast.loading(message);
};
