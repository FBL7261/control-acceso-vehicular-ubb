import React, { useEffect, useRef } from "react";
import "./Modal.css"; // Ensure this file exists with appropriate styles

const Modal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef();

  useEffect(() => {
    if (isOpen) {
      // Focus on the first focusable element inside the modal
      const focusableElements = modalRef.current.querySelectorAll(
        "button, a, input, textarea, select",
      );
      if (focusableElements.length) {
        focusableElements[0].focus();
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} aria-label="Modal Overlay">
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        ref={modalRef}
        aria-label="Modal Content"
      >
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close Modal"
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
