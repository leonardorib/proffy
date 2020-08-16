import React, { InputHTMLAttributes } from 'react';

import './styles.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  placeholder: string;
}

const LoginInput: React.FC<InputProps> = ({ placeholder, name, ...rest }) => {
  return (
    <div className='input-block'>
      <input type='text' id={name} placeholder={placeholder} {...rest} />
    </div>
  );
};

export default LoginInput;
