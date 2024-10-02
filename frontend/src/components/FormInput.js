// components/FormInput.js
import React from "react";

const FormInput = ({
  label,
  icon: Icon,
  placeholder,
  type = "text",
  ...props
}) => {
  return (
    <div className="form-control relative">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      {Icon && (
        <Icon
          className="absolute left-3 top-[60px] transform -translate-y-1/2 text-pink-600"
          size={20}
        />
      )}
      <input
        type={type}
        placeholder={placeholder}
        className="input input-bordered pl-10 w-full"
        {...props} // Spread any additional props like `name`, `value`, `onChange`
      />
    </div>
  );
};

export default FormInput;
