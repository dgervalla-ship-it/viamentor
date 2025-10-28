/**
 * ============================================================================
 * VIAMENTOR - Touch Gestures
 * ============================================================================
 *
 * Hook et utilities pour gestion des touch gestures
 */

import { useEffect, useRef, useState, useCallback } from "react";

// ============================================================================
// TYPES
// ============================================================================

export type SwipeDirection = "left" | "right" | "up" | "down";

export interface SwipeEvent {
  direction: SwipeDirection;
  distance: number;
  velocity: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

export interface LongPressEvent {
  x: number;
  y: number;
  duration: number;
}

export interface PinchEvent {
  scale: number;
  center: { x: number; y: number };
}

export interface TouchGesturesOptions {
  // Swipe
  onSwipe?: (event: SwipeEvent) => void;
  onSwipeLeft?: (event: SwipeEvent) => void;
  onSwipeRight?: (event: SwipeEvent) => void;
  onSwipeUp?: (event: SwipeEvent) => void;
  onSwipeDown?: (event: SwipeEvent) => void;
  swipeThreshold?: number; // Distance minimale en px (défaut: 50)
  swipeVelocity?: number; // Vélocité minimale (défaut: 0.3)

  // Long Press
  onLongPress?: (event: LongPressEvent) => void;
  longPressDuration?: number; // Durée en ms (défaut: 500)

  // Pinch
  onPinch?: (event: PinchEvent) => void;
  onPinchStart?: () => void;
  onPinchEnd?: () => void;

  // Options générales
  preventDefault?: boolean;
  disabled?: boolean;
}

export interface TouchGesturesState {
  isSwiping: boolean;
  isLongPressing: boolean;
  isPinching: boolean;
  swipeProgress: number; // 0-1
  longPressProgress: number; // 0-1
}

// ============================================================================
// CONSTANTS
// ============================================================================

const DEFAULT_SWIPE_THRESHOLD = 50; // px
const DEFAULT_SWIPE_VELOCITY = 0.3; // px/ms
const DEFAULT_LONG_PRESS_DURATION = 500; // ms

// ============================================================================
// HOOK: useSwipeGesture
// ============================================================================

/**
 * Hook pour détecter les swipe gestures
 *
 * @example
 * ```tsx
 * const swipeHandlers = useSwipeGesture({
 *   onSwipeLeft: () => console.log("Swipe left"),
 *   onSwipeRight: () => console.log("Swipe right"),
 *   swipeThreshold: 100
 * })
 *
 * return <div {...swipeHandlers}>Swipe me!</div>
 * ```
 */
export function useSwipeGesture(options: TouchGesturesOptions = {}) {
  const {
    onSwipe,
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    swipeThreshold = DEFAULT_SWIPE_THRESHOLD,
    swipeVelocity = DEFAULT_SWIPE_VELOCITY,
    preventDefault = true,
    disabled = false,
  } = options;

  const touchStart = useRef<{ x: number; y: number; time: number } | null>(
    null
  );
  const [isSwiping, setIsSwiping] = useState(false);
  const [swipeProgress, setSwipeProgress] = useState(0);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (disabled) return;

      const touch = e.touches[0];
      touchStart.current = {
        x: touch.clientX,
        y: touch.clientY,
        time: Date.now(),
      };
      setIsSwiping(false);
      setSwipeProgress(0);
    },
    [disabled]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (disabled || !touchStart.current) return;

      const touch = e.touches[0];
      const deltaX = Math.abs(touch.clientX - touchStart.current.x);
      const deltaY = Math.abs(touch.clientY - touchStart.current.y);

      // Calcul du progrès
      const maxDelta = Math.max(deltaX, deltaY);
      const progress = Math.min(maxDelta / swipeThreshold, 1);
      setSwipeProgress(progress);

      if (maxDelta > 10) {
        setIsSwiping(true);
        if (preventDefault) {
          e.preventDefault();
        }
      }
    },
    [disabled, swipeThreshold, preventDefault]
  );

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (disabled || !touchStart.current) return;

      const touch = e.changedTouches[0];
      const deltaX = touch.clientX - touchStart.current.x;
      const deltaY = touch.clientY - touchStart.current.y;
      const deltaTime = Date.now() - touchStart.current.time;

      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);
      const velocity = Math.max(absX, absY) / deltaTime;

      // Détection de la direction
      let direction: SwipeDirection | null = null;

      if (absX > absY && absX > swipeThreshold && velocity > swipeVelocity) {
        direction = deltaX > 0 ? "right" : "left";
      } else if (
        absY > absX &&
        absY > swipeThreshold &&
        velocity > swipeVelocity
      ) {
        direction = deltaY > 0 ? "down" : "up";
      }

      // Callbacks
      if (direction) {
        const swipeEvent: SwipeEvent = {
          direction,
          distance: Math.max(absX, absY),
          velocity,
          startX: touchStart.current.x,
          startY: touchStart.current.y,
          endX: touch.clientX,
          endY: touch.clientY,
        };

        onSwipe?.(swipeEvent);

        if (direction === "left") onSwipeLeft?.(swipeEvent);
        if (direction === "right") onSwipeRight?.(swipeEvent);
        if (direction === "up") onSwipeUp?.(swipeEvent);
        if (direction === "down") onSwipeDown?.(swipeEvent);
      }

      touchStart.current = null;
      setIsSwiping(false);
      setSwipeProgress(0);
    },
    [
      disabled,
      swipeThreshold,
      swipeVelocity,
      onSwipe,
      onSwipeLeft,
      onSwipeRight,
      onSwipeUp,
      onSwipeDown,
    ]
  );

  return {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
    isSwiping,
    swipeProgress,
  };
}

// ============================================================================
// HOOK: useLongPress
// ============================================================================

/**
 * Hook pour détecter les long press
 *
 * @example
 * ```tsx
 * const longPressHandlers = useLongPress({
 *   onLongPress: (e) => console.log("Long press detected"),
 *   longPressDuration: 800
 * })
 *
 * return <button {...longPressHandlers}>Long press me!</button>
 * ```
 */
export function useLongPress(options: TouchGesturesOptions = {}) {
  const {
    onLongPress,
    longPressDuration = DEFAULT_LONG_PRESS_DURATION,
    disabled = false,
  } = options;

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startPosRef = useRef<{ x: number; y: number } | null>(null);
  const [isLongPressing, setIsLongPressing] = useState(false);
  const [longPressProgress, setLongPressProgress] = useState(0);

  const clear = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsLongPressing(false);
    setLongPressProgress(0);
  }, []);

  const handleStart = useCallback(
    (x: number, y: number) => {
      if (disabled) return;

      startPosRef.current = { x, y };
      setIsLongPressing(true);

      // Progress animation
      const startTime = Date.now();
      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / longPressDuration, 1);
        setLongPressProgress(progress);
      }, 16);

      // Long press timer
      timerRef.current = setTimeout(() => {
        if (startPosRef.current) {
          onLongPress?.({
            x: startPosRef.current.x,
            y: startPosRef.current.y,
            duration: longPressDuration,
          });
        }
        clearInterval(interval);
        setIsLongPressing(false);
        setLongPressProgress(0);
      }, longPressDuration);
    },
    [disabled, longPressDuration, onLongPress]
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      const touch = e.touches[0];
      handleStart(touch.clientX, touch.clientY);
    },
    [handleStart]
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      handleStart(e.clientX, e.clientY);
    },
    [handleStart]
  );

  const handleEnd = useCallback(() => {
    clear();
  }, [clear]);

  useEffect(() => {
    return () => clear();
  }, [clear]);

  return {
    onTouchStart: handleTouchStart,
    onTouchEnd: handleEnd,
    onTouchMove: handleEnd,
    onMouseDown: handleMouseDown,
    onMouseUp: handleEnd,
    onMouseLeave: handleEnd,
    isLongPressing,
    longPressProgress,
  };
}

// ============================================================================
// HOOK: usePinchZoom
// ============================================================================

/**
 * Hook pour détecter les pinch zoom gestures
 *
 * @example
 * ```tsx
 * const pinchHandlers = usePinchZoom({
 *   onPinch: (e) => console.log("Scale:", e.scale)
 * })
 *
 * return <div {...pinchHandlers}>Pinch to zoom</div>
 * ```
 */
export function usePinchZoom(options: TouchGesturesOptions = {}) {
  const { onPinch, onPinchStart, onPinchEnd, disabled = false } = options;

  const initialDistanceRef = useRef<number | null>(null);
  const [isPinching, setIsPinching] = useState(false);

  const getDistance = (touches: React.TouchList) => {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const getCenter = (touches: React.TouchList) => {
    return {
      x: (touches[0].clientX + touches[1].clientX) / 2,
      y: (touches[0].clientY + touches[1].clientY) / 2,
    };
  };

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (disabled || e.touches.length !== 2) return;

      initialDistanceRef.current = getDistance(e.touches);
      setIsPinching(true);
      onPinchStart?.();
    },
    [disabled, onPinchStart]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (disabled || e.touches.length !== 2 || !initialDistanceRef.current)
        return;

      const currentDistance = getDistance(e.touches);
      const scale = currentDistance / initialDistanceRef.current;
      const center = getCenter(e.touches);

      onPinch?.({ scale, center });
    },
    [disabled, onPinch]
  );

  const handleTouchEnd = useCallback(() => {
    if (!isPinching) return;

    initialDistanceRef.current = null;
    setIsPinching(false);
    onPinchEnd?.();
  }, [isPinching, onPinchEnd]);

  return {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
    isPinching,
  };
}

// ============================================================================
// HOOK: useTouchGestures (Combined)
// ============================================================================

/**
 * Hook combiné pour tous les touch gestures
 *
 * @example
 * ```tsx
 * const { handlers, state } = useTouchGestures({
 *   onSwipeLeft: () => console.log("Swipe left"),
 *   onLongPress: () => console.log("Long press"),
 *   onPinch: (e) => console.log("Pinch", e.scale)
 * })
 *
 * return <div {...handlers}>Touch me!</div>
 * ```
 */
export function useTouchGestures(options: TouchGesturesOptions = {}): {
  handlers: Record<string, any>;
  state: TouchGesturesState;
} {
  const swipe = useSwipeGesture(options);
  const longPress = useLongPress(options);
  const pinch = usePinchZoom(options);

  const handlers = {
    onTouchStart: (e: React.TouchEvent) => {
      swipe.onTouchStart(e);
      longPress.onTouchStart(e);
      pinch.onTouchStart(e);
    },
    onTouchMove: (e: React.TouchEvent) => {
      swipe.onTouchMove(e);
      longPress.onTouchMove(e);
      pinch.onTouchMove(e);
    },
    onTouchEnd: (e: React.TouchEvent) => {
      swipe.onTouchEnd(e);
      longPress.onTouchEnd(e);
      pinch.onTouchEnd(e);
    },
  };

  const state: TouchGesturesState = {
    isSwiping: swipe.isSwiping,
    isLongPressing: longPress.isLongPressing,
    isPinching: pinch.isPinching,
    swipeProgress: swipe.swipeProgress,
    longPressProgress: longPress.longPressProgress,
  };

  return { handlers, state };
}

// ============================================================================
// UTILITIES
// ============================================================================

/**
 * Détecte si un élément est scrollable
 */
export function isScrollable(element: HTMLElement): boolean {
  const hasScrollableContent =
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth;

  const overflowY = window.getComputedStyle(element).overflowY;
  const overflowX = window.getComputedStyle(element).overflowX;
  const isOverflowHidden = overflowY === "hidden" && overflowX === "hidden";

  return hasScrollableContent && !isOverflowHidden;
}

/**
 * Empêche le scroll pendant un gesture
 */
export function preventScroll(prevent: boolean) {
  if (typeof document === "undefined") return;

  if (prevent) {
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";
  } else {
    document.body.style.overflow = "";
    document.body.style.touchAction = "";
  }
}
