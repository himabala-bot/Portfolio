"use client";

import * as React from "react";
import { useState, useRef, useEffect, useCallback } from "react";

interface MouseFollowingEyesProps {
  className?: string;
  eyeClassName?: string;
  pupilClassName?: string;
  eyelidClassName?: string;
  blinkInterval?: number;
}

const MouseFollowingEyes: React.FC<MouseFollowingEyesProps> = ({
  className = "",
  eyeClassName = "",
  pupilClassName = "",
  eyelidClassName = "bg-accent-pink",
  blinkInterval = 6000,
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const eye1Ref = useRef<HTMLDivElement>(null);
  const eye2Ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleTouch = (e: TouchEvent) => {
      if (e.touches && e.touches[0]) {
        setMousePos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
      }
    };

    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const tiltX = Math.max(-45, Math.min(45, e.gamma || 0));
        const tiltY = Math.max(-45, Math.min(45, (e.beta || 45) - 45));

        const targetX = centerX + (tiltX / 45) * (window.innerWidth * 0.9);
        const targetY = centerY + (tiltY / 45) * (window.innerHeight * 0.9);

        setMousePos({ x: targetX, y: targetY });
      }
    };

    window.addEventListener("mousemove", handleGlobalMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouch, { passive: true });
    window.addEventListener("touchstart", handleTouch, { passive: true });
    window.addEventListener("deviceorientation", handleOrientation, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleGlobalMouseMove);
      window.removeEventListener("touchmove", handleTouch);
      window.removeEventListener("touchstart", handleTouch);
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, []);

  
  useEffect(() => {
    let blinkTimeout: NodeJS.Timeout;
    let resetTimeout: NodeJS.Timeout;
    let isMounted = true;

    const triggerBlink = () => {
      if (!isMounted) return;
      setIsBlinking(true);

      
      resetTimeout = setTimeout(() => {
        if (!isMounted) return;
        setIsBlinking(false);

        
        blinkTimeout = setTimeout(triggerBlink, blinkInterval);
      }, 180);
    };

    blinkTimeout = setTimeout(triggerBlink, blinkInterval);

    return () => {
      isMounted = false;
      clearTimeout(blinkTimeout);
      clearTimeout(resetTimeout);
    };
  }, [blinkInterval]);

  const manualBlink = useCallback(() => {
    setIsBlinking(true);
    setTimeout(() => setIsBlinking(false), 180);
  }, []);

  return (
    <div
      className={`flex items-center justify-center cursor-pointer select-none ${className}`}
      onMouseMove={handleMouseMove}
      onClick={manualBlink}
      title="Click to wink!"
    >
      <div className="flex items-center gap-3 sm:gap-4 md:gap-5">
        <Eye
          mouseX={mousePos.x}
          mouseY={mousePos.y}
          isBlinking={isBlinking}
          selfRef={eye1Ref as React.RefObject<HTMLDivElement>}
          otherRef={eye2Ref as React.RefObject<HTMLDivElement>}
          eyeClassName={eyeClassName}
          pupilClassName={pupilClassName}
          eyelidClassName={eyelidClassName}
        />
        <Eye
          mouseX={mousePos.x}
          mouseY={mousePos.y}
          isBlinking={isBlinking}
          selfRef={eye2Ref as React.RefObject<HTMLDivElement>}
          otherRef={eye1Ref as React.RefObject<HTMLDivElement>}
          eyeClassName={eyeClassName}
          pupilClassName={pupilClassName}
          eyelidClassName={eyelidClassName}
        />
      </div>
    </div>
  );
};

interface EyeProps {
  mouseX: number;
  mouseY: number;
  isBlinking: boolean;
  selfRef: React.RefObject<HTMLDivElement>;
  otherRef: React.RefObject<HTMLDivElement>;
  eyeClassName?: string;
  pupilClassName?: string;
  eyelidClassName?: string;
}

const Eye: React.FC<EyeProps> = ({
  mouseX,
  mouseY,
  isBlinking,
  selfRef,
  otherRef,
  eyeClassName = "",
  pupilClassName = "",
  eyelidClassName = "bg-accent-pink",
}) => {
  const pupilRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!selfRef.current) return;
    const rect = selfRef.current.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    
    const isInside = (ref: React.RefObject<HTMLDivElement>) => {
      const r = ref.current?.getBoundingClientRect();
      if (!r) return false;
      return (
        mouseX >= r.left &&
        mouseX <= r.right &&
        mouseY >= r.top &&
        mouseY <= r.bottom
      );
    };

    if (isInside(selfRef) || isInside(otherRef)) {
      if (pupilRef.current) {
        pupilRef.current.style.transform = 'translate(0px, 0px)';
      }
      return;
    }

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = mouseX - centerX;
    const dy = mouseY - centerY;
    const angle = Math.atan2(dy, dx);

    const pupilW = pupilRef.current?.offsetWidth || 24;
    const pupilH = pupilRef.current?.offsetHeight || 24;
    const radiusX = Math.max(0, (rect.width - pupilW) / 2);
    const radiusY = Math.max(0, (rect.height - pupilH) / 2);

    const maxMoveX = radiusX * 0.62;
    const maxMoveY = radiusY * 0.62;
    const pupilX = Math.cos(angle) * maxMoveX;
    const pupilY = Math.sin(angle) * maxMoveY;

    if (pupilRef.current) {
      pupilRef.current.style.transform = `translate(${pupilX}px, ${pupilY}px)`;
    }
  }, [mouseX, mouseY, selfRef, otherRef]);

  return (
    <div
      ref={selfRef}
      className={`relative bg-white rounded-[50%/50%] flex items-center justify-center shadow-[0_10px_25px_-5px_rgba(5,5,5,0.12)] overflow-hidden transition-all duration-300 ${
        eyeClassName || 'w-14 h-20 sm:w-16 sm:h-24 md:w-20 md:h-28'
      }`}
    >
      
      <div
        ref={pupilRef}
        className={`absolute bg-ink rounded-full aspect-square transition-transform duration-75 ease-out flex items-start justify-end p-1 sm:p-1.5 ${
          pupilClassName || 'h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7'
        }`}
      >
        <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 bg-white/95 rounded-full block" />
      </div>

      
      <div
        className={`absolute top-0 inset-x-0 ${eyelidClassName} z-20 pointer-events-none transition-all duration-150 ease-in-out ${
          isBlinking ? 'h-[51%]' : 'h-0'
        }`}
      />

      
      <div
        className={`absolute bottom-0 inset-x-0 ${eyelidClassName} z-20 pointer-events-none transition-all duration-150 ease-in-out ${
          isBlinking ? 'h-[51%]' : 'h-0'
        }`}
      />
    </div>
  );
};

export { MouseFollowingEyes };
