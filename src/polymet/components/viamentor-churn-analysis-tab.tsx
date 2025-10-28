/**
 * Component - Churn Analysis Tab
 *
 * Tab Churn avec tenants canceled, cancellation reasons, win-back campaigns
 * Table éditable inline, PieChart reasons, Dialog new campaign
 */

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusIcon, MailIcon, TrendingDownIcon, UsersIcon } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  ChurnedTenant,
  WinBackCampaign,
  ChurnReason,
} from "@/polymet/data/viamentor-analytics-data";
import {
  AnalyticsLocale,
  useAnalyticsTranslations,
  formatCurrency,
} from "@/polymet/data/viamentor-analytics-i18n";

export interface ChurnAnalysisTabProps {
  churnedTenants: ChurnedTenant[];
  winBackCampaigns: WinBackCampaign[];
  locale?: AnalyticsLocale;
  onContactToggle?: (tenantId: string, attempted: boolean) => void;
  onWinBackOffer?: (tenantId: string, offer: string) => void;
  onNotesUpdate?: (tenantId: string, notes: string) => void;
  onNewCampaign?: (campaign: {
    name: string;
    targetIds: string[];
    offer: string;
    emailSubject: string;
    emailBody: string;
  }) => void;
}

export function ChurnAnalysisTab({
  churnedTenants,
  winBackCampaigns,
  locale = "fr",
  onContactToggle,
  onWinBackOffer,
  onNotesUpdate,
  onNewCampaign,
}: ChurnAnalysisTabProps) {
  const t = useAnalyticsTranslations(locale);
  const [selectedTenants, setSelectedTenants] = useState<string[]>([]);
  const [newCampaignOpen, setNewCampaignOpen] = useState(false);

  // Calculate stats
  const totalChurned = churnedTenants.length;
  const totalLostMRR = churnedTenants.reduce((sum, t) => sum + t.lostMRR, 0);
  const churnRate = 4.2; // Mock value

  // Calculate top reasons
  const reasonCounts: Record<ChurnReason, number> = {
    "Price too high": 0,
    "Missing features": 0,
    "Moved competitor": 0,
    Other: 0,
  };

  churnedTenants.forEach((t) => {
    if (t.reason) reasonCounts[t.reason]++;
  });

  const reasonsData = Object.entries(reasonCounts)
    .filter(([_, count]) => count > 0)
    .map(([reason, count]) => ({
      name: reason,
      value: count,
      percentage: (count / totalChurned) * 100,
    }));

  const COLORS = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-xs">
              {t.totalChurned}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <UsersIcon className="h-4 w-4 text-muted-foreground" />

              <p className="text-2xl font-bold">{totalChurned}</p>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              3 derniers mois
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-xs">{t.churnRate}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <TrendingDownIcon className="h-4 w-4 text-destructive" />

              <p className="text-2xl font-bold">{churnRate}%</p>
            </div>
            <Badge variant="secondary" className="mt-1 text-xs">
              Acceptable
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-xs">{t.lostMRR}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-destructive">
              {formatCurrency(totalLostMRR, locale)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Impact mensuel</p>
          </CardContent>
        </Card>
      </div>

      {/* Top Reasons PieChart */}
      <Card>
        <CardHeader>
          <CardTitle>{t.topReasons}</CardTitle>
          <CardDescription>Répartition des motifs d'annulation</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={reasonsData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ name, percentage }) =>
                  `${name} (${percentage.toFixed(0)}%)`
                }
              >
                {reasonsData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />

              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Churned Tenants Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{t.tenantsCanceled}</CardTitle>
              <CardDescription>
                Analyse désabonnements 3 derniers mois
              </CardDescription>
            </div>
            <Dialog open={newCampaignOpen} onOpenChange={setNewCampaignOpen}>
              <DialogTrigger asChild>
                <Button>
                  <PlusIcon className="h-4 w-4 mr-2" />

                  {t.newWinBackCampaign}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>{t.newWinBackCampaign}</DialogTitle>
                  <DialogDescription>
                    Créer une campagne de reconquête pour les tenants
                    sélectionnés
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Nom de la campagne</Label>
                    <Input placeholder="Q1 2025 Reactivation" />
                  </div>
                  <div>
                    <Label>Offre de reconquête</Label>
                    <Input placeholder="30% de réduction pendant 3 mois" />
                  </div>
                  <div>
                    <Label>Sujet email</Label>
                    <Input placeholder="Nous vous avons manqué ! Offre spéciale..." />
                  </div>
                  <div>
                    <Label>Corps du message</Label>
                    <Textarea
                      placeholder="Bonjour {{firstName}},&#10;&#10;Nous avons remarqué que vous avez annulé votre abonnement..."
                      rows={6}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Variables disponibles:{" "}
                    {`{{firstName}}, {{lastName}}, {{tenantName}}, {{canceledDate}}`}
                  </p>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setNewCampaignOpen(false)}
                  >
                    {t.cancel}
                  </Button>
                  <Button
                    onClick={() => {
                      onNewCampaign?.({
                        name: "Q1 2025 Reactivation",
                        targetIds: selectedTenants,
                        offer: "30% off for 3 months",
                        emailSubject: "We missed you!",
                        emailBody: "Hello...",
                      });
                      setNewCampaignOpen(false);
                    }}
                  >
                    <MailIcon className="h-4 w-4 mr-2" />

                    {t.send}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox />
                  </TableHead>
                  <TableHead>Tenant</TableHead>
                  <TableHead>{t.planCanceled}</TableHead>
                  <TableHead>{t.canceledDate}</TableHead>
                  <TableHead>{t.activeDuration}</TableHead>
                  <TableHead>{t.totalRevenueContributed}</TableHead>
                  <TableHead>{t.cancellationReason}</TableHead>
                  <TableHead>{t.lostMRR}</TableHead>
                  <TableHead>{t.contactAttempted}</TableHead>
                  <TableHead>{t.notes}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {churnedTenants.map((tenant) => (
                  <TableRow key={tenant.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedTenants.includes(tenant.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedTenants([...selectedTenants, tenant.id]);
                          } else {
                            setSelectedTenants(
                              selectedTenants.filter((id) => id !== tenant.id)
                            );
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          {tenant.logo && <AvatarImage src={tenant.logo} />}
                          <AvatarFallback>{tenant.name[0]}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{tenant.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{tenant.plan}</Badge>
                    </TableCell>
                    <TableCell className="text-sm">
                      {new Date(tenant.canceledDate).toLocaleDateString(
                        locale === "fr" ? "fr-CH" : "en-CH"
                      )}
                    </TableCell>
                    <TableCell>{tenant.activeDuration} mois</TableCell>
                    <TableCell className="font-medium">
                      {formatCurrency(tenant.totalRevenue, locale)}
                    </TableCell>
                    <TableCell>
                      {tenant.reason && (
                        <Badge variant="secondary" className="text-xs">
                          {tenant.reason}
                        </Badge>
                      )}
                      {tenant.feedback && (
                        <p
                          className="text-xs text-muted-foreground mt-1 italic max-w-[200px] truncate"
                          title={tenant.feedback}
                        >
                          "{tenant.feedback}"
                        </p>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant="destructive">
                        -{formatCurrency(tenant.lostMRR, locale)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        checked={tenant.contactAttempted}
                        onCheckedChange={(checked) =>
                          onContactToggle?.(tenant.id, checked as boolean)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Textarea
                        placeholder="Notes..."
                        defaultValue={tenant.notes}
                        onBlur={(e) =>
                          onNotesUpdate?.(tenant.id, e.target.value)
                        }
                        className="min-w-[200px] text-xs"
                        rows={2}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Win-back Campaigns */}
      <Card>
        <CardHeader>
          <CardTitle>{t.winBackCampaigns}</CardTitle>
          <CardDescription>
            Historique des campagnes de reconquête
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t.campaignName}</TableHead>
                <TableHead>{t.sentDate}</TableHead>
                <TableHead className="text-right">{t.targetCount}</TableHead>
                <TableHead className="text-right">
                  {t.reactivatedCount}
                </TableHead>
                <TableHead className="text-right">{t.successRate}</TableHead>
                <TableHead className="text-right">{t.roi}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {winBackCampaigns.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell className="font-medium">{campaign.name}</TableCell>
                  <TableCell>
                    {new Date(campaign.sentDate).toLocaleDateString(
                      locale === "fr" ? "fr-CH" : "en-CH"
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {campaign.targetCount}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant="default">{campaign.reactivatedCount}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant={
                        campaign.successRate >= 20 ? "default" : "secondary"
                      }
                    >
                      {campaign.successRate}%
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium text-green-600">
                    +{formatCurrency(campaign.roi, locale)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
