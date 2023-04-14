import {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

function randomInRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function getAnimationSettings(originXA: number, originXB: number) {
  return {
    startVelocity: 30,
    spread: 360,
    ticks: 60,
    zIndex: 0,
    particleCount: 150,
    origin: {
      x: randomInRange(originXA, originXB),
      y: Math.random() - 0.2,
    },
  };
}

/**
 * Copied from
 * https://codesandbox.io/s/fireworks-fn-react-canvas-confetti-w594u?file=/src/App.js:639-1667
 *
 * @example
 * ```tsx
 * <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
 * ```
 */
export const useConfetti = () => {
  const refAnimationInstance = useRef<any>(null);
  const [intervalId, setIntervalId] = useState<any>();
  const getInstance = useCallback((instance: any) => {
    refAnimationInstance.current = instance;
  }, []);
  const nextTickAnimation = useCallback(() => {
    if (refAnimationInstance.current) {
      refAnimationInstance.current(getAnimationSettings(0.1, 0.3));
      refAnimationInstance.current(getAnimationSettings(0.7, 0.9));
    }
  }, []);
  const startAnimation = useCallback(() => {
    if (!intervalId) {
      setIntervalId(setInterval(nextTickAnimation, 400));
    }
  }, [intervalId, nextTickAnimation]);
  const pauseAnimation = useCallback(() => {
    clearInterval(intervalId);
    setIntervalId(null);
  }, [intervalId]);
  const stopAnimation = useCallback(() => {
    clearInterval(intervalId);
    setIntervalId(null);
    refAnimationInstance.current && refAnimationInstance.current.reset();
  }, [intervalId]);
  const canvasStyles = useMemo<CSSProperties>(
    () => ({
      position: "fixed",
      pointerEvents: "none",
      width: "100%",
      height: "100%",
      top: 0,
      left: 0,
    }),
    [],
  );

  useEffect(
    () => () => {
      clearInterval(intervalId);
    },
    [intervalId],
  );

  return {
    canvasStyles,
    getInstance,
    startAnimation,
    pauseAnimation,
    stopAnimation,
  };
};
