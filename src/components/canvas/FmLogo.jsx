import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box } from '@react-three/drei';
import CanvasLoader from '../Loader';

const AnimatedParallelepipeds = () => {
  const group = useRef();

  // Use the useFrame hook to animate the parallelepipeds
  useFrame(() => {
    // Rotate the group of parallelepipeds
    group.current.rotation.x += 0.01;
    group.current.rotation.y += 0.01;
  });

  return (
    <group ref={group}>
      {/* Create multiple parallelepipeds in a grid */}
      {Array.from({ length: 5 }, (_, index) => (
        <Box key={index} position={[(index - 2) * 2, 0, 0]} args={[1, 2, 3]}>
          {/* Set the dimensions of each parallelepiped using the args prop */}
          {/* You can customize the appearance of each parallelepiped here */}
          <meshStandardMaterial color={'#00ff00'} />
        </Box>
      ))}
    </group>
  );
};

const FmLogo = () => {
  return (
    <div className="w-full h-screen">
      <Canvas>
        <Suspense fallback={<CanvasLoader />}>
          {/* Add lights and camera for better visibility */}
          <ambientLight />
          <pointLight position={[10, 10, 10]} />

          {/* Render the animated parallelepipeds */}
          <AnimatedParallelepipeds />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default FmLogo;
