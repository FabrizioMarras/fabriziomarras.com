import React, { Suspense, useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import CanvasLoader from '../Loader';
import { RoundedBox, OrbitControls, useHelper } from '@react-three/drei';

import { styles } from '../../styles';

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

const FmLogo = ({ position, rotation, scale }) => {
  const group = useRef();

  const parallelepipedsData = [
    { position: [-1, -20, 0], dimensions: [1, 3, 1], rotation: [0, 0, 0], material: { color: `${styles.secondary}` }, radius: 0.1, smoothness: 2 },
    { position: [+30, 3, 0], dimensions: [1, 3, 1], rotation: [0, 0, Math.PI / 2], material: { color: `${styles.secondary}` }, radius: 0.1, smoothness: 2 },
    { position: [+50, 5, 0], dimensions: [1, 5, 1], rotation: [0, 0, Math.PI / 2], material: { color: `${styles.secondary}` }, radius: 0.1, smoothness: 2 },
    { position: [1, 26, 0], dimensions: [1, 3, 1], rotation: [0, 0, 0], material: { color: `${styles.primary}` }, radius: 0.1, smoothness: 2 },
    { position: [3, 44, 0], dimensions: [1, 5, 1], rotation: [0, 0, 0], material: { color: `${styles.primary}` }, radius: 0.1, smoothness: 2 },
    { position: [5, 66, 0], dimensions: [1, 7, 1], rotation: [0, 0, 0], material: { color: `${styles.primary}` }, radius: 0.1, smoothness: 2 },
  ];
  // stop position is an array of only the positions which are changing with respect to the beginning positions from the parallelepipedsData
  // so the 0 item of the array is the position Y of the parallelepiped 0, the position 1 of the array will be the X position of the parallelepiped 1, and so on.
  const stopPositions = [0, 0, 1, 0, 1, 2];
  // using memo to memorize the initial position in order to be able to calcul;ate the distance to use to fix the rotation in function of the distance..
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

  // ANIMATION :
  useFrame(() => {
    setParallelepipeds((prevParallelepipeds) =>
      prevParallelepipeds.map((parallelepiped, index) => {
        if (isAnimationPaused) return parallelepiped;

        let rotation, finalPosition;
        const stop = stopPositions[index];
        const distance = initialDistances[index];
        const rotationSpeed = ((Math.PI * 3.5) / distance) * 0.3;

        // Animation of the two horizontal red parallelepipeds
        if (index === 1 || index === 2) {
          if (parallelepiped.position[0] > stop) {
            rotation = [parallelepiped.rotation[0] + (rotationSpeed), parallelepiped.rotation[1], parallelepiped.rotation[2]];
            finalPosition = [parallelepiped.position[0] - 0.3, parallelepiped.position[1], parallelepiped.position[2]];
          } else {
            rotation = [0, 0, Math.PI / 2];
            finalPosition = [stop, parallelepiped.position[1], parallelepiped.position[2]];
          }
          // Animation of the vertical red parallelepiped
        } else if (index === 0) {
          if (parallelepiped.position[1] < stop) {
            rotation = [parallelepiped.rotation[0], parallelepiped.rotation[1] + (rotationSpeed), parallelepiped.rotation[2]];
            finalPosition = [parallelepiped.position[0], parallelepiped.position[1] + 0.3, parallelepiped.position[2]];
          } else {
            rotation = [0, 0, 0];
            finalPosition = [parallelepiped.position[0], stop, parallelepiped.position[2]];
          }
          // Animation of the vertical orange parallelepipeds
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
        // console.log(initialDistances, indexOfLastParallelepiped)
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

  // When clicking the animation starts over
  const handleResetAnimation = () => {
    setIsAnimationPaused(false);
    setParallelepipeds(parallelepipedsData);
  };

  return (
    <group ref={group} scale={scale} position={position} rotation={rotation} onClick={handleResetAnimation}>
      {parallelepipeds.map((parallelepiped, index) => (
        <Parallelepiped key={index} {...parallelepiped} />
      ))}
    </group>
  );
};

const FmLogoCanvas = ({autoRotation, logoRotation = 0, scale, style}) => {

  const spotLightRef = useRef();
  // useHelper(spotLightRef, spotLightHelper, 1, "red");
  return (
      <Canvas
        style={style}
        camera={{ position: [0, 0, 50], aspect: 1, fov: 25 }}
        frameloop='demand'
      >
        <Suspense fallback={<CanvasLoader />}>
          {/* Ambient light */}
          <ambientLight intensity={0.35} />
          {/* Directional light */}
          <directionalLight position={[-1, 0, -10]} intensity={0.6} />
          {/* Spot light */}
          <spotLight ref={spotLightRef} position={[5, 5, 7]} angle={Math.PI / 4} penumbra={0.6} intensity={90} />
          <spotLight ref={spotLightRef} position={[-2, 5, -7]} angle={Math.PI / 1} penumbra={0.6} intensity={75} />
          <spotLight ref={spotLightRef} position={[-8, 5, 3]} angle={Math.PI / 1} penumbra={0.6} intensity={170} />
          <OrbitControls
            target={[-0.5,0,1.5]}
            autoRotate={autoRotation}
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
          {/* <FmLogo scale={scale} position={[-1.5, 0, -2]} rotation={[0, logoRotation, 0]}/> */}
          <FmLogo scale={scale} position={[-2, 0, 0]} rotation={[0, logoRotation, 0]}/>
        </Suspense>
      </Canvas>
  );
};

export default FmLogoCanvas;