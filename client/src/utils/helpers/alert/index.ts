import { toast } from 'react-toastify';

export const displayError = (message: string) => {
  toast.error(message);
};
export const displaySuccess = (message: string) => {
  toast.success(message);
};
