import { useState } from "react";
import useOpenAIChat from "./shared/openai/hooks/use-openai-chat";
import { Canvas, useFrame } from '@react-three/fiber'



function Box(props) {
  // This reference will give us direct access to the mesh
  const meshRef = useRef()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (meshRef.current.rotation.x += delta))
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}


function App() {
  const [completeText, messages] = useOpenAIChat();
  const [userInput, setUserInput] = useState('');

  return (
      <div>
        <div style={{display: 'flex', flexDirection: 'column', gap: '2.5rem'}}>
          {messages.filter((val) => val.role !== 'system').map(({content, role}, idx) => 
            typeof content === 'string' 
            ? <p key={idx}>{role === 'user' ? 'You' : 'DnD Helper'}: {content}</p> 
            : '')}
        </div>
        <input onChange={(e) => {setUserInput(e.target.value)}}/>
        <button onClick={() => {
          completeText(userInput)
        }}>SEND BLYAT</button>
        <Canvas>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Box position={[-1.2, 0, 0]} />
          <Box position={[1.2, 0, 0]} />
        </Canvas>
      </div>
  )
}

export default App
