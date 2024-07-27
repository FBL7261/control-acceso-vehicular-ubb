import React, { useState, useContext, createContext } from 'react';
import { createPortal } from 'react-dom';

const MensajesContext = createContext();

export const useMensajes = () => {
  return useContext(MensajesContext);
};

export const MensajesProvider = ({ children }) => {
  const [mensaje, setMensaje] = useState(null);

  const mensajeExito = (mensaje) => {
    setMensaje({ tipo: 'exito', texto: mensaje });
    setTimeout(() => setMensaje(null), 3000);
  };

  const mensajeError = (mensaje) => {
    setMensaje({ tipo: 'error', texto: mensaje });
    setTimeout(() => setMensaje(null), 3000);
  };

  return (
    <MensajesContext.Provider value={{ mensajeExito, mensajeError }}>
      {children}
      {mensaje &&
        createPortal(
          <div
            className={`fixed bottom-4 right-4 px-4 py-2 rounded-md text-white ${
              mensaje.tipo === 'exito' ? 'bg-green-500' : 'bg-red-500'
            }`}
          >
            {mensaje.texto}
          </div>,
          document.body
        )}
    </MensajesContext.Provider>
  );
};