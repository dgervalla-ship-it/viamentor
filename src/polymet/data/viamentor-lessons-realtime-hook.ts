/**
 * VIAMENTOR - Lessons Real-time Hook
 * Hook pour WebSocket real-time updates des leçons
 */

"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { Lesson, LessonStatus } from "./viamentor-lessons-data";

/**
 * WebSocket message types
 */
export type LessonUpdateType =
  | "started"
  | "completed"
  | "canceled"
  | "rescheduled"
  | "updated";

export interface LessonUpdate {
  type: LessonUpdateType;
  lessonId: string;
  status?: LessonStatus;
  data?: Partial<Lesson>;
  timestamp: string;
}

/**
 * Hook options
 */
interface UseRealTimeLessonsOptions {
  tenantId: string;
  date?: string;
  enabled?: boolean;
  onUpdate?: (update: LessonUpdate) => void;
  onError?: (error: Error) => void;
}

/**
 * Hook return type
 */
interface UseRealTimeLessonsReturn {
  isConnected: boolean;
  lastUpdate: LessonUpdate | null;
  updates: LessonUpdate[];
  sendUpdate: (update: Omit<LessonUpdate, "timestamp">) => void;
  clearUpdates: () => void;
  reconnect: () => void;
}

/**
 * Mock WebSocket connection
 * En production, remplacer par une vraie connexion WebSocket
 */
class MockWebSocket {
  private listeners: Map<string, Set<(data: any) => void>> = new Map();
  private isOpen = false;
  private reconnectTimeout: NodeJS.Timeout | null = null;

  constructor(private url: string) {
    this.connect();
  }

  private connect() {
    // Simulate connection delay
    setTimeout(() => {
      this.isOpen = true;
      this.emit("open", {});
      console.log(`[WebSocket] Connected to ${this.url}`);
    }, 500);
  }

  on(event: string, callback: (data: any) => void) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(callback);
  }

  off(event: string, callback: (data: any) => void) {
    this.listeners.get(event)?.delete(callback);
  }

  emit(event: string, data: any) {
    this.listeners.get(event)?.forEach((callback) => callback(data));
  }

  send(data: any) {
    if (!this.isOpen) {
      console.error("[WebSocket] Cannot send, connection not open");
      return;
    }
    console.log("[WebSocket] Sending:", data);
    // Simulate server echo
    setTimeout(() => {
      this.emit("message", data);
    }, 100);
  }

  close() {
    this.isOpen = false;
    this.emit("close", {});
    console.log("[WebSocket] Connection closed");
  }

  reconnect() {
    this.close();
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
    }
    this.reconnectTimeout = setTimeout(() => {
      this.connect();
    }, 1000);
  }

  get readyState() {
    return this.isOpen ? 1 : 0; // 1 = OPEN, 0 = CONNECTING
  }
}

/**
 * Hook pour real-time updates des leçons
 *
 * @example
 * ```tsx
 * const { isConnected, lastUpdate, sendUpdate } = useRealTimeLessons({
 *   tenantId: "tenant-1",
 *   date: "2025-01-15",
 *   onUpdate: (update) => {
 *     console.log("Lesson updated:", update);
 *     // Update local state
 *   }
 * });
 * ```
 */
export function useRealTimeLessons({
  tenantId,
  date,
  enabled = true,
  onUpdate,
  onError,
}: UseRealTimeLessonsOptions): UseRealTimeLessonsReturn {
  const [isConnected, setIsConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<LessonUpdate | null>(null);
  const [updates, setUpdates] = useState<LessonUpdate[]>([]);
  const wsRef = useRef<MockWebSocket | null>(null);

  /**
   * Connect to WebSocket
   */
  const connect = useCallback(() => {
    if (!enabled || wsRef.current?.readyState === 1) return;

    try {
      const channel = date
        ? `tenant.${tenantId}.lessons.${date}`
        : `tenant.${tenantId}.lessons`;
      const ws = new MockWebSocket(`wss://api.viamentor.ch/ws/${channel}`);

      ws.on("open", () => {
        setIsConnected(true);
        console.log(`[useRealTimeLessons] Connected to ${channel}`);
      });

      ws.on("message", (data: LessonUpdate) => {
        console.log("[useRealTimeLessons] Received update:", data);
        setLastUpdate(data);
        setUpdates((prev) => [...prev, data]);
        onUpdate?.(data);
      });

      ws.on("close", () => {
        setIsConnected(false);
        console.log("[useRealTimeLessons] Disconnected");
      });

      ws.on("error", (error: Error) => {
        console.error("[useRealTimeLessons] Error:", error);
        onError?.(error);
      });

      wsRef.current = ws;
    } catch (error) {
      console.error("[useRealTimeLessons] Connection error:", error);
      onError?.(error as Error);
    }
  }, [tenantId, date, enabled, onUpdate, onError]);

  /**
   * Disconnect from WebSocket
   */
  const disconnect = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
      setIsConnected(false);
    }
  }, []);

  /**
   * Send update to server
   */
  const sendUpdate = useCallback(
    (update: Omit<LessonUpdate, "timestamp">) => {
      if (!wsRef.current || !isConnected) {
        console.warn("[useRealTimeLessons] Cannot send update, not connected");
        return;
      }

      const fullUpdate: LessonUpdate = {
        ...update,
        timestamp: new Date().toISOString(),
      };

      wsRef.current.send(fullUpdate);
    },
    [isConnected]
  );

  /**
   * Clear updates history
   */
  const clearUpdates = useCallback(() => {
    setUpdates([]);
    setLastUpdate(null);
  }, []);

  /**
   * Reconnect to WebSocket
   */
  const reconnect = useCallback(() => {
    disconnect();
    setTimeout(connect, 1000);
  }, [connect, disconnect]);

  /**
   * Connect on mount, disconnect on unmount
   */
  useEffect(() => {
    if (enabled) {
      connect();
    }

    return () => {
      disconnect();
    };
  }, [enabled, connect, disconnect]);

  /**
   * Simulate random updates for demo
   */
  useEffect(() => {
    if (!enabled || !isConnected) return;

    const interval = setInterval(() => {
      // Simulate random lesson status update
      const randomTypes: LessonUpdateType[] = [
        "started",
        "completed",
        "canceled",
      ];

      const randomType =
        randomTypes[Math.floor(Math.random() * randomTypes.length)];
      const randomLessonId = `lesson-${Math.floor(Math.random() * 10) + 1}`;

      const simulatedUpdate: LessonUpdate = {
        type: randomType,
        lessonId: randomLessonId,
        status:
          randomType === "started"
            ? "in_progress"
            : randomType === "completed"
              ? "completed"
              : "canceled",
        timestamp: new Date().toISOString(),
      };

      // Only emit if we have listeners
      if (wsRef.current) {
        wsRef.current.emit("message", simulatedUpdate);
      }
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, [enabled, isConnected]);

  return {
    isConnected,
    lastUpdate,
    updates,
    sendUpdate,
    clearUpdates,
    reconnect,
  };
}

/**
 * Hook pour optimistic updates
 * Applique immédiatement les changements localement, puis rollback si erreur
 */
export function useOptimisticLessonUpdate() {
  const [pendingUpdates, setPendingUpdates] = useState<
    Map<string, Partial<Lesson>>
  >(new Map());

  const applyOptimisticUpdate = useCallback(
    (lessonId: string, update: Partial<Lesson>) => {
      setPendingUpdates((prev) => new Map(prev).set(lessonId, update));
    },
    []
  );

  const confirmUpdate = useCallback((lessonId: string) => {
    setPendingUpdates((prev) => {
      const next = new Map(prev);
      next.delete(lessonId);
      return next;
    });
  }, []);

  const rollbackUpdate = useCallback((lessonId: string) => {
    setPendingUpdates((prev) => {
      const next = new Map(prev);
      next.delete(lessonId);
      return next;
    });
  }, []);

  const getPendingUpdate = useCallback(
    (lessonId: string) => {
      return pendingUpdates.get(lessonId);
    },
    [pendingUpdates]
  );

  return {
    applyOptimisticUpdate,
    confirmUpdate,
    rollbackUpdate,
    getPendingUpdate,
    hasPendingUpdate: (lessonId: string) => pendingUpdates.has(lessonId),
  };
}
