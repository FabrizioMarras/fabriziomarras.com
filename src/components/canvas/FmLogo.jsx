import React, { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box } from '@react-three/drei';
import CanvasLoader from '../Loader';

const AnimatedParallelepipeds = () => {
  const group = useRef();

  // Define state variable to control properties for each parallelepiped
  const [parallelepipeds, setParallelepipeds] = useState([
    { position: [-3, 0, 0], dimensions: [1, 2, 3], rotation: [0, 0, 0] },
    { position: [-1, 0, 0], dimensions: [1.5, 2, 2], rotation: [0, 0, 0] },
    { position: [1, 0, 0], dimensions: [2, 1, 3], rotation: [0, 0, 0] },
    { position: [3, 0, 0], dimensions: [1, 3, 2], rotation: [0, 0, 0] },
    { position: [5, 0, 0], dimensions: [2, 2, 2], rotation: [0, 0, 0] },
    { position: [7, 0, 0], dimensions: [1, 1, 4], rotation: [0, 0, 0] },
  ]);

  // Use the useFrame hook to animate each parallelepiped independently
  useFrame(() => {
    // Update the rotation for each parallelepiped
    setParallelepipeds(prevParallelepipeds =>
      prevParallelepipeds.map(parallelepiped => ({
        ...parallelepiped,
        rotation: [parallelepiped.rotation[0] + 0.01, parallelepiped.rotation[1] + 0.01, 0],
      }))
    );
  });

  return (
    <group ref={group}>
      {/* Create parallelepipeds based on the state array */}
      {parallelepipeds.map((parallelepiped, index) => (
        <Box
          key={index}
          position={parallelepiped.position}
          args={parallelepiped.dimensions}
          rotation={parallelepiped.rotation}
        >
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
    <div>
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
