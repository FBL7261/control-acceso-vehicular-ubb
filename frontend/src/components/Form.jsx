// src/components/Form.jsx
import React from "react";

const Form = ({ backgroundColor, title, fields }) => {
  return (
    <form style={{ backgroundColor }}>
      <h2>{title}</h2>
      {fields.map((field) => (
        <div key={field.name}>
          <label>
            {field.label}
            <input
              type={field.type}
              name={field.name}
              value={field.value}
              disabled={field.disabled}
            />
          </label>
        </div>
      ))}
    </form>
  );
};

export default Form;
