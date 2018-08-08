import React from 'react';

const SystemMessage = ({ author, text }) => {
  return (
    <blockquote className="system-message">
      <p>{text}</p>
    </blockquote>
  );
};

export default SystemMessage;
