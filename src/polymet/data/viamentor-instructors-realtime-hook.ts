/**
 * VIAMENTOR - Real-Time Availability Hook
 * Hook custom pour WebSocket simulation et updates status moniteurs temps réel
 */

import { useState, useEffect, useCallback, useRef } from "react";

export type InstructorStatus = "Disponible" | "En leçon" | "Absent" | "Congé";

export interface StatusUpdate {
  instructorId: string;
  status: InstructorStatus;
  timestamp: string;
  previousStatus?: InstructorStatus;
}

export interface RealTimeAvailabilityState {
  statuses: Record<string, InstructorStatus>;
  lastUpdate: string | null;
  isConnected: boolean;
  updates: StatusUpdate[];
}

interface UseRealTimeAvailabilityOptions {
  tenantId?: string;
  autoConnect?: boolean;
  updateInterval?: number; // ms
}

/**
 * Hook pour gérer la disponibilité temps réel des moniteurs
 * Simule un WebSocket avec setInterval pour la démo
 */
export function useRealTimeAvailability(
  options: UseRealTimeAvailabilityOptions = {}
) {
  const {
    tenantId = "tenant-1",
    autoConnect = true,
    updateInterval = 15000,
  } = options;

  const [state, setState] = useState<RealTimeAvailabilityState>({
    statuses: {},
    lastUpdate: null,
    isConnected: false,
    updates: [],
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const updateHistoryRef = useRef<StatusUpdate[]>([]);

  // Simulate WebSocket connection
  const connect = useCallback(() => {
    console.log(
      `[WebSocket] Connecting to tenant.${tenantId}.instructors.status...`
    );

    setState((prev) => ({
      ...prev,
      isConnected: true,
      lastUpdate: new Date().toISOString(),
    }));

    // Simulate periodic status updates
    intervalRef.current = setInterval(() => {
      simulateStatusUpdate();
    }, updateInterval);
  }, [tenantId, updateInterval]);

  // Simulate WebSocket disconnect
  const disconnect = useCallback(() => {
    console.log("[WebSocket] Disconnecting...");

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    setState((prev) => ({
      ...prev,
      isConnected: false,
    }));
  }, []);

  // Simulate random status update
  const simulateStatusUpdate = useCallback(() => {
    const instructorIds = ["inst-1", "inst-2", "inst-3", "inst-4", "inst-5"];
    const statuses: InstructorStatus[] = [
      "Disponible",
      "En leçon",
      "Absent",
      "Congé",
    ];

    // Random instructor
    const randomInstructorId =
      instructorIds[Math.floor(Math.random() * instructorIds.length)];

    // Random status
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

    setState((prev) => {
      const previousStatus = prev.statuses[randomInstructorId];

      // Don't update if same status
      if (previousStatus === randomStatus) {
        return prev;
      }

      const update: StatusUpdate = {
        instructorId: randomInstructorId,
        status: randomStatus,
        timestamp: new Date().toISOString(),
        previousStatus,
      };

      // Add to history
      updateHistoryRef.current = [update, ...updateHistoryRef.current].slice(
        0,
        50
      );

      console.log(
        `[WebSocket] Status update: ${randomInstructorId} → ${randomStatus}`
      );

      return {
        ...prev,
        statuses: {
          ...prev.statuses,
          [randomInstructorId]: randomStatus,
        },
        lastUpdate: update.timestamp,
        updates: updateHistoryRef.current,
      };
    });
  }, []);

  // Manual status update (optimistic)
  const updateStatus = useCallback(
    (instructorId: string, status: InstructorStatus) => {
      setState((prev) => {
        const previousStatus = prev.statuses[instructorId];

        const update: StatusUpdate = {
          instructorId,
          status,
          timestamp: new Date().toISOString(),
          previousStatus,
        };

        updateHistoryRef.current = [update, ...updateHistoryRef.current].slice(
          0,
          50
        );

        console.log(
          `[WebSocket] Manual update: ${instructorId} → ${status} (optimistic)`
        );

        return {
          ...prev,
          statuses: {
            ...prev.statuses,
            [instructorId]: status,
          },
          lastUpdate: update.timestamp,
          updates: updateHistoryRef.current,
        };
      });
    },
    []
  );

  // Batch status update
  const batchUpdateStatus = useCallback(
    (updates: Array<{ instructorId: string; status: InstructorStatus }>) => {
      setState((prev) => {
        const newStatuses = { ...prev.statuses };
        const newUpdates: StatusUpdate[] = [];

        updates.forEach(({ instructorId, status }) => {
          const previousStatus = newStatuses[instructorId];

          newStatuses[instructorId] = status;

          newUpdates.push({
            instructorId,
            status,
            timestamp: new Date().toISOString(),
            previousStatus,
          });
        });

        updateHistoryRef.current = [
          ...newUpdates,
          ...updateHistoryRef.current,
        ].slice(0, 50);

        console.log(
          `[WebSocket] Batch update: ${updates.length} instructors (optimistic)`
        );

        return {
          ...prev,
          statuses: newStatuses,
          lastUpdate: new Date().toISOString(),
          updates: updateHistoryRef.current,
        };
      });
    },
    []
  );

  // Get status for specific instructor
  const getStatus = useCallback(
    (instructorId: string): InstructorStatus | undefined => {
      return state.statuses[instructorId];
    },
    [state.statuses]
  );

  // Auto-connect on mount
  useEffect(() => {
    if (autoConnect) {
      connect();
    }

    return () => {
      disconnect();
    };
  }, [autoConnect, connect, disconnect]);

  return {
    ...state,
    connect,
    disconnect,
    updateStatus,
    batchUpdateStatus,
    getStatus,
  };
}

// Helper to get status badge color
export function getStatusBadgeColor(status: InstructorStatus): string {
  switch (status) {
    case "Disponible":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
    case "En leçon":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
    case "Absent":
      return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
    case "Congé":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400";
  }
}

// Helper to get status dot color
export function getStatusDotColor(status: InstructorStatus): string {
  switch (status) {
    case "Disponible":
      return "bg-green-600";
    case "En leçon":
      return "bg-blue-600";
    case "Absent":
      return "bg-red-600";
    case "Congé":
      return "bg-orange-600";
  }
}
