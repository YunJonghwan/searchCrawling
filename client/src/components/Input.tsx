import type { InputType } from "../types/input";

const Input = ({
  type = 'text',
  placeholder = '',
  className = '',
  name = ''
}: InputType) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={className}
      name={name}
    />
  );
};

export default Input;