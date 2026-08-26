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

    window.addEventListener("mousemove", handleGlobalMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleGlobalMouseMove);
  }, []);

  // Periodic blinking every 6 seconds (or configured blinkInterval)
  useEffect(() => {
    let blinkTimeout: NodeJS.Timeout;
    let resetTimeout: NodeJS.Timeout;
    let isMounted = true;

    const triggerBlink = () => {
      if (!isMounted) return;
      setIsBlinking(true);

      // Eyelids stay closed for 180ms, then open
      resetTimeout = setTimeout(() => {
        if (!isMounted) return;
        setIsBlinking(false);

        // Schedule next blink at configured interval (6 seconds)
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
  const [center, setCenter] = useState({ x: 0, y: 0, width: 60, height: 90 });

  const updateCenter = () => {
    if (!selfRef.current) return;
    const rect = selfRef.current.getBoundingClientRect();
    setCenter({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
      width: rect.width,
      height: rect.height,
    });
  };

  useEffect(() => {
    updateCenter();
    window.addEventListener("resize", updateCenter);
    window.addEventListener("scroll", updateCenter, { passive: true });
    return () => {
      window.removeEventListener("resize", updateCenter);
      window.removeEventListener("scroll", updateCenter);
    };
  }, []);

  useEffect(() => {
    updateCenter();

    const isInside = (ref: React.RefObject<HTMLDivElement>) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return false;
      return (
        mouseX >= rect.left &&
        mouseX <= rect.right &&
        mouseY >= rect.top &&
        mouseY <= rect.bottom
      );
    };

    if (isInside(selfRef) || isInside(otherRef)) return;

    const dx = mouseX - center.x;
    const dy = mouseY - center.y;
    const angle = Math.atan2(dy, dx);

    const maxMoveX = (center.width || 60) * 0.28;
    const maxMoveY = (center.height || 90) * 0.32;
    const pupilX = Math.cos(angle) * maxMoveX;
    const pupilY = Math.sin(angle) * maxMoveY;

    if (pupilRef.current) {
      pupilRef.current.style.transform = `translate(${pupilX}px, ${pupilY}px)`;
    }
  }, [mouseX, mouseY, center]);

  return (
    <div
      ref={selfRef}
      className={`relative bg-white rounded-[50%] flex items-center justify-center shadow-[0_12px_28px_-6px_rgba(5,5,5,0.12)] overflow-hidden transition-all duration-300 ${
        eyeClassName || 'h-16 w-12 sm:h-20 sm:w-15 md:h-24 md:w-18 lg:h-28 lg:w-21'
      }`}
    >
      {/* Pupil with light glint reflection */}
      <div
        ref={pupilRef}
        className={`absolute bg-ink rounded-full transition-transform duration-75 ease-out flex items-start justify-end p-1 sm:p-1.5 ${
          pupilClassName || 'h-5 w-5 sm:h-6 sm:w-6 md:h-7 sm:w-7 lg:h-8 lg:w-8'
        }`}
      >
        <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 bg-white/90 rounded-full block" />
      </div>

      {/* Top Eyelid - sweeps down with straight bottom edge */}
      <div
        className={`absolute top-0 inset-x-0 ${eyelidClassName} z-20 pointer-events-none rounded-none transition-all duration-150 ease-in-out ${
          isBlinking ? 'h-[52%]' : 'h-0'
        }`}
      />

      {/* Bottom Eyelid - sweeps up with straight top edge */}
      <div
        className={`absolute bottom-0 inset-x-0 ${eyelidClassName} z-20 pointer-events-none rounded-none transition-all duration-150 ease-in-out ${
          isBlinking ? 'h-[52%]' : 'h-0'
        }`}
      />
    </div>
  );
};

export { MouseFollowingEyes };


