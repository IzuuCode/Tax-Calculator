interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  label: string;
  name: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
}

const RadioGroup = ({ label, name, options, value, onChange }: RadioGroupProps) => {
  return (
    <div className="mb-6">
      <p className="block mb-2 font-medium text-gray-700">{label}</p>
      <div className="flex space-x-6">
        {options.map((option) => (
          <div key={option.value} className="flex items-center">
            <input
              id={`${name}-${option.value}`}
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <label
              htmlFor={`${name}-${option.value}`}
              className="ml-2 text-gray-700"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RadioGroup;