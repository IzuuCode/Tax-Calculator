import { ChangeEvent } from 'react';

interface FormInputProps {
  label: string;
  id: string;
  value: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

const FormInput = ({ 
  label, 
  id, 
  value, 
  placeholder, 
  onChange, 
  type = 'text' 
}: FormInputProps) => {
  return (
    <div className="mb-6">
      <label htmlFor={id} className="block mb-2 font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
      />
    </div>
  );
};

export default FormInput;