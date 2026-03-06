import React from 'react';

function Button({ text, onClick }) {
  return (
    <button onClick={onClick} style={{ padding: '10px 20px', backgroundColor: '#3498db', color: '#fff', border: 'none', borderRadius: '5px' }}>
      {text}
    </button>
  );
}

export default Button;