/**
 * VIAMENTOR Rooms Management Page
 * Page principale gestion salles formation
 */

"use client";

import { useState } from "react";
import {
  DoorOpenIcon,
  PlusIcon,
  FilterIcon,
  DownloadIcon,
  LayoutGridIcon,
  LayoutListIcon,
  UsersIcon,
  MapPinIcon,
  CalendarIcon,
  ClockIcon,
  MoreVerticalIcon,
  SearchIcon,
  XIcon,
  AlertTriangleIcon,
  CheckIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  mockRooms,
  mockRoomStats,
  filterRooms,
  getRoomStatusColor,
  getOccupancyColor,
  getOccupancyVariant,
  type Room,
  type RoomStatus,
  type RoomFilters,
} from "@/viamentor/data/viamentor-rooms-data";
import {
  getRoomsTranslation,
  type RoomsLocale,
} from "@/viamentor/data/viamentor-rooms-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface RoomsManagementPageProps {
  locale?: RoomsLocale;
}

type ViewMode = "table" | "cards";

// ============================================================================
// COMPONENT
// ============================================================================

export function RoomsManagementPage({
  locale = "fr",
}: RoomsManagementPageProps) {
  const t = getRoomsTranslation(locale);
  const [viewMode, setViewMode] = useState<ViewMode>("cards");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [filters, setFilters] = useState<Partial<RoomFilters>>({
    search: "",
    status: [],
    capacityRange: [1, 50],
  });

  const filteredRooms = filterRooms(mockRooms, filters);
  const stats = mockRoomStats;

  // Handlers
  const handleSelectAll = (checked: boolean) => {
    setSelectedIds(checked ? filteredRooms.map((r) => r.id) : []);
  };

  const handleSelectOne = (id: string, checked: boolean) => {
    setSelectedIds((prev) =>
      checked ? [...prev, id] : prev.filter((i) => i !== id)
    );
  };

  const handleSearch = (value: string) => {
    setFilters((prev) => ({ ...prev, search: value }));
  };

  const handleStatusFilter = (status: RoomStatus[]) => {
    setFilters((prev) => ({ ...prev, status }));
  };

  const handleCapacityFilter = (range: [number, number]) => {
    setFilters((prev) => ({ ...prev, capacityRange: range }));
  };

  const handleResetFilters = () => {
    setFilters({ search: "", status: [], capacityRange: [1, 50] });
  };

  // Get occupancy alert
  const getOccupancyAlert = (rate: number) => {
    if (rate >= 85)
      return {
        color: "text-red-600",
        icon: AlertTriangleIcon,
        text: "Taux élevé",
      };
    if (rate >= 60)
      return {
        color: "text-orange-600",
        icon: AlertTriangleIcon,
        text: "Taux moyen",
      };
    return { color: "text-green-600", icon: CheckIcon, text: "Taux optimal" };
  };

  const occupancyAlert = getOccupancyAlert(stats.occupancyRate);

  return (
    <div className="space-y-6 p-6 bg-background">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <span>{t.breadcrumb.management}</span>
            <span>/</span>
            <span>{t.breadcrumb.rooms}</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground">{t.title}</h1>
          <p className="text-muted-foreground">{t.subtitle}</p>
        </div>
        <Button>
          <PlusIcon className="h-4 w-4 mr-2" />

          {t.actions.newRoom}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t.stats.totalRooms}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">
              {stats.totalRooms}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t.stats.totalCapacity}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">
              {stats.totalCapacity}{" "}
              <span className="text-sm font-normal">{t.stats.places}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t.stats.occupancyRate}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className={`text-2xl font-bold ${occupancyAlert.color}`}>
                  {stats.occupancyRate}%
                </span>
                <occupancyAlert.icon
                  className={`h-5 w-5 ${occupancyAlert.color}`}
                />
              </div>
              <Progress
                value={stats.occupancyRate}
                className="h-2"
                indicatorClassName={
                  stats.occupancyRate >= 85
                    ? "bg-red-500"
                    : stats.occupancyRate >= 60
                      ? "bg-orange-500"
                      : "bg-green-500"
                }
              />

              <p className={`text-xs ${occupancyAlert.color}`}>
                {occupancyAlert.text}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t.stats.nextSession}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {stats.nextSession ? (
              <div className="text-sm text-card-foreground">
                <div className="font-semibold">
                  {new Date(stats.nextSession).toLocaleDateString(locale)}
                </div>
                <div className="text-muted-foreground">
                  {new Date(stats.nextSession).toLocaleTimeString(locale, {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">
                {t.stats.noSession}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

          <Input
            placeholder={t.actions.search}
            value={filters.search}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <FilterIcon className="h-4 w-4 mr-2" />

              {t.actions.filter}
              {filters.status && filters.status.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {filters.status.length}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="end">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2 text-foreground">
                  {t.filters.status}
                </h4>
                <div className="space-y-2">
                  {(
                    [
                      "active",
                      "inactive",
                      "maintenance",
                      "reserved",
                    ] as RoomStatus[]
                  ).map((status) => (
                    <div key={status} className="flex items-center space-x-2">
                      <Checkbox
                        id={status}
                        checked={filters.status?.includes(status)}
                        onCheckedChange={(checked) => {
                          const newStatus = checked
                            ? [...(filters.status || []), status]
                            : (filters.status || []).filter(
                                (s) => s !== status
                              );
                          handleStatusFilter(newStatus);
                        }}
                      />

                      <label
                        htmlFor={status}
                        className="text-sm text-foreground cursor-pointer"
                      >
                        {t.status[status]}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2 text-foreground">
                  {t.filters.capacity}
                </h4>
                <div className="space-y-2">
                  <Slider
                    value={filters.capacityRange || [1, 50]}
                    onValueChange={(value) =>
                      handleCapacityFilter(value as [number, number])
                    }
                    min={1}
                    max={50}
                    step={1}
                  />

                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>
                      {filters.capacityRange?.[0]} {t.stats.places}
                    </span>
                    <span>
                      {filters.capacityRange?.[1]} {t.stats.places}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleResetFilters}
                  className="flex-1"
                >
                  {t.filters.reset}
                </Button>
                <Button size="sm" className="flex-1">
                  {t.filters.apply}
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <div className="flex gap-2">
          <Button
            variant={viewMode === "table" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("table")}
          >
            <LayoutListIcon className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "cards" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("cards")}
          >
            <LayoutGridIcon className="h-4 w-4" />
          </Button>
        </div>

        <Button variant="outline">
          <DownloadIcon className="h-4 w-4 mr-2" />

          {t.actions.export}
        </Button>
      </div>

      {/* Active Filters */}
      {(filters.search || (filters.status && filters.status.length > 0)) && (
        <div className="flex flex-wrap gap-2">
          {filters.search && (
            <Badge variant="secondary" className="gap-1">
              {filters.search}
              <XIcon
                className="h-3 w-3 cursor-pointer"
                onClick={() => handleSearch("")}
              />
            </Badge>
          )}
          {filters.status?.map((status) => (
            <Badge key={status} variant="secondary" className="gap-1">
              {t.status[status]}
              <XIcon
                className="h-3 w-3 cursor-pointer"
                onClick={() =>
                  handleStatusFilter(
                    filters.status!.filter((s) => s !== status)
                  )
                }
              />
            </Badge>
          ))}
        </div>
      )}

      {/* Content */}
      {viewMode === "cards" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRooms.map((room) => (
            <Card key={room.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="p-2 rounded-lg"
                      style={{
                        backgroundColor: room.color + "20",
                        color: room.color,
                      }}
                    >
                      <DoorOpenIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-base text-card-foreground">
                        {room.name}
                      </CardTitle>
                      {room.number && (
                        <p className="text-xs text-muted-foreground">
                          {room.number}
                        </p>
                      )}
                    </div>
                  </div>
                  <Badge
                    variant={room.status === "active" ? "default" : "secondary"}
                    className={`${getRoomStatusColor(room.status)} text-white border-0`}
                  >
                    {t.status[room.status]}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPinIcon className="h-4 w-4" />

                  <span>{room.location}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="gap-1">
                    <UsersIcon className="h-3 w-3" />
                    {room.capacity} {t.stats.places}
                  </Badge>
                  <Badge variant="outline">
                    {room.equipment.length} {t.room.equipment}
                  </Badge>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <div className="text-muted-foreground">
                      {t.room.sessionsMonth}
                    </div>
                    <div className="font-semibold text-card-foreground">
                      {room.stats.sessionsThisMonth}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">
                      {t.room.hoursUsed}
                    </div>
                    <div className="font-semibold text-card-foreground">
                      {room.stats.hoursUsed}h
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">
                      {t.room.occupancy}
                    </div>
                    <div
                      className={`font-semibold ${getOccupancyColor(room.stats.occupancyRate)}`}
                    >
                      {room.stats.occupancyRate}%
                    </div>
                  </div>
                </div>

                {room.stats.nextSession && (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2 border-t border-border">
                    <CalendarIcon className="h-3 w-3" />

                    <span>
                      {new Date(room.stats.nextSession).toLocaleDateString(
                        locale,
                        {
                          day: "numeric",
                          month: "short",
                        }
                      )}
                    </span>
                    <ClockIcon className="h-3 w-3 ml-auto" />

                    <span>
                      {new Date(room.stats.nextSession).toLocaleTimeString(
                        locale,
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </span>
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    {t.detail.edit}
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <MoreVerticalIcon className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>{t.detail.reserve}</DropdownMenuItem>
                      <DropdownMenuItem>{t.detail.duplicate}</DropdownMenuItem>
                      <DropdownMenuSeparator />

                      <DropdownMenuItem>{t.detail.deactivate}</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        {t.detail.delete}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedIds.length === filteredRooms.length}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead>{t.room.name}</TableHead>
                <TableHead>{t.room.location}</TableHead>
                <TableHead>{t.room.capacity}</TableHead>
                <TableHead>{t.room.equipment}</TableHead>
                <TableHead>{t.room.status}</TableHead>
                <TableHead>{t.room.occupancy}</TableHead>
                <TableHead>{t.room.sessionsMonth}</TableHead>
                <TableHead>{t.room.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRooms.map((room) => (
                <TableRow key={room.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedIds.includes(room.id)}
                      onCheckedChange={(checked) =>
                        handleSelectOne(room.id, !!checked)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div
                        className="p-1.5 rounded"
                        style={{
                          backgroundColor: room.color + "20",
                          color: room.color,
                        }}
                      >
                        <DoorOpenIcon className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">
                          {room.name}
                        </div>
                        {room.number && (
                          <div className="text-xs text-muted-foreground">
                            {room.number}
                          </div>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {room.location}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {room.capacity} {t.stats.places}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="ghost" size="sm">
                          {room.equipment.length}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-64">
                        <div className="space-y-1">
                          {room.equipment.map((eq) => (
                            <div
                              key={eq.id}
                              className="text-sm text-foreground"
                            >
                              • {eq.name}
                              {eq.quantity && ` (${eq.quantity})`}
                            </div>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        room.status === "active" ? "default" : "secondary"
                      }
                      className={`${getRoomStatusColor(room.status)} text-white border-0`}
                    >
                      {t.status[room.status]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress
                        value={room.stats.occupancyRate}
                        className="h-2 w-16"
                        indicatorClassName={
                          room.stats.occupancyRate >= 85
                            ? "bg-red-500"
                            : room.stats.occupancyRate >= 60
                              ? "bg-orange-500"
                              : "bg-green-500"
                        }
                      />

                      <span
                        className={`text-sm ${getOccupancyColor(room.stats.occupancyRate)}`}
                      >
                        {room.stats.occupancyRate}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-foreground">
                    {room.stats.sessionsThisMonth}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVerticalIcon className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>{t.detail.edit}</DropdownMenuItem>
                        <DropdownMenuItem>{t.detail.reserve}</DropdownMenuItem>
                        <DropdownMenuItem>
                          {t.detail.duplicate}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />

                        <DropdownMenuItem>
                          {t.detail.deactivate}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          {t.detail.delete}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}

      {/* Bulk Actions */}
      {selectedIds.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-6 py-3 rounded-lg shadow-lg flex items-center gap-4">
          <span className="font-medium">
            {selectedIds.length} {t.common.selected}
          </span>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm">
              {t.actions.changeStatus}
            </Button>
            <Button variant="secondary" size="sm">
              {t.actions.exportSelection}
            </Button>
            <Button variant="destructive" size="sm">
              {t.actions.deleteSelected}
            </Button>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedIds([])}
            className="text-primary-foreground hover:text-primary-foreground"
          >
            <XIcon className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
