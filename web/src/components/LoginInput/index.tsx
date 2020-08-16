import React, { InputHTMLAttributes } from 'react';

import './styles.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  placeholder: string;
  type: string;
}

const LoginInput: React.FC<InputProps> = ({
  type,
  placeholder,
  name,
  ...rest
}) => {
  return (
    <div className='input-block'>
      <input
        type={type}
        id={name}
        placeholder={placeholder}
        required
        {...rest}
      />
    </div>
  );
};

export default LoginInput;
