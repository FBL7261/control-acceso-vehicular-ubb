import React from 'react';

const Form = ({ backgroundColor, title, fields, onSubmit, onChange }) => {
  return (
    <div style={{ backgroundColor }}>
      <h1>{title}</h1>
      <form onSubmit={onSubmit}>
        {fields.map((field) => (
          <div key={field.name}>
            <label>{field.label}</label>
            {field.type === 'file' ? (
              <input
                type="file"
                name={field.name}
                onChange={onChange}
              />
            ) : field.type === 'checkbox' ? (
              <input
                type="checkbox"
                name={field.name}
                checked={field.checked}
                onChange={onChange}
              />
            ) : (
              <input
                type={field.type}
                name={field.name}
                value={field.value}
                onChange={onChange}
                disabled={field.disabled}
              />
            )}
          </div>
        ))}
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Form;