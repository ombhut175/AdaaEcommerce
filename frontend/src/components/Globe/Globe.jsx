// import { useRef } from 'react';
// import { useFrame } from '@react-three/fiber';
// import { useTexture } from '@react-three/drei';
//
// export default function Globe({ mousePosition }) {
//   const meshRef = useRef();
//   const earthTexture = useTexture('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg');
//
//   useFrame(() => {
//     if (!meshRef.current || !mousePosition.current) return;
//
//     // Rotate the globe based on mouse position
//     const { x, y } = mousePosition.current;
//     meshRef.current.rotation.y += (x * 0.01 - meshRef.current.rotation.y) * 0.1;
//     meshRef.current.rotation.x += (y * 0.01 - meshRef.current.rotation.x) * 0.1;
//   });
//
//   return (
//     <mesh ref={meshRef}>
//       <sphereGeometry args={[2, 64, 64]} />
//       <meshStandardMaterial
//         map={earthTexture}
//         metalness={0.4}
//         roughness={0.7}
//       />
//     </mesh>
//   );
// }