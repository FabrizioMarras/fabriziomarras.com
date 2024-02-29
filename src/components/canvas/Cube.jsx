import React, { Suspense , useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Decal, Float, OrbitControls, Preload, useTexture } from '@react-three/drei';

import { styles } from '../../styles';

import CanvasLoader from '../Loader';

const Cube = (props) => {
  const [ decal] = useTexture([props.imgUrl])
  const [ isHovered, setIsHovered ] = useState(false);

  return (
    <Float
      speed={1.5}
      rotationIntensity={-2.5}
      floatIntensity={2}
    >
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 0, 0.05]} />
      <mesh 
        castShadow 
        receiveShadow 
        scale={4} 
        rotation={[0, Math.PI / 2.5, 0]}
        onPointerEnter={(event) => (event.stopPropagation(), setIsHovered(true), props.autoRotate(true))}
        onPointerLeave={() => (setIsHovered(false), props.autoRotate(false))}>
        {/* <boxGeometry args={[1, 1, 1]} /> */}
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial 
          color={isHovered ? styles.secondary : styles.tertiary}
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
          // wireframe={isMobile ? false : true}
          wireframe={false}
        />
        <Decal 
          position={[0, 0, 1]}
          rotation={[ 2 * Math.PI, 0, 6.25 ]}
          flatShading
          map={decal}
        />
      </mesh>
    </Float>
  )
}

const CubeCanvas = ({ icon }) => {
  const [shouldAutoRotate, setShouldAutoRotate] = useState(false);

  const handleAutoRotate = (value) => {
    setShouldAutoRotate(value);
  };
  return (
    <Canvas
      frameloop='demand'
      // shadows
      camera={{ position: [25, 0, 0], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          autoRotate={shouldAutoRotate}
          autoRotateSpeed={30}
          // maxPolarAngle={Math.PI / 2}
          // minPolarAngle={Math.PI / 2}
        />
        <Cube imgUrl={icon} autoRotate={handleAutoRotate} />
      </Suspense>
      <Preload all />
    </Canvas>
  )
}
export default CubeCanvas