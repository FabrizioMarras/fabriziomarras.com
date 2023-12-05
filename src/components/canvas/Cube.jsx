import React, { Suspense , useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Decal, Float, OrbitControls, Preload, useTexture } from '@react-three/drei';

import CanvasLoader from '../Loader';

const Cube = (props) => {
  const [ decal] = useTexture([props.imgUrl])
  const [ isHovered, setIsHovered ] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia('(max-width: 639px)');
    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);
    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    }
    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener('change',
    handleMediaQueryChange)
    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener('change',
      handleMediaQueryChange)
    }
  }, [])

  return (
    <Float
      speed={1.75}
      rotationIntensity={-3.5}
      floatIntensity={2}
    >
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 0, 0.05]} />
      <mesh 
        castShadow 
        receiveShadow 
        scale={4} 
        rotation={[0, Math.PI / 2.5, 0]}
        onPointerEnter={(event) => (event.stopPropagation(), setIsHovered(true))}
        onPointerLeave={() => setIsHovered(false)}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial 
          color={isHovered ? "#ec1d24" : "#2dc4b6"}
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
          wireframe={isMobile ? false : true}
        />
        <Decal 
          position={[0, 0, 0]}
          rotation={[ 0, 0, 0 ]}
          flatShading
          map={decal}
        />
      </mesh>
    </Float>
  )
}

const CubeCanvas = ({ icon }) => {
  return (
    <Canvas
      frameloop='demand'
      // shadows
      camera={{ position: [15, 0, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          // maxPolarAngle={Math.PI / 2}
          // minPolarAngle={Math.PI / 2}
        />
        <Cube imgUrl={icon} />
      </Suspense>
      <Preload all />
    </Canvas>
  )
}
export default CubeCanvas