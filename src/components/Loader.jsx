import { Html, useProgress } from '@react-three/drei';

const Loader = () => {
  const { progress } = useProgress();

  return (
    <Html>
      <span className="canvas-loader"></span>
      <p
        style={{
          fontSize: 26,
          color: '#2dc4b6',
          fontWeight: 600,
          marginTop: 120,
        }}
      >{progress.toFixed(2)}%</p>
    </Html>

  )
}

export default Loader