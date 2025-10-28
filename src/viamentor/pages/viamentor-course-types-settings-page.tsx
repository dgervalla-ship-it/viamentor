/**
 * VIAMENTOR Course Types Settings Page
 */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertCircleIcon,
  CheckCircleIcon,
  PlusIcon,
  SearchIcon,
  EditIcon,
  CopyIcon,
  TrashIcon,
  MoreVerticalIcon,
  HomeIcon,
  SettingsIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  mockCourseTypes,
  mockStats,
  colorPresets,
  calculateContrastRatio,
  isContrastSufficient,
  type CourseType,
  type CourseTypeCategory,
  type WeekDay,
} from "@/viamentor/data/viamentor-course-types-data";
import {
  courseTypesTranslations,
  type CourseTypesLocale,
} from "@/viamentor/data/viamentor-course-types-i18n";

interface CourseTypesSettingsPageProps {
  locale?: CourseTypesLocale;
}

export function CourseTypesSettingsPage({
  locale = "fr",
}: CourseTypesSettingsPageProps) {
  const t = courseTypesTranslations[locale];
  const [courseTypes, setCourseTypes] = useState(mockCourseTypes);
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<
    CourseTypeCategory[]
  >([]);
  const [activeOnly, setActiveOnly] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCourseType, setEditingCourseType] = useState<CourseType | null>(
    null
  );
  const [activeTab, setActiveTab] = useState("identification");

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: [] as CourseTypeCategory[],
    color: "#1E88E5",
    defaultDuration: 8,
    maxCapacity: 20,
    minCapacity: 5,
    price: 150,
    certificateIssued: false,
    autoRecurrence: false,
    recurringDays: [] as WeekDay[],
  });

  const filteredTypes = courseTypes.filter((ct) => {
    if (search && !ct.name.toLowerCase().includes(search.toLowerCase()))
      return false;
    if (
      selectedCategories.length > 0 &&
      !ct.category.some((c) => selectedCategories.includes(c))
    )
      return false;
    if (activeOnly && !ct.active) return false;
    return true;
  });

  const contrastRatio = calculateContrastRatio(formData.color);
  const hasGoodContrast = isContrastSufficient(contrastRatio);

  const handleNew = () => {
    setEditingCourseType(null);
    setFormData({
      name: "",
      description: "",
      category: [],
      color: "#1E88E5",
      defaultDuration: 8,
      maxCapacity: 20,
      minCapacity: 5,
      price: 150,
      certificateIssued: false,
      autoRecurrence: false,
      recurringDays: [],
    });
    setActiveTab("identification");
    setDialogOpen(true);
  };

  const handleEdit = (ct: CourseType) => {
    setEditingCourseType(ct);
    setFormData({
      name: ct.name,
      description: ct.description,
      category: ct.category,
      color: ct.color,
      defaultDuration: ct.defaultDuration,
      maxCapacity: ct.maxCapacity,
      minCapacity: ct.minCapacity,
      price: ct.price || 150,
      certificateIssued: ct.certificateIssued,
      autoRecurrence: ct.autoRecurrence,
      recurringDays: ct.recurringSchedule?.map((s) => s.day) || [],
    });
    setActiveTab("identification");
    setDialogOpen(true);
  };

  const handleToggleActive = (id: string) => {
    setCourseTypes((prev) =>
      prev.map((ct) => (ct.id === id ? { ...ct, active: !ct.active } : ct))
    );
  };

  return (
    <div className="space-y-6 p-6 bg-background">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <HomeIcon className="w-4 h-4" />

        <span>/</span>
        <SettingsIcon className="w-4 h-4" />

        <span>{t.breadcrumb?.settings || "Paramètres"}</span>
        <span>/</span>
        <span className="text-foreground">
          {t.breadcrumb?.courseTypes || "Cours collectifs"}
        </span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t.title}</h1>
          <p className="text-muted-foreground mt-1">
            {t.subtitle || "Configuration des cours collectifs"}
          </p>
        </div>
        <Button onClick={handleNew}>
          <PlusIcon className="w-4 h-4 mr-2" />

          {t.newCourseType}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 border border-border rounded-lg bg-card">
          <div className="text-sm text-muted-foreground">
            {t.stats.activeTypes}
          </div>
          <div className="text-2xl font-bold text-foreground">
            {mockStats.activeTypes}
          </div>
        </div>
        <div className="p-4 border border-border rounded-lg bg-card">
          <div className="text-sm text-muted-foreground">
            {t.stats.plannedCourses}
          </div>
          <div className="text-2xl font-bold text-foreground">
            {mockStats.plannedCoursesThisMonth}
          </div>
        </div>
        <div className="p-4 border border-border rounded-lg bg-card">
          <div className="text-sm text-muted-foreground">
            {t.stats.enrolledStudents}
          </div>
          <div className="text-2xl font-bold text-foreground">
            {mockStats.totalEnrolledStudents}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />

          <Input
            placeholder={t.filters?.search || "Rechercher..."}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            checked={activeOnly}
            onCheckedChange={(checked) => setActiveOnly(checked as boolean)}
            id="active-only"
          />

          <Label htmlFor="active-only" className="text-sm">
            {t.filters?.activeOnly || "Actifs seulement"}
          </Label>
        </div>
      </div>

      {/* Table */}
      <div className="border border-border rounded-lg bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left p-4 text-sm font-medium text-foreground">
                  {t.table.name}
                </th>
                <th className="text-left p-4 text-sm font-medium text-foreground">
                  {t.table.color}
                </th>
                <th className="text-left p-4 text-sm font-medium text-foreground">
                  {t.table.duration}
                </th>
                <th className="text-left p-4 text-sm font-medium text-foreground">
                  {t.table.capacity}
                </th>
                <th className="text-left p-4 text-sm font-medium text-foreground">
                  {t.table.price}
                </th>
                <th className="text-left p-4 text-sm font-medium text-foreground">
                  {t.table.active}
                </th>
                <th className="text-right p-4 text-sm font-medium text-foreground">
                  {t.table.actions}
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTypes.map((ct) => (
                <tr
                  key={ct.id}
                  className="border-b border-border hover:bg-muted/30"
                >
                  <td className="p-4">
                    <div className="font-medium text-foreground">{ct.name}</div>
                    <div className="text-sm text-muted-foreground flex gap-1 mt-1">
                      {ct.category.map((cat) => (
                        <Badge
                          key={cat}
                          variant="secondary"
                          className="text-xs"
                        >
                          {t.categories[cat]}
                        </Badge>
                      ))}
                    </div>
                  </td>
                  <td className="p-4">
                    <div
                      className="w-8 h-8 rounded"
                      style={{ backgroundColor: ct.color }}
                    />
                  </td>
                  <td className="p-4 text-foreground">{ct.defaultDuration}h</td>
                  <td className="p-4 text-foreground">
                    {ct.minCapacity}-{ct.maxCapacity}
                  </td>
                  <td className="p-4 text-foreground">
                    {ct.price ? `CHF ${ct.price}` : "-"}
                  </td>
                  <td className="p-4">
                    <Switch
                      checked={ct.active}
                      onCheckedChange={() => handleToggleActive(ct.id)}
                    />
                  </td>
                  <td className="p-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVerticalIcon className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(ct)}>
                          <EditIcon className="w-4 h-4 mr-2" />

                          {t.actions.edit}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <CopyIcon className="w-4 h-4 mr-2" />

                          {t.actions.duplicate}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <TrashIcon className="w-4 h-4 mr-2" />

                          {t.actions.delete}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingCourseType ? t.actions.edit : t.newCourseType}
            </DialogTitle>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="identification">
                {t.tabs.identification}
              </TabsTrigger>
              <TabsTrigger value="appearance">{t.tabs.appearance}</TabsTrigger>
              <TabsTrigger value="configuration">
                {t.tabs.configuration}
              </TabsTrigger>
              <TabsTrigger value="advanced">{t.tabs.advanced}</TabsTrigger>
            </TabsList>

            <TabsContent value="identification" className="space-y-4">
              <div>
                <Label>{t.form.name.label}</Label>
                <Input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder={t.form.name.placeholder}
                />
              </div>
              <div>
                <Label>{t.form.description.label}</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder={t.form.description.placeholder}
                  rows={3}
                />
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={formData.certificateIssued}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      certificateIssued: checked as boolean,
                    })
                  }
                  id="certificate"
                />

                <Label htmlFor="certificate">
                  {t.form.certificateIssued.label}
                </Label>
              </div>
            </TabsContent>

            <TabsContent value="appearance" className="space-y-4">
              <div>
                <Label>{t.form.color.label}</Label>
                <div className="flex gap-2 flex-wrap mt-2">
                  {colorPresets.map((preset) => (
                    <button
                      key={preset.hex}
                      onClick={() =>
                        setFormData({ ...formData, color: preset.hex })
                      }
                      className={`w-12 h-12 rounded border-2 ${formData.color === preset.hex ? "border-primary" : "border-transparent"}`}
                      style={{ backgroundColor: preset.hex }}
                    />
                  ))}
                </div>
                <Input
                  type="color"
                  value={formData.color}
                  onChange={(e) =>
                    setFormData({ ...formData, color: e.target.value })
                  }
                  className="mt-2 h-12"
                />

                <Alert
                  className={`mt-2 ${hasGoodContrast ? "border-green-500" : "border-orange-500"}`}
                >
                  {hasGoodContrast ? (
                    <CheckCircleIcon className="w-4 h-4 text-green-600" />
                  ) : (
                    <AlertCircleIcon className="w-4 h-4 text-orange-600" />
                  )}
                  <AlertDescription>
                    {hasGoodContrast
                      ? t.form.color.contrastGood
                      : t.form.color.contrastWarning}{" "}
                    ({contrastRatio.toFixed(2)}:1)
                  </AlertDescription>
                </Alert>
              </div>
            </TabsContent>

            <TabsContent value="configuration" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>{t.form.defaultDuration.label}</Label>
                  <Input
                    type="number"
                    value={formData.defaultDuration}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        defaultDuration: parseInt(e.target.value),
                      })
                    }
                    min={1}
                    max={12}
                  />
                </div>
                <div>
                  <Label>{t.form.price.label}</Label>
                  <Input
                    type="number"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        price: parseInt(e.target.value),
                      })
                    }
                    min={0}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>{t.form.minCapacity.label}</Label>
                  <Input
                    type="number"
                    value={formData.minCapacity}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        minCapacity: parseInt(e.target.value),
                      })
                    }
                    min={1}
                    max={30}
                  />
                </div>
                <div>
                  <Label>{t.form.maxCapacity.label}</Label>
                  <Input
                    type="number"
                    value={formData.maxCapacity}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        maxCapacity: parseInt(e.target.value),
                      })
                    }
                    min={5}
                    max={30}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={formData.autoRecurrence}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      autoRecurrence: checked as boolean,
                    })
                  }
                  id="auto-recurrence"
                />

                <Label htmlFor="auto-recurrence">
                  {t.form.autoRecurrence.label}
                </Label>
              </div>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-4">
              <div>
                <Label>Jours récurrents</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {(
                    [
                      "monday",
                      "tuesday",
                      "wednesday",
                      "thursday",
                      "friday",
                      "saturday",
                      "sunday",
                    ] as WeekDay[]
                  ).map((day) => (
                    <div key={day} className="flex items-center gap-2">
                      <Checkbox
                        checked={formData.recurringDays.includes(day)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setFormData({
                              ...formData,
                              recurringDays: [...formData.recurringDays, day],
                            });
                          } else {
                            setFormData({
                              ...formData,
                              recurringDays: formData.recurringDays.filter(
                                (d) => d !== day
                              ),
                            });
                          }
                        }}
                        id={day}
                      />

                      <Label htmlFor={day}>{t.weekDays[day]}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              {t.actions.cancel}
            </Button>
            <Button onClick={() => setDialogOpen(false)}>
              {t.actions.save}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
