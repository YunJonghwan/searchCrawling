import type { InputType } from "../types/input";

const Input = ({
  type = 'text',
  placeholder = '',
  className = '',
  name = '',
  onChange
}: InputType) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={className}
      name={name}
      onChange={onChange}
    />
  );
};

export default Input;