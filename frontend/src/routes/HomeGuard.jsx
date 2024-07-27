import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarGuard from '../components/NavbarGuard';
import CreateRegEntry from '../components/CreateRegEntry';
import CreateRegEntryUser from '../components/CreateREUser';

// import SearchBar from '../components/SearchEntry';
import RegEntryList from '../components/RegEntryList';
import '../styles/GuardiaInterface.css';

const HomeGuard = () => {
  const navigate = useNavigate();
  //const [searchResults, setSearchResults] = useState([]);
  const handleViewRegEntries = () => {
    navigate('/search');
  }
  // const handleViewRegEntriesByDate = () => {
  //   navigate('/search-by-date');
  // }
  // const handleViewRegEntriesByPlate = () => {
  //   navigate('/search-by-plate');
  // }
  // const handleViewRegEntriesByRut = () => {
  //   navigate('/search-reg-by-rut');
  // }
  // const handleViewRegEntriesTotally = () => {
  //   navigate('/search-totally');
  // }


  return (
    <>
      <NavbarGuard />
      <div className='guard-interface'>
        <h1>Welcome</h1>
        <h2>Instrucciones de uso</h2>
        <p>Para ingresar rut: solo debe ingresar los nomeros y el digito de final sea k o algun numero. Se formateara automaticamente</p>
        <p>Para ingresar patente: solo debe ingresar las letras y numeros. Se formateara automaticamente</p>
        {/* <div className='search-bar-box'>
        <SearchBar setSearchResults={setSearchResults} />
        </div>
        <RegEntryList entries={searchResults} /> */}
        <button onClick={handleViewRegEntries} className='guard-view-entry'>Ver registros</button>
        {/* <button onClick={handleViewRegEntriesByDate} className='guard-view-entry'>Buscar por fecha</button>
        <button onClick={handleViewRegEntriesByPlate} className='guard-view-entry'>Buscar por patente</button>
        <button onClick={handleViewRegEntriesByRut} className='guard-view-entry'>Buscar por rut</button>
        <button onClick={handleViewRegEntriesTotally} className='guard-view-entry'>Buscar todos los registros</button> */}
        <div className='create-entry-box'>
          <CreateRegEntry /> {/* Incluir el formulario de registro aquí */}
        </div>
        <div className='create-entry-user-box'>
          <CreateRegEntryUser /> {/* Incluir el formulario de registro de usuario aquí */}
        </div>
      </div>
    </>
  );
};

export default HomeGuard;