import React, { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box } from '@react-three/drei';
import CanvasLoader from '../Loader';

const AnimatedParallelepipeds = () => {
  const group = useRef();

  // Define state variables to control rotation for each parallelepiped
  const [rotations, setRotations] = useState(Array.from({ length: 5 }, () => ({ x: 0, y: 0 })));

  // Use the useFrame hook to animate each parallelepiped independently
  useFrame(() => {
    // Update the rotations based on the current state
    setRotations(prevRotations =>
      prevRotations.map(rotation => ({
        x: rotation.x + 0.01,
        y: rotation.y + 0.01,
      }))
    );
  });

  return (
    <group ref={group}>
      {/* Create multiple parallelepipeds in a grid */}
      {rotations.map((rotation, index) => (
        <Box key={index} position={[(index - 2) * 2, 0, 0]} args={[1, 2, 3]} rotation={[rotation.x, rotation.y, 0]}>
          {/* Set the dimensions and rotation of each parallelepiped */}
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
      FmLogo
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
