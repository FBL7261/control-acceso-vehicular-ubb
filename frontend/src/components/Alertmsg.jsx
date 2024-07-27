import Swal from "sweetalert2";
import '../styles/alert.css';

export const showSuccessAlert = () => {
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Registro exitoso",
        showConfirmButton: false,
        timer: 1500,
        customClass: {
            popup: 'swal2-popup'
        }
      });
}

export const showErrorAlert = () => {
    Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Registro fallido",
        showConfirmButton: false,
        timer: 1500,
        customClass: {
            popup: 'swal2-popup'
        }
      });
}