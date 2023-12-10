import React, { Suspense, useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import CanvasLoader from '../Loader';
import { RoundedBox, OrbitControls } from '@react-three/drei';

const Parallelepiped = ({ position, dimensions, rotation, material, radius, smoothness }) => {
  return (
    <RoundedBox
      position={position}
      args={dimensions}
      rotation={rotation}
      radius={radius}
      smoothness={smoothness} >
      <meshStandardMaterial color={material.color} />
    </RoundedBox>
  );
};


const FmLogo = () => {
  const group = useRef();

  const parallelepipedsData = [
    { position: [-1, -15, 0], dimensions: [1, 3, 1], rotation: [0, 0, 0], material: { color: '#ec1d24' }, radius: 0.1, smoothness: 2 },
    { position: [17, 3, 0], dimensions: [1, 3, 1], rotation: [0, 0, Math.PI / 2], material: { color: '#ec1d24' }, radius: 0.1, smoothness: 2 },
    { position: [18, 5, 0], dimensions: [1, 5, 1], rotation: [0, 0, Math.PI / 2], material: { color: '#ec1d24' }, radius: 0.1, smoothness: 2 },
    { position: [1, 15, -1], dimensions: [1, 3, 1], rotation: [0, 0, 0], material: { color: '#f6921f' }, radius: 0.1, smoothness: 2 },
    { position: [3, 18, -1], dimensions: [1, 5, 1], rotation: [0, 0, 0], material: { color: '#f6921f' }, radius: 0.1, smoothness: 2 },
    { position: [5, 20, -1], dimensions: [1, 7, 1], rotation: [0, 0, 0], material: { color: '#f6921f' }, radius: 0.1, smoothness: 2 },
  ];

  const stopPositions = [0, 0, 1, 0, 1, 2];

  const initialDistances = useMemo(() => {
    return parallelepipedsData.map((parallelepiped, index) => {
      const stop = stopPositions[index];
      if (index === 1 || index === 2) {
        return Math.abs(parallelepiped.position[0] - stop);
      } else {
        return Math.abs(parallelepiped.position[1] - stop);
      }
    });
  }, []);

  const [parallelepipeds, setParallelepipeds] = useState(parallelepipedsData);
  const [isAnimationPaused, setIsAnimationPaused] = useState(false);

  useFrame(() => {
    setParallelepipeds((prevParallelepipeds) =>
      prevParallelepipeds.map((parallelepiped, index) => {
        if (isAnimationPaused) return parallelepiped;

        let rotation, finalPosition;
        const stop = stopPositions[index];
        const distance = initialDistances[index];
        const rotationSpeed = ((Math.PI * 1.5) / distance) * 0.1;

        if (index === 1 || index === 2) {
          if (parallelepiped.position[0] > stop) {
            rotation = [parallelepiped.rotation[0] + (rotationSpeed), parallelepiped.rotation[1], parallelepiped.rotation[2]];
            finalPosition = [parallelepiped.position[0] - 0.3, parallelepiped.position[1], parallelepiped.position[2]];
          } else {
            rotation = [0, 0, Math.PI / 2];
            finalPosition = [stop, parallelepiped.position[1], parallelepiped.position[2]];
          }
        } else if (index === 0) {
          if (parallelepiped.position[1] < stop) {
            rotation = [parallelepiped.rotation[0], parallelepiped.rotation[1] + (rotationSpeed), parallelepiped.rotation[2]];
            finalPosition = [parallelepiped.position[0], parallelepiped.position[1] + 0.3, parallelepiped.position[2]];
          } else {
            rotation = [0, 0, 0];
            finalPosition = [parallelepiped.position[0], stop, parallelepiped.position[2]];
          }
        } else {
          if (parallelepiped.position[1] > stop) {
            rotation = [parallelepiped.rotation[0], parallelepiped.rotation[1] + (rotationSpeed), parallelepiped.rotation[2]];
            finalPosition = [parallelepiped.position[0], parallelepiped.position[1] - 0.3, parallelepiped.position[2]];
          } else {
            rotation = [0, 0, 0];
            finalPosition = [parallelepiped.position[0], stop, parallelepiped.position[2]];
          }
        }

        // Check if the last parallelepiped has reached the stop position
        const indexOfLastParallelepiped = initialDistances.indexOf(Math.max(...initialDistances));
        console.log(initialDistances,indexOfLastParallelepiped)
        const isLastParallelepiped = parallelepipeds[indexOfLastParallelepiped].position[1] === stopPositions[indexOfLastParallelepiped];
        if (isLastParallelepiped) {
          setIsAnimationPaused(true);
        }

        return {
          ...parallelepiped,
          rotation,
          position: finalPosition,
        };
      })
    );
  });

  const handleResetAnimation = () => {
    setIsAnimationPaused(false);
    setParallelepipeds(parallelepipedsData);
  };
  
  return (
    <group ref={group} onClick={handleResetAnimation}>
      {parallelepipeds.map((parallelepiped, index) => (
        <Parallelepiped key={index} {...parallelepiped} />
      ))}
    </group>
  );
};

const FmLogoCanvas = () => {
  return (
    <div className="w-full h-screen">
      FmLogo
      <Canvas
        camera={{ position: [0, 0, 50], fov: 25 }}
      >
        <Suspense fallback={<CanvasLoader />}>
          {/* Ambient light */}
          <ambientLight intensity={0.2} />
          {/* Directional light */}
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          {/* Spot light */}
          <spotLight position={[0, 10, 10]} angle={0.5} penumbra={0.2} intensity={0.8} />
          <OrbitControls
            autoRotate={false}
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
          <FmLogo />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default FmLogoCanvas;