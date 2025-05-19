export interface InputType {
  type?: string;
  placeholder?: string;
  className?: string;
  name?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}