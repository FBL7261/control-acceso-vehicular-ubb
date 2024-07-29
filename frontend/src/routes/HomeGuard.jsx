import React from 'react';
import NavbarGuard from '../components/NavbarGuard';
import CreateRegEntry from '../components/CreateRegEntry';
import '../styles/GuardiaInterface.css';

const HomeGuard = () => {
  return (
    <>
      <NavbarGuard />
      <div className='guard-interface'>
        <h2>Instrucciones de uso</h2>
        <p>Para ingresar rut: solo debe ingresar los nomeros y el digito de final sea k o algun numero. Se formateara automaticamente</p>
        <p>Para ingresar patente: solo debe ingresar las letras y numeros. Se formateara automaticamente</p>  
        <div className='create-entry-box'>
          <CreateRegEntry /> {/* Incluir el formulario de registro aquí */}
        </div>
      </div>
    </>
  );
};
export default HomeGuard;