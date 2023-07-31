import React from 'react';

const Link = ({ link }) => {
  return (
    <tr>
      <td>{link.name}</td>
      <td>{link.description}</td>
      <td>{link.product}</td>
      <td>{link.form}</td>
    </tr>
  );
};

export default Link;
