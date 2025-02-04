import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';

export default function Hologram() {
    const meshRef = useRef();
    const [dimensions, setDimensions] = useState({ width: 2, height: 3, xPosition: 4 });

    const hologramTexture = useTexture('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
        (texture) => {
            texture.needsUpdate = true;
        }
    );

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 480) {
                setDimensions({ width: 1, height: 1.5, xPosition: 2.2 }); // Extra small devices
            } else if (window.innerWidth <= 768) {
                setDimensions({ width: 1.3, height: 1.95, xPosition: 2.5 }); // Small devices
            } else if (window.innerWidth <= 1024) {
                setDimensions({ width: 1.7, height: 2.55, xPosition: 3.2 }); // Medium devices
            } else {
                setDimensions({ width: 2, height: 3, xPosition: 4 }); // Large devices
            }
        };

        // Set initial size
        handleResize();

        // Add resize listener
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useFrame((state) => {
        if (!meshRef.current) return;

        // Create subtle floating animation
        meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
        // Slow constant rotation
        meshRef.current.rotation.y += 0.01;
    });

    return (
        <mesh ref={meshRef} position={[dimensions.xPosition, 0, 0]}>
            <planeGeometry args={[dimensions.width, dimensions.height]} />
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
                <planeGeometry args={[dimensions.width, 0.02]} />
                <meshBasicMaterial
                    transparent={true}
                    opacity={0.5}
                    color="#00ffff"
                />
            </mesh>
        </mesh>
    );
}