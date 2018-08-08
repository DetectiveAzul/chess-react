import React from 'react';

const SystemMessage = ({ author, text }) => {
  return (
    <div className="system-message">
      <p>{text}</p>
    </div>
  );
};

export default SystemMessage;
