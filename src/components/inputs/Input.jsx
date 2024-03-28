import React from "react";
import './style.css'
const Input = ({ label, state, setState, placeholder, type }) => {
  return (
    <div className="input-main">
      <p className="label">{label}</p>
      <input
        type={type}
        placeholder={placeholder}
        value={state}
        onChange={(e) => setState(e.target.value)}
        className="form-inputs"
      />
    </div>
  );
};

export default Input;
