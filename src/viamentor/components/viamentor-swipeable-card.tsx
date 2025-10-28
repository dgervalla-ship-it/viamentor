/**
 * ============================================================================
 * VIAMENTOR - Swipeable Card
 * ============================================================================
 *
 * Card avec swipe actions pour interactions mobiles rapides
 */

import React, { useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// ============================================================================
// TYPES
// ============================================================================

export interface SwipeAction {
  id: string;
  label: string;
  icon?: React.ReactNode;
  color?: string;
  bgColor?: string;
  onAction: () => void;
}

export interface SwipeableCardProps {
  children: React.ReactNode;
  leftActions?: SwipeAction[];
  rightActions?: SwipeAction[];
  swipeThreshold?: number;
  disabled?: boolean;
  className?: string;
  onSwipeStart?: () => void;
  onSwipeEnd?: () => void;
}

// ============================================================================
// COMPONENT
// ============================================================================

/**
 * Card avec swipe actions
 *
 * @example
 * ```tsx
 * <SwipeableCard
 *   leftActions={[
 *     {
 *       id: "edit",
 *       label: "Modifier",
 *       icon: <EditIcon />,
 *       color: "text-blue-600",
 *       bgColor: "bg-blue-100",
 *       onAction: () => console.log("Edit")
 *     }
 *   ]}
 *   rightActions={[
 *     {
 *       id: "delete",
 *       label: "Supprimer",
 *       icon: <TrashIcon />,
 *       color: "text-red-600",
 *       bgColor: "bg-red-100",
 *       onAction: () => console.log("Delete")
 *     }
 *   ]}
 * >
 *   <div>Card content</div>
 * </SwipeableCard>
 * ```
 */
export function SwipeableCard({
  children,
  leftActions = [],
  rightActions = [],
  swipeThreshold = 80,
  disabled = false,
  className = "",
  onSwipeStart,
  onSwipeEnd,
}: SwipeableCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [translateX, setTranslateX] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);

  const maxSwipeLeft = leftActions.length * 80;
  const maxSwipeRight = rightActions.length * 80;

  const handleTouchStart = (e: React.TouchEvent) => {
    if (disabled) return;

    setIsSwiping(true);
    setStartX(e.touches[0].clientX);
    setCurrentX(e.touches[0].clientX);
    onSwipeStart?.();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isSwiping || disabled) return;

    const touch = e.touches[0];
    setCurrentX(touch.clientX);

    const deltaX = touch.clientX - startX;

    // Limite le swipe
    let newTranslateX = deltaX;
    if (deltaX > 0) {
      // Swipe right (left actions)
      newTranslateX = Math.min(deltaX, maxSwipeLeft);
    } else {
      // Swipe left (right actions)
      newTranslateX = Math.max(deltaX, -maxSwipeRight);
    }

    setTranslateX(newTranslateX);
  };

  const handleTouchEnd = () => {
    if (!isSwiping || disabled) return;

    setIsSwiping(false);

    const deltaX = currentX - startX;
    const absX = Math.abs(deltaX);

    // Si swipe suffisant, snap vers les actions
    if (absX > swipeThreshold) {
      if (deltaX > 0 && leftActions.length > 0) {
        // Snap left actions
        setTranslateX(maxSwipeLeft);
      } else if (deltaX < 0 && rightActions.length > 0) {
        // Snap right actions
        setTranslateX(-maxSwipeRight);
      } else {
        // Reset
        setTranslateX(0);
      }
    } else {
      // Reset si pas assez de swipe
      setTranslateX(0);
    }

    onSwipeEnd?.();
  };

  const handleActionClick = (action: SwipeAction) => {
    action.onAction();
    setTranslateX(0); // Reset après action
  };

  const reset = () => {
    setTranslateX(0);
  };

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Left actions (visible when swiping right) */}
      {leftActions.length > 0 && (
        <div className="absolute left-0 top-0 bottom-0 flex">
          {leftActions.map((action) => (
            <button
              key={action.id}
              onClick={() => handleActionClick(action)}
              className={cn(
                "w-20 flex flex-col items-center justify-center gap-1 transition-opacity",
                action.bgColor || "bg-blue-100 dark:bg-blue-950",
                action.color || "text-blue-600",
                translateX > 0 ? "opacity-100" : "opacity-0"
              )}
              style={{
                transform: `translateX(${Math.max(0, translateX - 80)}px)`,
              }}
            >
              {action.icon && <div className="text-xl">{action.icon}</div>}
              <span className="text-xs font-medium">{action.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Right actions (visible when swiping left) */}
      {rightActions.length > 0 && (
        <div className="absolute right-0 top-0 bottom-0 flex">
          {rightActions.map((action) => (
            <button
              key={action.id}
              onClick={() => handleActionClick(action)}
              className={cn(
                "w-20 flex flex-col items-center justify-center gap-1 transition-opacity",
                action.bgColor || "bg-red-100 dark:bg-red-950",
                action.color || "text-red-600",
                translateX < 0 ? "opacity-100" : "opacity-0"
              )}
              style={{
                transform: `translateX(${Math.min(0, translateX + 80)}px)`,
              }}
            >
              {action.icon && <div className="text-xl">{action.icon}</div>}
              <span className="text-xs font-medium">{action.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Card content */}
      <div
        ref={cardRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative z-10 touch-none"
        style={{
          transform: `translateX(${translateX}px)`,
          transition: isSwiping ? "none" : "transform 0.3s ease-out",
        }}
      >
        <Card className="shadow-sm">{children}</Card>
      </div>
    </div>
  );
}

/**
 * Liste de SwipeableCards
 */
export function SwipeableCardList({
  items,
  renderItem,
  leftActions,
  rightActions,
  className = "",
}: {
  items: any[];
  renderItem: (item: any, index: number) => React.ReactNode;
  leftActions?: (item: any) => SwipeAction[];
  rightActions?: (item: any) => SwipeAction[];
  className?: string;
}) {
  return (
    <div className={cn("space-y-3", className)}>
      {items.map((item, index) => (
        <SwipeableCard
          key={item.id || index}
          leftActions={leftActions?.(item)}
          rightActions={rightActions?.(item)}
        >
          {renderItem(item, index)}
        </SwipeableCard>
      ))}
    </div>
  );
}
