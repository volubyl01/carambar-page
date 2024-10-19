import React, { useState, useCallback } from 'react';
import './RippleButton.css';

const RippleButton = ({ children, onClick, className = '' }) => {
  const [ripples, setRipples] = useState([]);

  const addRipple = useCallback((event) => {
    const button = event.currentTarget.getBoundingClientRect();
    const size = Math.max(button.width, button.height);
    const x = event.clientX - button.left - size / 2;
    const y = event.clientY - button.top - size / 2;

    const newRipple = {
      x,
      y,
      size,
      id: Date.now()
    };

    setRipples((prevRipples) => [...prevRipples, newRipple]);

    if (onClick) {
      onClick(event);
    }
  }, [onClick]);

  return (
    <button className={`ripple-button`} onClick={addRipple}>
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          style={{
            top: ripple.y,
            left: ripple.x,
            width: ripple.size,
            height: ripple.size,
          }}
        />
      ))}
      {children}
    </button>
  );
};

export default RippleButton;
