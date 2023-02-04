import React from "react";

export default function InputCyan({
  id,
  name,
  type,
  value,
  setvalue,
  required,
  tamaño,
  lectura,
  min,
  placeholder,
  disabled,
  className = "w-full rounded-[2px] border border-gray-300 px-3 py-2 placeholder-gray-500 focus:z-10 focus:border-cyan-700 focus:outline-none focus:ring-cyan-700 sm:text-sm",
}) {
  return (
    <div>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        required={required}
        maxLength={tamaño}
        className={className}
        placeholder={placeholder}
        minLength={min}
        onChange={(e) => setvalue(e.target.value)}
        readOnly={lectura}
        disabled={disabled}
      />
    </div>
  );
}
