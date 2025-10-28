/**
 * VIAMENTOR - Header Global Search
 * Global Search avec Combobox, fuzzy search et keyboard shortcuts
 */

"use client";

import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  SearchIcon,
  UserIcon,
  GraduationCapIcon,
  CalendarIcon,
  CarIcon,
  ReceiptIcon,
  FileIcon,
  ClockIcon,
  XIcon,
} from "lucide-react";
import { useGlobalSearch } from "@/viamentor/data/viamentor-use-global-search";
import {
  HEADER_I18N,
  type HeaderLocale,
} from "@/viamentor/data/viamentor-header-i18n";

export interface HeaderGlobalSearchProps {
  locale?: HeaderLocale;
  className?: string;
}

export function HeaderGlobalSearch({
  locale = "fr",
  className,
}: HeaderGlobalSearchProps) {
  const [open, setOpen] = React.useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const t = HEADER_I18N[locale].search;

  const {
    query,
    setQuery,
    results,
    isSearching,
    totalResults,
    recentSearches,
    clearHistory,
    addToHistory,
    clearQuery,
  } = useGlobalSearch(300);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K to focus search
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
        setTimeout(() => inputRef.current?.focus(), 100);
      }

      // Cmd/Ctrl + Backspace to clear
      if ((e.metaKey || e.ctrlKey) && e.key === "Backspace" && open) {
        e.preventDefault();
        clearQuery();
      }

      // Escape to close
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, clearQuery]);

  const handleSelect = (url: string) => {
    addToHistory(query);
    setOpen(false);
    navigate(url);
  };

  const categoryIcons = {
    students: UserIcon,
    instructors: GraduationCapIcon,
    lessons: CalendarIcon,
    vehicles: CarIcon,
    invoices: ReceiptIcon,
    documents: FileIcon,
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`w-full max-w-md justify-start text-muted-foreground ${className}`}
        >
          <SearchIcon className="mr-2 h-4 w-4" />

          <span>{t.placeholder}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[500px] p-0" align="start">
        <Command shouldFilter={false}>
          <div className="relative">
            <CommandInput
              ref={inputRef}
              placeholder={t.placeholder}
              value={query}
              onValueChange={setQuery}
              className="border-none focus:ring-0"
            />

            {query && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6"
                onClick={clearQuery}
              >
                <XIcon className="h-3 w-3" />
              </Button>
            )}
          </div>
          <CommandList className="max-h-[400px]">
            {!query && recentSearches.length > 0 && (
              <>
                <CommandGroup heading={t.recentSearches}>
                  {recentSearches.map((search, index) => (
                    <CommandItem
                      key={index}
                      onSelect={() => setQuery(search)}
                      className="cursor-pointer"
                    >
                      <ClockIcon className="mr-2 h-4 w-4 text-muted-foreground" />

                      <span>{search}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
                <CommandSeparator />
              </>
            )}

            {query.length >= 2 && totalResults === 0 && !isSearching && (
              <CommandEmpty>{t.noResults}</CommandEmpty>
            )}

            {query.length >= 2 && totalResults > 0 && (
              <>
                {Object.entries(results).map(([category, items]) => {
                  if (items.length === 0) return null;

                  const Icon =
                    categoryIcons[category as keyof typeof categoryIcons];
                  const categoryLabel =
                    t.categories[category as keyof typeof t.categories];

                  return (
                    <CommandGroup key={category} heading={categoryLabel}>
                      {items.map((item) => (
                        <CommandItem
                          key={item.id}
                          onSelect={() => handleSelect(item.url)}
                          className="cursor-pointer"
                        >
                          {item.metadata?.avatar ? (
                            <Avatar className="mr-2 h-8 w-8">
                              <AvatarImage src={item.metadata.avatar} />

                              <AvatarFallback>{item.title[0]}</AvatarFallback>
                            </Avatar>
                          ) : (
                            <Icon className="mr-2 h-4 w-4 text-muted-foreground" />
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm truncate">
                              {item.title}
                            </div>
                            {item.subtitle && (
                              <div className="text-xs text-muted-foreground truncate">
                                {item.subtitle}
                              </div>
                            )}
                            {item.metadata?.birthDate && (
                              <div className="text-xs text-muted-foreground mt-0.5">
                                Né(e) le {item.metadata.birthDate}
                              </div>
                            )}
                          </div>
                          {item.metadata?.category && (
                            <Badge variant="outline" className="ml-2 text-xs">
                              {item.metadata.category}
                            </Badge>
                          )}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  );
                })}
                <CommandSeparator />

                <CommandGroup>
                  <CommandItem
                    onSelect={() => {
                      addToHistory(query);
                      setOpen(false);
                      navigate(`/search?q=${encodeURIComponent(query)}`);
                    }}
                    className="cursor-pointer justify-center text-primary"
                  >
                    {t.viewAll} ({totalResults})
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
