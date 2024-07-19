import React from 'react';

const Form = ({ backgroundColor, title, fields, onSubmit }) => {
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      // Handle file input
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      // Handle text input
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

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
                onChange={handleChange}
              />
            ) : (
              <input
                type={field.type}
                name={field.name}
                value={field.value}
                onChange={handleChange}
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
