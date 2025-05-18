import type { InputProps } from "../types/input";

const Input = ({
  type = 'text',
  placeholder = '',
  className = '',
}: InputProps) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={className}
    />
  );
};

export default Input;