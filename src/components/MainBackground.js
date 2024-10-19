import React from 'react';
import { useSpring, animated } from 'react-spring';

function AnimatedBackground() {
  const props = useSpring({
    from: { 
      backgroundPosition: '0% 50%',
    },
    to: { 
      backgroundPosition: '100% 50%',
    },
    config: { duration: 5000 },
    loop: true,
  });

  return (
    <animated.div
      style={{
        ...props,
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(45deg, #ff00ff, #00ffff, #ff00ff)',
        backgroundSize: 'auto',
      }}
    >
      {/* Contenu de votre application */}
    </animated.div>
  );
}

export default AnimatedBackground;
