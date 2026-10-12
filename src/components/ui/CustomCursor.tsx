'use client';

import React, { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [followerPosition, setFollowerPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  const requestRef = useRef<number>();
  const mousePosRef = useRef({ x: -100, y: -100 });
  const followerPosRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Check if device has fine pointer (mouse/trackpad)
    if (typeof window !== 'undefined') {
      const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
      if (!hasFinePointer) {
        setIsTouchDevice(true);
        return;
      }
      setIsTouchDevice(false);
    }

    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Track hover on interactive elements
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(
        'a, button, input, select, textarea, [role="button"], .interactive, .luxury-card, [data-cursor-hover]'
      );
      setIsHovered(!!interactive);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousemove', handleElementHover);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Smooth lerp loop for the outer follower ring
    const animateFollower = () => {
      const speed = 0.18; // smooth lag factor
      const targetX = mousePosRef.current.x;
      const targetY = mousePosRef.current.y;

      followerPosRef.current.x += (targetX - followerPosRef.current.x) * speed;
      followerPosRef.current.y += (targetY - followerPosRef.current.y) * speed;

      setFollowerPosition({
        x: followerPosRef.current.x,
        y: followerPosRef.current.y,
      });

      requestRef.current = requestAnimationFrame(animateFollower);
    };

    requestRef.current = requestAnimationFrame(animateFollower);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousemove', handleElementHover);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Precision Inner Dot (follows cursor instantly) */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9999] transition-transform duration-75 will-change-transform"
        style={{
          transform: `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0) translate(-50%, -50%) scale(${
            isClicked ? 0.6 : isHovered ? 1.4 : 1
          })`,
        }}
      >
        <div 
          className={`w-2 h-2 rounded-full transition-colors duration-200 shadow-sm ${
            isHovered ? 'bg-[#C5A880]' : 'bg-[#171717]'
          }`} 
        />
      </div>

      {/* Smooth Trailing Follower Ring (themed luxury aura) */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[9998] will-change-transform"
        style={{
          transform: `translate3d(${followerPosition.x}px, ${followerPosition.y}px, 0) translate(-50%, -50%)`,
        }}
      >
        <div
          className={`rounded-full transition-all duration-300 ease-out flex items-center justify-center ${
            isHovered
              ? 'w-12 h-12 border border-[#C5A880]/70 bg-[#C5A880]/10 backdrop-blur-[2px] scale-110 shadow-[0_0_20px_rgba(197,168,128,0.25)]'
              : isClicked
              ? 'w-7 h-7 border border-[#171717]/60 bg-[#171717]/5 scale-90'
              : 'w-8 h-8 border border-[#171717]/35 bg-[#EAE1D7]/20 backdrop-blur-[1px]'
          }`}
        >
          {isHovered && (
            <div className="w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-ping opacity-60" />
          )}
        </div>
      </div>
    </>
  );
}
