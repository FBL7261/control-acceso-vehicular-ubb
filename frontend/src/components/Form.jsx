// frontend/src/components/Form.jsx

import React from 'react';

const Form = ({ backgroundColor, title, fields }) => {
  return (
    <div style={{ backgroundColor }}>
      <h1>{title}</h1>
      <form>
        {fields.map((field) => (
          <div key={field.name}>
            <label>{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              value={field.value}
              disabled={field.disabled}
            />
          </div>
        ))}
      </form>
    </div>
  );
};

export default Form;
