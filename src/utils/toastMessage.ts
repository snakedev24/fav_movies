import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Function to show success toast
export const showSuccessToast = (message:string) => {
  toast.success(message, { position: 'top-right' });
};

// Function to show error toast
export const showErrorToast = (message:string) => {
  toast.error(message, { position: 'top-right' });
};

// Function to show info toast
export const showInfoToast = (message:string) => {
  toast.info(message, { position: 'top-right' });
};