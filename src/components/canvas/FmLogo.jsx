import React, { useRef, useEffect, forwardRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useSprings, animated } from '@react-spring/three';
import { RoundedBox, OrbitControls } from '@react-three/drei';

import CanvasLoader from '../Loader';

const Parallelepiped = ({ position, dimensions, rotation, material, radius, smoothness }) => {
  return (
    <RoundedBox
      position={position}
      args={dimensions}
      rotation={rotation}
      radius={radius}
      smoothness={smoothness}>
      <meshStandardMaterial color={material.color} />
    </RoundedBox>
  );
};

const FmLogo = forwardRef((_, ref) => {
  const group = useRef();

  const parallelepipedsData = [
    { position: [-1, 0, 0], dimensions: [1, 3, 1], rotation: [0, 0, 0], material: { color: '#ec1d24' }, radius: 0.1, smoothness: 2 },
    { position: [0, 3, 0], dimensions: [1, 3, 1], rotation: [0, 0, Math.PI / 2], material: { color: '#ec1d24' }, radius: 0.1, smoothness: 2 },
    { position: [1, 5, 0], dimensions: [1, 5, 1], rotation: [0, 0, Math.PI / 2], material: { color: '#ec1d24' }, radius: 0.1, smoothness: 2 },
    { position: [1, 0, -1], dimensions: [1, 3, 1], rotation: [0, 0, 0], material: { color: '#f6921f' }, radius: 0.1, smoothness: 2 },
    { position: [3, 1, -1], dimensions: [1, 5, 1], rotation: [0, 0, 0], material: { color: '#f6921f' }, radius: 0.1, smoothness: 2 },
    { position: [5, 2, -1], dimensions: [1, 7, 1], rotation: [0, 0, 0], material: { color: '#f6921f' }, radius: 0.1, smoothness: 2 },
  ];

  // const parallelepipedsData = [
  //       { position: [-1, -15, 0], dimensions: [1, 3, 1], rotation: [0, 0, 0], material: { color: '#ec1d24' }, radius: 0.1, smoothness: 2 },
  //       { position: [17, 3, 0], dimensions: [1, 3, 1], rotation: [0, 0, Math.PI / 2], material: { color: '#ec1d24' }, radius: 0.1, smoothness: 2 },
  //       { position: [18, 5, 0], dimensions: [1, 5, 1], rotation: [0, 0, Math.PI / 2], material: { color: '#ec1d24' }, radius: 0.1, smoothness: 2 },
  //       { position: [1, 15, -1], dimensions: [1, 3, 1], rotation: [0, 0, 0], material: { color: '#f6921f' }, radius: 0.1, smoothness: 2 },
  //       { position: [3, 18, -1], dimensions: [1, 5, 1], rotation: [0, 0, 0], material: { color: '#f6921f' }, radius: 0.1, smoothness: 2 },
  //       { position: [5, 20, -1], dimensions: [1, 7, 1], rotation: [0, 0, 0], material: { color: '#f6921f' }, radius: 0.1, smoothness: 2 },
  //     ];

  const springsConfig = [
    { mass: 1, tension: 150, friction: 15, bounce: 1, durantion: 50 },   // 0 (simple easy-in animation)
    { mass: 2, tension: 150, friction: 12, bounce: 1, durantion: 30 },   // 1
    { mass: 3, tension: 150, friction: 12, bounce: 1, durantion: 40 },   // 2
    { mass: 1, tension: 150, friction: 11, bounce: 3, durantion: 80, clamp: true },   // 3 (bound animation)
    { mass: 2, tension: 150, friction: 11, bounce: 3, durantion: 80, clamp: true },   // 4 (bound animation)
    { mass: 3, tension: 150, friction: 11, bounce: 3, durantion: 80, clamp: true },   // 5 (bound animation)
  ];

  const stopPositions = [-15, 17, 18, 15, 18, 20];
  // const stopPositions = [0, 0, 1, 0, 1, 2];

  const springs = useSprings(parallelepipedsData.length, (index) => {
    const parallelepiped = parallelepipedsData[index];
    const config = springsConfig[index] || { tension: 0, friction: 0, bounce: 0 };
    const stop = stopPositions[index];
    
    const fromPosition = parallelepiped.position;
    const fromRotation = parallelepiped.rotation;
    const toPosition = [
      (index === 1 || index === 2) ? stop : parallelepiped.position[0],
      (index === 1 || index === 2) ? parallelepiped.position[1] : stop,
      parallelepiped.position[2],
    ];
    const toRotation = [0, 0, (index === 1 || index === 2) ? Math.PI : 0];
    console.log("from positions", fromPosition)
    console.log("to position", toPosition)
    console.log("from rotation", fromRotation)
    console.log("to rotation", toRotation)
    const animation = {
      from: {
        // position: fromPosition,
        // rotation: fromRotation,
        position: toPosition,
        rotation: toRotation
      },
      to: {
        // position: toPosition,
        // rotation: toRotation
        position: fromPosition,
        rotation: fromRotation,
      },
      config: {
        tension: config.tension,
        friction: config.friction,
        bounce: config.bounce,
      },
    }
    return (animation);
  });

  // Now you can use the `api` object to control the animations
  const handleResetAnimation = () => {
    console.log("I am clicked")
    springs[0].forEach((item) => {
        const toPosition = item.position.animation.toValues;
        // const toRotation = item.rotation.animation.toValues;
        springs[1].start({
          position: toPosition,
          // rotation: toRotation,
        })
        console.log("logging item")
        console.log("item", item)
      }
    )
  };
  
  useEffect(() => {
    springs[0].forEach((item) => {
      const toPosition = item.position.animation.toValues;
      // const toRotation = item.rotation.animation.toValues;
      springs[1].start({
        position: toPosition,
        // rotation: toRotation,
      })
      console.log("logging item")
      console.log("item", item)
    }
  )
  }, []); // Trigger animation on mount

  return (
    <group ref={group} onClick={handleResetAnimation}>
      {springs[0].map((item, index) => (
        <animated.group key={index} position={item.position} >
          <Parallelepiped  {...parallelepipedsData[index]}  />
        </animated.group>
      ))}
    </group>
  );
});

const FmLogoCanvas = () => {
  const fmLogoRef = useRef();

  useEffect(() => {
    console.log("REF",fmLogoRef); // This should log the initial position and rotation values
  }, [fmLogoRef]); // Add fmLogoRef.current as a dependency

  return (
    <div className="w-full h-screen">
      FmLogo
      <Canvas ref={fmLogoRef} camera={{ position: [0, 0, 100], fov: 25 }}>
        <Suspense fallback={<CanvasLoader />}>
          {/* Ambient light */}
          <ambientLight intensity={0.2} />
          {/* Directional light */}
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          {/* Spot light */}
          <spotLight position={[0, 10, 10]} angle={0.5} penumbra={0.2} intensity={0.8} />
          <OrbitControls autoRotate={false} enableZoom={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
          <FmLogo ref={fmLogoRef} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default FmLogoCanvas;


// import React, { useState, useRef, useEffect, forwardRef, Suspense } from 'react';
// import { Canvas } from '@react-three/fiber';
// import { useSpring, animated, config } from '@react-spring/three';
// import { RoundedBox, OrbitControls } from '@react-three/drei';

// import CanvasLoader from '../Loader';

// const Bar = ({ position, dimensions, rotation, material, radius, smoothness }) => {
//   return (
//     <RoundedBox
//       position={position}
//       args={dimensions}
//       rotation={rotation}
//       radius={radius}
//       smoothness={smoothness}>
//       <meshStandardMaterial color={material.color} />
//     </RoundedBox>
//   );
// };

// const Logo = forwardRef((_, ref) => {
//   const { group } = useRef;
//   const [active, setActive] = useState(true)

//   const startingConditions = [
//     { position: [-1, 0, 0], dimensions: [1, 3, 1], rotation: [Math.PI / 2, 0, 0], material: { color: '#ec1d24' }, radius: 0.1, smoothness: 2 },
//     { position: [0, 3, 0], dimensions: [1, 3, 1], rotation: [0, Math.PI / 2, Math.PI / 2], material: { color: '#ec1d24' }, radius: 0.1, smoothness: 2 },
//     { position: [1, 5, 0], dimensions: [1, 5, 1], rotation: [0, Math.PI / 2, Math.PI / 2], material: { color: '#ec1d24' }, radius: 0.1, smoothness: 2 },
//     { position: [1, 0, -1], dimensions: [1, 3, 1], rotation: [Math.PI / 2, 0, 0], material: { color: '#f6921f' }, radius: 0.1, smoothness: 2 },
//     { position: [3, 1, -1], dimensions: [1, 5, 1], rotation: [Math.PI / 2, 0, 0], material: { color: '#f6921f' }, radius: 0.1, smoothness: 2 },
//     { position: [5, 2, -1], dimensions: [1, 7, 1], rotation: [Math.PI / 2, 0, 0], material: { color: '#f6921f' }, radius: 0.1, smoothness: 2 },
//   ];

//   const finalConditions = [
//     { position: [-1, -15, 0], dimensions: [1, 3, 1], rotation: [0, 0, 0], material: { color: '#ec1d24' }, radius: 0.1, smoothness: 2 },
//     { position: [17, 3, 0], dimensions: [1, 3, 1], rotation: [0, 0, Math.PI / 2], material: { color: '#ec1d24' }, radius: 0.1, smoothness: 2 },
//     { position: [18, 5, 0], dimensions: [1, 5, 1], rotation: [0, 0, Math.PI / 2], material: { color: '#ec1d24' }, radius: 0.1, smoothness: 2 },
//     { position: [1, 15, -1], dimensions: [1, 3, 1], rotation: [0, 0, 0], material: { color: '#f6921f' }, radius: 0.1, smoothness: 2 },
//     { position: [3, 18, -1], dimensions: [1, 5, 1], rotation: [0, 0, 0], material: { color: '#f6921f' }, radius: 0.1, smoothness: 2 },
//     { position: [5, 20, -1], dimensions: [1, 7, 1], rotation: [0, 0, 0], material: { color: '#f6921f' }, radius: 0.1, smoothness: 2 },
//   ];

//   const springsConfig = [
//     { tension: 100, friction: 10, bounce: 0 },   // 0 (simple easy-in animation)
//     { tension: 150, friction: 12, bounce: 3 },   // 1
//     { tension: 150, friction: 12, bounce: 3 },   // 2
//     { tension: 120, friction: 15, bounce: 0 },   // 3 (bound animation)
//     { tension: 120, friction: 15, bounce: 0 },   // 4 (bound animation)
//     { tension: 120, friction: 15, bounce: 0 },   // 5 (bound animation)
//   ];

//   // const stopPositions = [-15, 17, 18, 15, 18, 20];
//   startingConditions.forEach((index) => {
    
//     const spring = useSpring(() => {
//       const animation = {
//               from: {
//                 position: startingConditions[index].position,
//                 rotation: startingConditions[index].rotation,
//               },
//               to: {
//                 position: finalConditions[index].position,
//                 rotation: finalConditions[index].rotation
//               },
//               config: springsConfig[index],
//             }
//             return (animation);});
//     console.log(spring);
//   });
  

//   const handleResetAnimation = () => {}

//   return (
//         <group ref={group} onClick={handleResetAnimation}>
//           {/* {springs[0].map((item, index) => ( position={item.position}*/}
//             <animated.group key={index} position={position} rotation={rotation} onClick={() => setActive(!active)} >
//               <Bar  {...barsData[index]}  />
//             </animated.group>
//           {/* ))} */}
//         </group>
//       );
// })

// const LogoCanvas = () => {
//   const LogoRef = useRef();

//   useEffect(() => {
//     console.log("REF",LogoRef); // This should log the initial position and rotation values
//   }, [LogoRef]); // Add fmLogoRef.current as a dependency

//   return (
//     <div className="w-full h-screen">
//       FmLogo
//       <Canvas ref={LogoRef} camera={{ position: [0, 0, 100], fov: 25 }}>
//         <Suspense fallback={<CanvasLoader />}>
//           {/* Ambient light */}
//           <ambientLight intensity={0.2} />
//           {/* Directional light */}
//           <directionalLight position={[5, 5, 5]} intensity={0.8} />
//           {/* Spot light */}
//           <spotLight position={[0, 10, 10]} angle={0.5} penumbra={0.2} intensity={0.8} />
//           <OrbitControls autoRotate={false} enableZoom={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
//           <Logo />
//         </Suspense>
//       </Canvas>
//     </div>
//   );
// };

// export default LogoCanvas;