import React from 'react';

function Tab({ id, active, onChange, title }) {
  return (
    <button 
      className={`tab ${active ? 'active' : ''}`} 
      onClick={() => onChange(id)}
    >
      {title}
    </button>
  );
}

export default Tab;