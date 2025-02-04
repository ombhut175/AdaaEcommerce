import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';

export default function Globe({ mousePosition }) {
    const meshRef = useRef();
    const earthTexture = useTexture('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg');

    // Calculate radius based on viewport size
    const radius = window.innerWidth < 768 ? 1.5 : 2;

    useFrame(() => {
        if (!meshRef.current || !mousePosition.current) return;

        // Rotate the globe based on mouse position with limited rotation
        const { x, y } = mousePosition.current;
        const targetRotationY = x * 0.3; // Limit rotation range
        const targetRotationX = y * 0.2; // Limit rotation range

        meshRef.current.rotation.y += (targetRotationY - meshRef.current.rotation.y) * 0.1;
        meshRef.current.rotation.x += (targetRotationX - meshRef.current.rotation.x) * 0.1;
    });

    return (
        <mesh ref={meshRef}>
            <sphereGeometry args={[radius, 64, 64]} />
            <meshStandardMaterial
                map={earthTexture}
                metalness={0.4}
                roughness={0.7}
            />
        </mesh>
    );
}