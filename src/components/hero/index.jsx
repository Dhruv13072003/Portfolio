"use client";

import { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, useGLTF, Text, Float, Bounds } from "@react-three/drei";
import * as THREE from "three";

// 3D Scene Component
function Scene() {
  const meshRef = useRef();

  // Load multiple GLB files
  const character = useGLTF("/models/charcter-model.glb");
  const desk = useGLTF("/models/room-model.glb");

  // Clone scenes to avoid issues
  const characterScene = character.scene.clone();
  const deskScene = desk.scene.clone();

  // Apply colors and materials to both models
  useEffect(() => {
    // Style the character model
    characterScene.traverse((child) => {
      if (child.isMesh) {
        if (
          child.name.toLowerCase().includes("skin") ||
          child.name.toLowerCase().includes("face")
        ) {
          child.material = new THREE.MeshStandardMaterial({
            color: "#fdbcb4", // Skin tone
            roughness: 0.8,
            metalness: 0.0,
          });
        } else if (child.name.toLowerCase().includes("hair")) {
          child.material = new THREE.MeshStandardMaterial({
            color: "#8B4513", // Brown hair
            roughness: 0.9,
            metalness: 0.0,
          });
        } else if (
          child.name.toLowerCase().includes("shirt") ||
          child.name.toLowerCase().includes("clothing")
        ) {
          child.material = new THREE.MeshStandardMaterial({
            color: "#ffffff", // White shirt
            roughness: 0.6,
            metalness: 0.0,
          });
        } else {
          // Default character material
          child.material = new THREE.MeshStandardMaterial({
            color: "#f8f9fa",
            roughness: 0.5,
            metalness: 0.1,
          });
        }
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    // Style the desk/lab model
    deskScene.traverse((child) => {
      if (child.isMesh) {
        const name = child.name.toLowerCase();
        console.log(name);
        // Desk/Table (natural wood look)
        if (name.includes("desk") || name.includes("plant")) {
          child.material = new THREE.MeshStandardMaterial({
            color: "#d2b48c", // Tan (wood tone)
            roughness: 0.5,
            metalness: 0.1,
          });

          // Screens/Monitors (dark glossy)
        } else if (name.includes("penguin-wing-0")) {
          child.material = new THREE.MeshStandardMaterial({
            color: "yellow",
            roughness: 0.5,
            metalness: 0.1,
          });
        } else if (name.includes("penguin-wing-1")) {
          child.material = new THREE.MeshStandardMaterial({
            color: "green",
            roughness: 0.5,
            metalness: 0.1,
          });
        } else {
          child.material = new THREE.MeshStandardMaterial({
            color: "#eceff1", // Light cool gray
            roughness: 0.5,
            metalness: 0.2,
          });
        }

        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [characterScene, deskScene]);

  // Gentle rotation animation
  useFrame((state, delta) => {
    if (meshRef.current) {
      //   meshRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Desk/Lab setup - positioned first (background) */}
      <primitive
        object={deskScene}
        scale={[1, 1, 1]}
        position={[0, 0, 0]}
        rotation={[0, 0, 0]}
      />

      {/* Character - positioned in front of desk */}
      <primitive
        object={characterScene}
        scale={[1, 1, 1]}
        position={[0, 0, 0]}
        rotation={[0, Math.PI * 0.1, 0]}
      />
    </group>
  );
}

// Lighting setup
function Lighting() {
  return (
    <>
      {/* Warm ambient light */}
      <ambientLight intensity={0.4} color="#fff4e6" />

      {/* Main directional light */}
      <directionalLight
        position={[5, 5, 5]}
        intensity={1}
        color="#fff4e6"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      {/* Fill light */}
      <directionalLight
        position={[-5, 3, -5]}
        intensity={0.3}
        color="#ffa726"
      />

      {/* Subtle point light for highlights */}
      {/* <pointLight
        position={[0, 5, 0]}
        intensity={0.5}
        color="#fff"
        distance={20}
      /> */}
    </>
  );
}

// Loading fallback
function Loader() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
    </div>
  );
}

// Main Hero Section Component
export default function HeroSection() {
  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-400/5 to-blue-400/5"></div>

      <div className="container mx-auto px-6 h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left side - Text content */}
          {/* <div className="space-y-8 z-10">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
                Hi, my
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">
                  name is David.
                </span>
              </h1>

              <p className="text-xl lg:text-2xl text-gray-600 max-w-lg">
                I love creating beautiful user experiences.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                Get in touch
              </button>

              <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-full hover:border-orange-500 hover:text-orange-500 transition-all duration-300">
                View my work
              </button>
            </div>
            <div className="flex space-x-6 pt-8">
              <a
                href="#"
                className="text-gray-400 hover:text-orange-500 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-orange-500 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-orange-500 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div> */}

          {/* Right side - 3D Canvas */}
          <div className="absolute w-full h-full top-0 left-0 z-50">
            <Canvas
              camera={{ position: [8, 4, 10], fov: 35 }}
              shadows
              className="w-full h-full"
              gl={{ toneMapping: THREE.ACESFilmicToneMapping }}
            >
              <Suspense fallback={null}>
                <Lighting />
                <Bounds fit observe margin={1.2}>
                  <Scene />
                </Bounds>
                <OrbitControls
                  enablePan={false}
                  enableZoom={true}
                  maxPolarAngle={Math.PI / 2}
                  minPolarAngle={Math.PI / 3}
                  makeDefault
                  //   autoRotate
                  //   autoRotateSpeed={0.5}
                />
              </Suspense>
            </Canvas>

            {/* Loading overlay */}
            <Suspense fallback={<Loader />}>
              <div></div>
            </Suspense>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-orange-200 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-blue-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
    </div>
  );
}
