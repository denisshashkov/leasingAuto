import React from 'react';

export const RangeInput = ({ style, ...attrs }) => {
  return (
    <div className='input__range'>
      <input type='range' {...attrs} />
      <div className='input__progressBar' style={style}></div>
    </div>
  );
};
