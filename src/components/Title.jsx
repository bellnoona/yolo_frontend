import React from 'react';

function Title({ title, i }) {
  return (
    <select>
      <option>{title[i]}</option>
    </select>
  );
}

export default Title;
