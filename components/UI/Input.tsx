import { ChangeEvent, FC, FocusEvent } from 'react';

interface IProps {
  name: string;
  type?: string;
  value: string | undefined;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  errorMessage?: string;
  ContainerClass?: string;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
}

const Input: FC<IProps> = ({
  name,
  type = 'text',
  value,
  onChange,
  required,
  disabled,
  placeholder,
  className,
  ContainerClass,
  errorMessage,
  onBlur,
}) => {
  const isValid = !errorMessage ? 'register-field' : 'error-field';
  return (
    <div
      className={
        ContainerClass ? ContainerClass : errorMessage && 'flex flex-col my-1'
      }
    >
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        className={className ? className : isValid}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        disabled={disabled}
        placeholder={placeholder}
      />
      {errorMessage && (
        <span className='text-red-400 italic text-sm'>{errorMessage}</span>
      )}
    </div>
  );
};

export default Input;
