import { Zoom, toast, ToastPosition, ToastTransition } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type ToastType = 'info' | 'success' | 'error' | 'warning';

export const showToast = (
  message: string,
  type?: ToastType,
  icon?: string | JSX.Element,
  position: ToastPosition = 'top-center',
  autoClose: number = 5000,
  transition: ToastTransition = Zoom
) => {
  switch (type) {
    case 'info':
      toast.info(message, {
        position,
        autoClose,
        transition,
      });
      break;
    case 'success':
      toast.success(message, {
        position,
        autoClose,
        transition,
      });
      break;
    case 'error':
      toast.error(message, {
        position,
        autoClose,
        transition,
      });
      break;
    case 'warning':
      toast.warning(message, {
        position,
        autoClose,
        transition,
      });
      break;
    default:
      toast(message, { position, autoClose, transition, icon: () => icon });
  }
};

export default showToast;
