import React, { useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Html, usePlane } from '@react-three/drei';

function AIbot() {
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState([]);
  const htmlRef = useRef();

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleSubmitQuestion = () => {
    setAnswers([...answers, { type: 'question', text: question }]);
    setQuestion('');
  };

  const Plane = () => {
    const [ref] = usePlane(() => ({
      rotation: [-Math.PI / 2, 0, 0],
    }));

    return (
      <mesh ref={ref} receiveShadow>
        <planeBufferGeometry attach="geometry" args={[100, 100]} />
        <meshPhysicalMaterial attach="material" color="white" />
      </mesh>
    );
  };

  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      <Canvas>
        {/* Your Three.js scene */}
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <Plane />
        {/* Add more 3D elements for your AIbot interface */}
      </Canvas>
      <Html fullscreen>
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: '10px',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
          }}
          ref={htmlRef}
        >
          {/* Display questions and answers */}
          {answers.map((item, index) => (
            <div key={index}>{item.text}</div>
          ))}
          {/* Input for asking questions */}
          <input
            type="text"
            value={question}
            onChange={handleQuestionChange}
            style={{ marginTop: '10px' }}
          />
          <button onClick={handleSubmitQuestion} style={{ marginTop: '10px' }}>
            Ask
          </button>
        </div>
      </Html>
    </div>
  );
}

export default AIbot;
