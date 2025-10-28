/**
 * Viamentor - Animated Components
 * Micro-interactions avec Framer Motion (P1.3)
 */

import * as React from "react";
import { motion, type Variants } from "framer-motion";
import { Button, type ButtonProps } from "./button";
import { cn } from "../../lib/utils";

/**
 * Button avec effet ripple (ondulation au clic)
 */
export interface ButtonWithRippleProps extends ButtonProps {
  rippleColor?: string;
}

export function ButtonWithRipple({ 
  children, 
  onClick, 
  rippleColor = "rgba(255, 255, 255, 0.3)",
  className,
  ...props 
}: ButtonWithRippleProps) {
  const [ripples, setRipples] = React.useState<Array<{ x: number; y: number; id: number }>>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newRipple = { x, y, id: Date.now() };
    setRipples([...ripples, newRipple]);
    
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);
    
    onClick?.(e);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      className={cn("relative overflow-hidden", className)}
      transition={{ duration: 0.15 }}
      {...props}
    >
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          className="absolute rounded-full pointer-events-none"
          style={{ backgroundColor: rippleColor }}
          initial={{ width: 0, height: 0, x: ripple.x, y: ripple.y, opacity: 1 }}
          animate={{ 
            width: 300, 
            height: 300, 
            x: ripple.x - 150, 
            y: ripple.y - 150,
            opacity: 0,
          }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      ))}
      {children}
    </motion.button>
  );
}

/**
 * Liste animée avec stagger effect
 */
interface AnimatedListProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function AnimatedList({ children, className, staggerDelay = 0.1 }: AnimatedListProps) {
  const variants = React.useMemo(() => ({
    ...containerVariants,
    show: {
      ...containerVariants.show,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  }), [staggerDelay]);

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="show"
      className={className}
    >
      {React.Children.map(children, (child) => (
        <motion.div variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

/**
 * Card avec hover effect
 */
interface AnimatedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverScale?: number;
  hoverShadow?: boolean;
}

export function AnimatedCard({ 
  children, 
  className, 
  hoverScale = 1.02,
  hoverShadow = true,
  ...props 
}: AnimatedCardProps) {
  return (
    <motion.div
      whileHover={{ 
        scale: hoverScale,
        boxShadow: hoverShadow ? '0 10px 30px rgba(0,0,0,0.1)' : undefined,
      }}
      transition={{ duration: 0.2 }}
      className={cn("cursor-pointer", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * Badge animé (pour notifications)
 */
export function AnimatedBadge({ count, className }: { count: number; className?: string }) {
  return (
    <motion.span
      key={count}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-red-500 text-white text-xs font-bold min-w-[20px] h-5 px-1.5",
        className
      )}
    >
      {count > 99 ? '99+' : count}
    </motion.span>
  );
}

/**
 * Fade In (pour chargement pages)
 */
export function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Slide In (pour sidebars/sheets)
 */
export function SlideIn({ 
  children, 
  direction = 'left' 
}: { 
  children: React.ReactNode; 
  direction?: 'left' | 'right' | 'top' | 'bottom' 
}) {
  const variants: Record<string, Variants> = {
    left: {
      hidden: { x: '-100%' },
      visible: { x: 0 },
    },
    right: {
      hidden: { x: '100%' },
      visible: { x: 0 },
    },
    top: {
      hidden: { y: '-100%' },
      visible: { y: 0 },
    },
    bottom: {
      hidden: { y: '100%' },
      visible: { y: 0 },
    },
  };

  return (
    <motion.div
      variants={variants[direction]}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Success Checkmark Animation
 */
export function SuccessCheckmark({ size = 48 }: { size?: number }) {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 52 52"
      width={size}
      height={size}
    >
      <motion.circle
        cx="26"
        cy="26"
        r="25"
        fill="none"
        stroke="#4CAF50"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5 }}
      />
      <motion.path
        fill="none"
        stroke="#4CAF50"
        strokeWidth="3"
        d="M14 27l7 7 16-16"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      />
    </motion.svg>
  );
}

