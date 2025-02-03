import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';

export default function Hologram() {
  const meshRef = useRef();
  // Using a reliable tech-themed image
  const hologramTexture = useTexture('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80', 
    // Fallback in case texture fails to load
    (texture) => {
      texture.needsUpdate = true;
    }
  );
  
  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Create floating animation
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    // Slow constant rotation
    meshRef.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={meshRef} position={[4, 0, 0]}>
      <planeGeometry args={[2, 3]} />
      <meshPhongMaterial
        map={hologramTexture}
        transparent={true}
        opacity={0.7}
        color="#00ffff"
        emissive="#00ffff"
        emissiveIntensity={0.5}
      />
      {/* Hologram scan line effect */}
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[2, 0.02]} />
        <meshBasicMaterial
          transparent={true}
          opacity={0.5}
          color="#00ffff"
        />
      </mesh>
    </mesh>
  );
}