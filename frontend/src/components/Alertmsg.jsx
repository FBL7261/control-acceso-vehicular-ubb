import Swal from 'sweetalert2';
import '../styles/Alertmsg.css';

export const showSuccessAlert = (message) => {
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: message,
    showConfirmButton: false,
    timer: 1500,
    customClass: {
      popup: 'swal2-popup'
    }
  });
};

export const showErrorAlert = (message) => {
  Swal.fire({
    position: 'top-end',
    icon: 'error',
    title: message,
    showConfirmButton: false,
    timer: 1500,
    customClass: {
      popup: 'swal2-popup'
    }
  });
};
