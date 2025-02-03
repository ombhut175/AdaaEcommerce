// import { Canvas } from '@react-three/fiber';
// import { OrbitControls } from '@react-three/drei';
// import { useRef } from 'react';
// import Globe from './Globe';
// import Hologram from '../Hologram/Hologram';
//
// export default function GlobeContainer() {
//   const mousePosition = useRef({ x: 0, y: 0 });
//
//   const handleMouseMove = (e) => {
//     const { clientX, clientY } = e;
//     mousePosition.current = {
//       x: (clientX / window.innerWidth) * 2 - 1,
//       y: -(clientY / window.innerHeight) * 2 + 1,
//     };
//   };
//
//   return (
//     <div
//       className="w-full h-screen cursor-move"
//       onMouseMove={handleMouseMove}
//     >
//       <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
//         <ambientLight intensity={0.5} />
//         <pointLight position={[10, 10, 10]} intensity={1} />
//         <Globe mousePosition={mousePosition} />
//         <Hologram />
//         <OrbitControls enableZoom={true} enablePan={false} />
//       </Canvas>
//     </div>
//   );
// }