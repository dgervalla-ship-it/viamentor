/**
 * VIAMENTOR - useNotifications Hook
 * Hook pour notifications realtime avec WebSocket simulation
 */

"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import {
  MOCK_NOTIFICATIONS,
  type Notification,
  type NotificationCategory,
} from "@/viamentor/data/viamentor-header-notifications-data";

export interface UseNotificationsReturn {
  notifications: Notification[];
  unreadCount: number;
  filteredNotifications: Notification[];
  activeTab: NotificationCategory;
  setActiveTab: (tab: NotificationCategory) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  addNotification: (
    notification: Omit<Notification, "id" | "timestamp">
  ) => void;
}

export function useNotifications(): UseNotificationsReturn {
  const [notifications, setNotifications] =
    useState<Notification[]>(MOCK_NOTIFICATIONS);
  const [activeTab, setActiveTab] = useState<NotificationCategory>("all");

  // Simulate WebSocket connection for realtime notifications
  useEffect(() => {
    // Simulate receiving a new notification every 30 seconds
    const interval = setInterval(() => {
      const newNotification: Notification = {
        id: `notif-${Date.now()}`,
        type: ["info", "success", "warning", "error"][
          Math.floor(Math.random() * 4)
        ] as any,
        title: "Nouvelle notification",
        message: "Ceci est une notification de test en temps réel",
        timestamp: new Date(),
        read: false,
      };

      setNotifications((prev) => [newNotification, ...prev]);

      // Optional: Play notification sound
      // if (typeof Audio !== 'undefined') {
      //   const audio = new Audio('/notification-sound.mp3');
      //   audio.play().catch(() => {});
      // }
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Calculate unread count
  const unreadCount = useMemo(() => {
    return notifications.filter((n) => !n.read).length;
  }, [notifications]);

  // Filter notifications based on active tab
  const filteredNotifications = useMemo(() => {
    switch (activeTab) {
      case "unread":
        return notifications.filter((n) => !n.read);
      case "mentions":
        // In a real app, this would filter for @mentions
        return notifications.filter((n) => n.message.includes("@"));
      case "all":
      default:
        return notifications;
    }
  }, [notifications, activeTab]);

  // Mark notification as read
  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  // Mark all notifications as read
  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  // Delete notification
  const deleteNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  // Add new notification (for testing/demo)
  const addNotification = useCallback(
    (notification: Omit<Notification, "id" | "timestamp">) => {
      const newNotification: Notification = {
        ...notification,
        id: `notif-${Date.now()}`,
        timestamp: new Date(),
      };
      setNotifications((prev) => [newNotification, ...prev]);
    },
    []
  );

  return {
    notifications,
    unreadCount,
    filteredNotifications,
    activeTab,
    setActiveTab,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    addNotification,
  };
}
