/**
 * VIAMENTOR - Header Global
 * Header principal avec breadcrumb, search, notifications et user menu
 */

"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import {
  BellIcon,
  MessageSquareIcon,
  PlusCircleIcon,
  HelpCircleIcon,
  UserIcon,
  SettingsIcon,
  SlidersIcon,
  LogOutIcon,
  CheckIcon,
  MenuIcon,
  SearchIcon,
  CalendarPlusIcon,
  UserPlusIcon,
  GraduationCapIcon,
  BanknoteIcon,
  ClipboardListIcon,
  CarFrontIcon,
  SunIcon,
  MoonIcon,
  MonitorIcon,
} from "lucide-react";
import { HeaderBreadcrumb } from "@/viamentor/components/viamentor-header-breadcrumb";
import { HeaderGlobalSearch } from "@/viamentor/components/viamentor-header-global-search";
import { useNotifications } from "@/viamentor/data/viamentor-use-notifications";
import {
  MOCK_MESSAGES,
  formatRelativeTime,
} from "@/viamentor/data/viamentor-header-notifications-data";
import {
  HEADER_I18N,
  type HeaderLocale,
} from "@/viamentor/data/viamentor-header-i18n";

export interface HeaderProps {
  locale?: HeaderLocale;
  user?: {
    id: string;
    name: string;
    email: string;
    role: string;
    avatar: string;
    status?: "available" | "busy" | "away";
  };
  onLogout?: () => void;
  onMobileMenuToggle?: () => void;
  showMobileMenuButton?: boolean;
  mobileMenuOpen?: boolean;
  className?: string;
}

export function Header({
  locale = "fr",
  user = {
    id: "user-1",
    name: "Admin Viamentor",
    email: "admin@viamentor.ch",
    role: "Platform Admin",
    avatar: "https://github.com/yusufhilmi.png",
    status: "available",
  },
  onLogout,
  onMobileMenuToggle,
  showMobileMenuButton = false,
  mobileMenuOpen = false,
  className,
}: HeaderProps) {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");
  const [userStatus, setUserStatus] = useState(user.status || "available");
  const t = HEADER_I18N[locale];

  const {
    filteredNotifications,
    unreadCount,
    activeTab,
    setActiveTab,
    markAsRead,
    markAllAsRead,
  } = useNotifications();

  const unreadMessages = MOCK_MESSAGES.filter((m) => m.unread).length;

  const statusColors = {
    available: "bg-green-500",
    busy: "bg-orange-500",
    away: "bg-red-500",
  };

  return (
    <header
      className={`sticky top-0 z-50 h-16 border-b border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-950/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-950/60 ${className}`}
    >
      <div className="flex h-full items-center gap-4 px-4 lg:px-6">
        {/* LEFT SECTION - Mobile Menu + Breadcrumb + Search */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {/* Mobile Menu Button - Visible only on mobile/tablet */}
          {showMobileMenuButton && (
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden flex-shrink-0 min-h-[44px] min-w-[44px] text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
              onClick={onMobileMenuToggle}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </Button>
          )}

          {/* Breadcrumb - Hidden on small screens */}
          <div className="hidden md:block flex-shrink-0">
            <HeaderBreadcrumb locale={locale} />
          </div>

          {/* Search - Responsive width */}
          <div className="flex-1 max-w-xl">
            <HeaderGlobalSearch locale={locale} className="w-full" />
          </div>
        </div>

        {/* RIGHT SECTION - Actions */}
        <div className="flex items-center gap-1.5 lg:gap-2 flex-shrink-0">
          {/* Quick Add Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hidden md:flex min-h-[44px] min-w-[44px] text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/20 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Actions rapides"
              >
                <PlusCircleIcon className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>{t.quickActions.title}</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem asChild>
                <Link
                  to="/lessons/new"
                  className="flex items-center cursor-pointer"
                >
                  <CalendarPlusIcon className="mr-2 h-4 w-4" />

                  {t.quickActions.newLesson}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  to="/students/new"
                  className="flex items-center cursor-pointer"
                >
                  <UserPlusIcon className="mr-2 h-4 w-4" />

                  {t.quickActions.newStudent}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  to="/instructors/new"
                  className="flex items-center cursor-pointer"
                >
                  <GraduationCapIcon className="mr-2 h-4 w-4" />

                  {t.quickActions.newInstructor}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />

              <DropdownMenuItem>
                <BanknoteIcon className="mr-2 h-4 w-4" />

                {t.quickActions.recordPayment}
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  to="/exams/schedule"
                  className="flex items-center cursor-pointer"
                >
                  <ClipboardListIcon className="mr-2 h-4 w-4" />

                  {t.quickActions.scheduleExam}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  to="/vehicles/new"
                  className="flex items-center cursor-pointer"
                >
                  <CarFrontIcon className="mr-2 h-4 w-4" />

                  {t.quickActions.addVehicle}
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Notifications */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative min-h-[44px] min-w-[44px] text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label={t.notifications.title}
              >
                <BellIcon className="h-5 w-5" />

                {unreadCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500 text-white border-2 border-white dark:border-gray-950">
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[400px] p-0" align="end">
              <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                <h3 className="text-xl font-medium leading-relaxed">
                  {t.notifications.title}
                </h3>
              </div>
              <Tabs
                value={activeTab}
                onValueChange={(v) => setActiveTab(v as any)}
              >
                <div className="px-4 pt-2">
                  <TabsList className="w-full">
                    <TabsTrigger value="all" className="flex-1">
                      {t.notifications.tabs.all}
                    </TabsTrigger>
                    <TabsTrigger value="unread" className="flex-1">
                      {t.notifications.tabs.unread}
                      {unreadCount > 0 && (
                        <Badge variant="secondary" className="ml-2">
                          {unreadCount}
                        </Badge>
                      )}
                    </TabsTrigger>
                    <TabsTrigger value="mentions" className="flex-1">
                      {t.notifications.tabs.mentions}
                    </TabsTrigger>
                  </TabsList>
                </div>
                <TabsContent
                  value={activeTab}
                  className="max-h-[500px] overflow-y-auto p-4 space-y-3"
                >
                  {filteredNotifications.length === 0 ? (
                    <div className="text-center py-8">
                      <BellIcon className="h-12 w-12 text-muted-foreground mx-auto mb-2" />

                      <p className="text-sm text-muted-foreground">
                        {t.notifications.empty}
                      </p>
                    </div>
                  ) : (
                    filteredNotifications.slice(0, 10).map((notification) => (
                      <div
                        key={notification.id}
                        className={`block p-3 rounded-lg border border-gray-200 dark:border-gray-800 transition-colors hover:bg-gray-50 dark:hover:bg-gray-900 cursor-pointer ${
                          !notification.read
                            ? "bg-blue-50 dark:bg-blue-950/20"
                            : ""
                        }`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex items-start gap-3">
                          {notification.metadata?.avatar && (
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={notification.metadata.avatar} />

                              <AvatarFallback>
                                {notification.title[0]}
                              </AvatarFallback>
                            </Avatar>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div className="font-medium text-sm">
                                {notification.title}
                              </div>
                              {!notification.read && (
                                <div className="h-2 w-2 rounded-full bg-blue-500 flex-shrink-0 mt-1" />
                              )}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {notification.message}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {formatRelativeTime(
                                notification.timestamp,
                                locale
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </TabsContent>
              </Tabs>
              <div className="p-4 border-t flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={markAllAsRead}
                  className="text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 min-h-[44px]"
                >
                  {t.notifications.markAllAsRead}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/20 min-h-[44px]"
                >
                  <Link to="/notifications">{t.notifications.viewAll}</Link>
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          {/* Messages */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative min-h-[44px] min-w-[44px] text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label={t.messages.title}
              >
                <MessageSquareIcon className="h-5 w-5" />

                {unreadMessages > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500 text-white border-2 border-white dark:border-gray-950">
                    {unreadMessages}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[400px] p-0" align="end">
              <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                <h3 className="text-xl font-medium leading-relaxed">
                  {t.messages.title}
                </h3>
              </div>
              <div className="max-h-[400px] overflow-y-auto p-4 space-y-3">
                {MOCK_MESSAGES.map((message) => (
                  <Link
                    key={message.id}
                    to={`/messages/${message.conversationId}`}
                    className="flex items-start gap-3 p-3 rounded-lg border hover:bg-accent transition-colors"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={message.sender.avatar} />

                      <AvatarFallback>{message.sender.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="font-medium text-sm">
                          {message.sender.name}
                        </div>
                        {message.unread && (
                          <div className="h-2 w-2 rounded-full bg-blue-500 flex-shrink-0 mt-1" />
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1 truncate">
                        {message.preview}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {formatRelativeTime(message.timestamp, locale)}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="p-4 border-t">
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link to="/messages">{t.messages.viewAll}</Link>
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          {/* Help */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hidden md:flex min-h-[44px] min-w-[44px] text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Aide"
              >
                <HelpCircleIcon className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>{t.help.title}</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem asChild>
                <a
                  href="https://docs.viamentor.ch"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.help.documentation}
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem>{t.help.shortcuts}</DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/tutorials">{t.help.tutorials}</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/support/contact">{t.help.support}</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />

              <DropdownMenuItem asChild>
                <Link
                  to="/changelog"
                  className="flex items-center justify-between"
                >
                  {t.help.changelog}
                  <Badge variant="secondary" className="text-xs">
                    {t.help.new}
                  </Badge>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="hidden md:flex min-h-[44px] px-3 text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Changer de langue"
              >
                {locale.toUpperCase()}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuRadioGroup value={locale}>
                <DropdownMenuRadioItem value="fr">
                  🇫🇷 {t.languages.fr}
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="de">
                  🇩🇪 {t.languages.de}
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="it">
                  🇮🇹 {t.languages.it}
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="en">
                  🇬🇧 {t.languages.en}
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-11 w-11 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Menu utilisateur"
              >
                <Avatar className="h-11 w-11 border-2 border-gray-200 dark:border-gray-800">
                  <AvatarImage src={user.avatar} alt={user.name} />

                  <AvatarFallback className="bg-blue-500 text-white">
                    {user.name[0]}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white dark:border-gray-950 ${
                    statusColors[userStatus as keyof typeof statusColors]
                  }`}
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64" align="end">
              <DropdownMenuLabel>
                <div className="flex flex-col items-center gap-2 py-2">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={user.avatar} alt={user.name} />

                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <div className="font-semibold">{user.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {user.email}
                    </div>
                    <Badge variant="outline" className="mt-1">
                      {user.role}
                    </Badge>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem asChild>
                <Link to="/profile" className="cursor-pointer">
                  <UserIcon className="mr-2 h-4 w-4" />

                  {t.userMenu.profile}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings" className="cursor-pointer">
                  <SettingsIcon className="mr-2 h-4 w-4" />

                  {t.userMenu.settings}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/preferences" className="cursor-pointer">
                  <SlidersIcon className="mr-2 h-4 w-4" />

                  {t.userMenu.preferences}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />

              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  {theme === "light" ? (
                    <SunIcon className="mr-2 h-4 w-4" />
                  ) : theme === "dark" ? (
                    <MoonIcon className="mr-2 h-4 w-4" />
                  ) : (
                    <MonitorIcon className="mr-2 h-4 w-4" />
                  )}
                  {t.userMenu.theme}
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuRadioGroup
                    value={theme}
                    onValueChange={(v) => setTheme(v as any)}
                  >
                    <DropdownMenuRadioItem value="light">
                      <SunIcon className="mr-2 h-4 w-4" />

                      {t.userMenu.themeLight}
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="dark">
                      <MoonIcon className="mr-2 h-4 w-4" />

                      {t.userMenu.themeDark}
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="system">
                      <MonitorIcon className="mr-2 h-4 w-4" />

                      {t.userMenu.themeSystem}
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  {t.userMenu.status}
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuRadioGroup
                    value={userStatus}
                    onValueChange={setUserStatus}
                  >
                    <DropdownMenuRadioItem value="available">
                      <div className="mr-2 h-2 w-2 rounded-full bg-green-500" />

                      {t.userMenu.statusAvailable}
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="busy">
                      <div className="mr-2 h-2 w-2 rounded-full bg-orange-500" />

                      {t.userMenu.statusBusy}
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="away">
                      <div className="mr-2 h-2 w-2 rounded-full bg-red-500" />

                      {t.userMenu.statusAway}
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={onLogout}
                className="text-destructive cursor-pointer"
              >
                <LogOutIcon className="mr-2 h-4 w-4" />

                {t.userMenu.logout}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Separator before user menu */}
          <Separator orientation="vertical" className="h-6 hidden md:block" />
        </div>
      </div>
    </header>
  );
}
