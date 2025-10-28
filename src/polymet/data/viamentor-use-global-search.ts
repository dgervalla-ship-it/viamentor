/**
 * VIAMENTOR - useGlobalSearch Hook
 * Hook pour global search avec Fuse.js fuzzy search, debounce et history
 */

"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import {
  ALL_SEARCH_DATA,
  type SearchResult,
  type SearchEntityType,
} from "@/polymet/data/viamentor-header-search-data";

const SEARCH_HISTORY_KEY = "viamentor_search_history";
const MAX_HISTORY_ITEMS = 5;

export interface GroupedSearchResults {
  students: SearchResult[];
  instructors: SearchResult[];
  lessons: SearchResult[];
  vehicles: SearchResult[];
  invoices: SearchResult[];
  documents: SearchResult[];
}

export interface UseGlobalSearchReturn {
  query: string;
  setQuery: (query: string) => void;
  results: GroupedSearchResults;
  isSearching: boolean;
  totalResults: number;
  recentSearches: string[];
  clearHistory: () => void;
  addToHistory: (query: string) => void;
  clearQuery: () => void;
}

export function useGlobalSearch(
  debounceMs: number = 300
): UseGlobalSearchReturn {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Simple fuzzy search function
  const fuzzySearch = useCallback(
    (items: SearchResult[], searchQuery: string) => {
      const lowerQuery = searchQuery.toLowerCase();
      return items.filter((item) => {
        const searchableText = [
          item.title,
          item.subtitle,
          item.metadata?.student,
          item.metadata?.instructor,
          item.metadata?.number,
          item.metadata?.birthDate,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return searchableText.includes(lowerQuery);
      });
    },
    []
  );

  // Load recent searches from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(SEARCH_HISTORY_KEY);
      if (stored) {
        setRecentSearches(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Failed to load search history:", error);
    }
  }, []);

  // Debounce query
  useEffect(() => {
    setIsSearching(true);
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
      setIsSearching(false);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [query, debounceMs]);

  // Perform search
  const results = useMemo(() => {
    if (!debouncedQuery || debouncedQuery.length < 2) {
      return {
        students: [],
        instructors: [],
        lessons: [],
        vehicles: [],
        invoices: [],
        documents: [],
      };
    }

    const items = fuzzySearch(ALL_SEARCH_DATA, debouncedQuery);

    // Group by type
    const grouped: GroupedSearchResults = {
      students: items.filter((item) => item.type === "student").slice(0, 5),
      instructors: items
        .filter((item) => item.type === "instructor")
        .slice(0, 5),
      lessons: items.filter((item) => item.type === "lesson").slice(0, 5),
      vehicles: items.filter((item) => item.type === "vehicle").slice(0, 5),
      invoices: items.filter((item) => item.type === "invoice").slice(0, 5),
      documents: items.filter((item) => item.type === "document").slice(0, 5),
    };

    return grouped;
  }, [debouncedQuery, fuzzySearch]);

  // Calculate total results
  const totalResults = useMemo(() => {
    return Object.values(results).reduce((sum, arr) => sum + arr.length, 0);
  }, [results]);

  // Add to history
  const addToHistory = useCallback((searchQuery: string) => {
    if (!searchQuery || searchQuery.length < 2) return;

    setRecentSearches((prev) => {
      const filtered = prev.filter((q) => q !== searchQuery);
      const updated = [searchQuery, ...filtered].slice(0, MAX_HISTORY_ITEMS);

      try {
        localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updated));
      } catch (error) {
        console.error("Failed to save search history:", error);
      }

      return updated;
    });
  }, []);

  // Clear history
  const clearHistory = useCallback(() => {
    setRecentSearches([]);
    try {
      localStorage.removeItem(SEARCH_HISTORY_KEY);
    } catch (error) {
      console.error("Failed to clear search history:", error);
    }
  }, []);

  // Clear query
  const clearQuery = useCallback(() => {
    setQuery("");
    setDebouncedQuery("");
  }, []);

  return {
    query,
    setQuery,
    results,
    isSearching,
    totalResults,
    recentSearches,
    clearHistory,
    addToHistory,
    clearQuery,
  };
}
