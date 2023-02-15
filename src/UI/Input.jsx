import React from 'react';

export const Input = ({ id, label, className, total, children, ...attrs }) => {
  return (
    <div className='input'>
      <h3 className='input__title'>{label}</h3>
      <label
        className={total ? 'input__label--total' : 'input__label'}
        htmlFor={id}
      >
        <input id={id} name={id} className={className} {...attrs} />
        {children}
      </label>
    </div>
  );
};
