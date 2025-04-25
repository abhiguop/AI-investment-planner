import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const BackgroundAnimation = () => {
  const containerRef = useRef(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75, 
      window.innerWidth / window.innerHeight, 
      0.1, 
      1000
    );
    camera.position.z = 30;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    
    // Cleanup existing canvas
    if (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild);
    }
    
    containerRef.current.appendChild(renderer.domElement);
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCnt = 2000;
    const posArray = new Float32Array(particlesCnt * 3);
    
    for (let i = 0; i < particlesCnt * 3; i++) {
      // Create X, Y, Z positions for each particle
      posArray[i] = (Math.random() - 0.5) * 70;
    }
    
    particlesGeometry.setAttribute(
      'position', 
      new THREE.BufferAttribute(posArray, 3)
    );
    
    // Particle material
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.1,
      color: new THREE.Color(0x4a00e0),
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });
    
    // Particle system
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Create a few larger, colored particles
    const createSpecialParticles = (color, count, sizeRange) => {
      const geometry = new THREE.BufferGeometry();
      const vertices = [];
      
      for (let i = 0; i < count; i++) {
        const x = (Math.random() - 0.5) * 70;
        const y = (Math.random() - 0.5) * 70;
        const z = (Math.random() - 0.5) * 70;
        
        vertices.push(x, y, z);
      }
      
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
      
      const material = new THREE.PointsMaterial({
        size: sizeRange[0] + Math.random() * (sizeRange[1] - sizeRange[0]),
        color: new THREE.Color(color),
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true
      });
      
      const points = new THREE.Points(geometry, material);
      scene.add(points);
      
      return points;
    };
    
    // Create special colored particles
    const blueParticles = createSpecialParticles(0x00b8d4, 50, [0.2, 0.4]);
    const goldParticles = createSpecialParticles(0xffd700, 30, [0.2, 0.5]);
    const greenParticles = createSpecialParticles(0x00c853, 20, [0.2, 0.4]);
    
    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Mouse movement effect
    let mouseX = 0;
    let mouseY = 0;
    
    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Animation loop
    const clock = new THREE.Clock();
    
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      // Rotate particle systems
      particlesMesh.rotation.x = elapsedTime * 0.05;
      particlesMesh.rotation.y = elapsedTime * 0.03;
      
      blueParticles.rotation.y = elapsedTime * 0.04;
      blueParticles.rotation.x = elapsedTime * 0.02;
      
      goldParticles.rotation.y = -elapsedTime * 0.03;
      goldParticles.rotation.z = elapsedTime * 0.02;
      
      greenParticles.rotation.z = elapsedTime * 0.03;
      greenParticles.rotation.x = -elapsedTime * 0.02;
      
      // Respond to mouse movement
      particlesMesh.rotation.x += mouseY * 0.0005;
      particlesMesh.rotation.y += mouseX * 0.0005;
      
      renderer.render(scene, camera);
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      scene.remove(particlesMesh);
      scene.remove(blueParticles);
      scene.remove(goldParticles);
      scene.remove(greenParticles);
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []);
  
  return <div ref={containerRef} className="fixed top-0 left-0 w-full h-full -z-10" />;
};