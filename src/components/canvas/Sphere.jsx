import React, { Suspense , useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, Preload } from '@react-three/drei';
import * as THREE from 'three';

import CanvasLoader from '../Loader';

const Sphere = () => {
//   const [lineWidth] =useState(10)
  const [ isHovered, setIsHovered ] = useState(false);

  const ref = useRef();

  const rotationSpeed = isHovered ? 0.2 : 0.05;

  useFrame(() => {
    if (ref.current) {
      // Rotate the sphere
      ref.current.rotation.y += rotationSpeed * 0.05;
    }
  });

  return (
    <Float>
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 0, 0.05]} />
      <mesh 
        ref={ref}
        castShadow 
        receiveShadow 
        scale={2.5} 
        rotation={[0, 0, 0]}
        position={[0, 0, 0]}
        onPointerEnter={(event) => (event.stopPropagation(), setIsHovered(true))}
        onPointerLeave={() => setIsHovered(false)}>
        <sphereGeometry position={[0, 0, 0]}/>
        <meshStandardMaterial 
          color={isHovered ? "#ec1d24" : "#2dc4b6"}
          wireframe
        //   attach="material"
        //   uniforms={{ lineWidth: { value: lineWidth } }}
        //   side={THREE.DoubleSide}
        //   extensions={{ derivatives: true }}
        />
      </mesh>
    </Float>
  )
}

const SphereCanvas = () => {
  return (
    <Canvas
      frameloop='always'
      camera={{ position: [15, 0, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Sphere />
      </Suspense>
      <Preload all />
    </Canvas>
  )
}
export default SphereCanvas